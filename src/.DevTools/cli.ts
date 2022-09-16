const colors = {
    yellow: '\x1b[33m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    purple: '\x1b[35m%s\x1b[0m',
}

export function YellowLog(message: string, white: string = ''): void {
    console.log(colors.yellow, message, white)
}
export function CyanLog(message: string, white: string = ''): void {
    console.log(colors.cyan, message, white)
}
export function PurpleLog(message: string, white: string = ''): void {
    console.log(colors.purple, message, white)
}