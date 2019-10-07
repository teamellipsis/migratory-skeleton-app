function callToDaemon(target, propertyKey, propertyDescriptor) {
    return function () {
        return new Promise((resolve, reject) => {
            let body = {
                args: arguments,
                method: propertyKey,
            }
            // Only run on browser side. Not for server side.
            if (typeof fetch === 'function') {
                fetch('/__call', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'post',
                    body: JSON.stringify(body),
                }).then((res) => {
                    res.json().then((body) => {
                        return resolve(body);
                    }).catch((err) => {
                        return reject(err);
                    });

                }).catch((err) => {
                    return reject(err);
                });
            } else {
                return reject();
            }
        });
    }
}

function Daemon() {
    return function (target, propertyKey, propertyDescriptor) {
        propertyDescriptor.value = callToDaemon(target, propertyKey, propertyDescriptor);
        return propertyDescriptor;
    }
}

export default Daemon;
