const os = require('os');

module.exports.getOsDetails = function () {
    return {
        arch: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        release: os.release(),
        totalmem: os.totalmem(),
    }
}

module.exports.getVersions = function () {
    return process.versions;
}
