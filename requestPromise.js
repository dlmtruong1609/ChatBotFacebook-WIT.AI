const request = require('request')

module.exports = (obj) => {
    return new Promise((resolve, reject) => {
        request(obj, (error, response, body) => {
            if (!error) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}