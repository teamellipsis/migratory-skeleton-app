const app = require('express')();
const server = require('http').Server(app);
const next = require('next');
var appState = require('./app_state.js');
const fs = require('fs');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const dir = __dirname;
const nextApp = next({ dev, dir });
const handler = nextApp.getRequestHandler();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nextApp.prepare().then(() => {
    app.get('/__ping', (req, res) => {
        res.send();
    });

    app.post('/__save', (req, res) => {
        appState.set(req.body);
        res.send();
    });

    app.post('/__close', (req, res) => {
        let appStates = appState.get();
        fs.writeFile(__dirname + "/state", JSON.stringify(appStates), function (err) {
            if (err) {
                res.status(500);
                res.send();
                console.log('Fail to write state');
            } else {
                res.send();
                server.close(() => {
                    console.log('Server closed');
                    process.exit(0);
                });
            }
        });
    });

    app.post('/__call', (req, res) => {
        const backend = require('./backend/index');

        let reqBody = req.body;
        let args = reqBody.args;
        let method = reqBody.method;
        let argc = Object.keys(args).length;
        let argsArray = [];

        for (let i = 0; i < argc; i++) {
            argsArray.push(args[i]);
        }

        const result = backend[method](...argsArray);
        res.send(result);
    });

    app.get('*', (req, res) => {
        req._appState = appState.get()._appState;
        req._platformState = appState.get()._platformState;
        handler(req, res);
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});

fs.exists(__dirname + "/state", (exists) => {
    if (exists) {
        fs.readFile(__dirname + "/state", (err, state) => {
            if (err) throw err;
            appState.set(JSON.parse(state));
        });
    }
});
