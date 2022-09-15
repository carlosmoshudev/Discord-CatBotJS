const colors = {
    yellow: '\x1b[33m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    purple: '\x1b[35m%s\x1b[0m',
}
module.exports = {
    yellowLog: (message, white = '') => console.log(colors.yellow, message, white),
    cyanLog: (message, white = '') => console.log(colors.cyan, message, white),
    purpleLog: (message, white = '') => console.log(colors.purple, message, white),
}