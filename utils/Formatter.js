const { Language } = require('../config/bot.json');

module.exports =
{
    List: list =>
    {
        const ListFormatter = new Intl.ListFormat(Language);
        return ListFormatter.format(list);
    }
}