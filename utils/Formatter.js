const { Language } = require('../config/bot.json');

module.exports =
{
    List: list => {
        const ListFormatter = new Intl.ListFormat(Language);
        return ListFormatter.format(list);
    },
    Datetime: rawDatetime => {
        const
            Date = rawDatetime.getUTCDate(),
            Month = rawDatetime.getUTCMonth(),
            Year = rawDatetime.getUTCFullYear();
        return `${Date}/${Month}/${Year}`;
    }
}