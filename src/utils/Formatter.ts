import { Language } from '../config/bot.json';
import './Intl';

export function FormatToList(array: Array<string>): string {
    const ListFormatter: Intl.ListFormat = new Intl.ListFormat(Language);
    return ListFormatter.format(array);
}
export function FromatToDatetime(rawDatetime: Date): string {
    const
        Date: number = rawDatetime.getUTCDate(),
        Month: number = rawDatetime.getUTCMonth(),
        Year: number = rawDatetime.getUTCFullYear();
    return `${Date}/${Month}/${Year}`;
}