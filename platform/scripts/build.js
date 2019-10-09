const fs = require('fs-extra');
const path = require('path');
const npm = require('npm');
const AdmZip = require('adm-zip');
const { spawn } = require('child_process');

const projectDir = path.join(__dirname, '../..');
const buildDir = path.join(projectDir, 'build');
const pJson = require(path.join(projectDir, 'package.json'));
let appName = pJson.name;
let zip = new AdmZip();

if (process.argv.length > 2) {
    appName = process.argv[2];
}

if (fs.existsSync(buildDir)) {
    console.error(`Build directory already exists at "${buildDir}". Please delete it manually.\n`);
    process.exit(1);
}

fs.mkdir(buildDir, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    // Remove Next.js build files
    fs.removeSync(path.join(projectDir, ".next"));

    // Copy package files into build directory
    fs.copyFileSync(path.join(projectDir, 'package.json'), path.join(buildDir, 'package.json'));
    fs.copyFileSync(path.join(projectDir, 'package-lock.json'), path.join(buildDir, 'package-lock.json'));

    // Install only prod dependencies
    const child = spawn('npm', ['install', '--prefix', buildDir, '--prod']);

    child.on('close', (code) => {
        if (code === 0) {
            createNextBuildFiles()
        } else {
            console.error("Failed to install node dependencies.\n");
            process.exit(1);
        }
    });
});

function createNextBuildFiles() {
    npm.load({ production: true }, (err, result) => {
        if (err) {
            throw err;
        }

        // Run `npm run build`
        npm.commands["run-script"](["build"], (err) => {
            if (err) {
                throw err;
            }

            // Create ZIP file after finish build of Next.js
            createZip();
        });
    });
}

function createZip() {
    // Add project files
    zip.addLocalFolder(projectDir, appName, (filename) => {
        const filter =
            filename.startsWith("build") ||
            filename.startsWith("node_modules") ||
            filename.startsWith(".git") ||
            filename.endsWith(".log") ||
            filename === "state" ||
            filename === "state_daemon" ||
            filename === "SERVER"

        if (filter) {
            return false;
        }
        return true;
    });

    // Add prod Node dependencies
    const pathToProdNodeModules = path.join(buildDir, 'node_modules');
    if (fs.existsSync(pathToProdNodeModules)) {
        zip.addLocalFolder(pathToProdNodeModules, path.join(appName, 'node_modules'));
    }

    // Update server.js to support prod mode
    const prodLine = Buffer.from("process.env.NODE_ENV = 'production';\n");
    const serverFile = fs.readFileSync(path.join(projectDir, "server.js"));
    zip.getEntry(path.join(appName, "server.js")).setData(Buffer.concat([prodLine, serverFile]));

    // Clean build directory
    cleanBuildDir();

    // Write compressed ZIP app
    zip.writeZip(path.join(buildDir, `${appName}.zip`));
}

function cleanBuildDir() {
    fs.removeSync(buildDir);
    fs.mkdirSync(buildDir);
}
