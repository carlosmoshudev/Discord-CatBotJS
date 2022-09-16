import { Language } from '../config/bot.json';
import './Intl';

export function FormatToList(array: string[]) {
    const ListFormatter = new Intl.ListFormat(Language);
    return ListFormatter.format(array);
}
export function FromatToDatetime(rawDatetime: Date) {
    const
        Date = rawDatetime.getUTCDate(),
        Month = rawDatetime.getUTCMonth(),
        Year = rawDatetime.getUTCFullYear();
    return `${Date}/${Month}/${Year}`;
}