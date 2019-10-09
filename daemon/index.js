const os = require('os');

this.getOsDetails = function () {
    return {
        arch: os.arch(),
        hostname: os.hostname(),
        platform: os.platform(),
        release: os.release(),
        totalmem: os.totalmem(),
    }
}

this.getVersions = function () {
    return process.versions;
}

this.getCount = () => {
    if (!count) count = 0;
    return count;
};

this.setCount = (count) => {
    this.count = count;
};
