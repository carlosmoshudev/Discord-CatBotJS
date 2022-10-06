import { Color } from '../types';
const colors: Color = {
    yellow: '\x1b[33m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    purple: '\x1b[35m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    blue: '\x1b[34m%s\x1b[0m',
};

export function YellowLog(message: string, white: string = ''): void {
    console.log(colors.yellow, message, white);
}
export function CyanLog(message: string, white: string = ''): void {
    console.log(colors.cyan, message, white);
}
export function PurpleLog(message: string, white: string = ''): void {
    console.log(colors.purple, message, white);
}
export function Log(message: string): void { console.log(message!) }
export function RedLog(message: string, white: string = ''): void {
    console.log(colors.red, message, white);
}
export function GreenLog(message: string, white: string = ''): void {
    console.log(colors.green, message, white);
}
export function BlueLog(message: string, white: string = ''): void {
    console.log(colors.blue, message, white);
}