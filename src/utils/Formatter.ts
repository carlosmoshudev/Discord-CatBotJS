import { Language } from '../config/bot.json';

export function FormatToList(list) {
    const ListFormatter = new Intl.ListFormat(Language);
    return ListFormatter.format(list);
}
export function FromatToDatetime(rawDatetime) {
    const
        Date = rawDatetime.getUTCDate(),
        Month = rawDatetime.getUTCMonth(),
        Year = rawDatetime.getUTCFullYear();
    return `${Date}/${Month}/${Year}`;
}