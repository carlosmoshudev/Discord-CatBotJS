import { Command } from '../../models/Command';
import { CheckUserPermissions } from '../../utils/User';
import { Client, GuildMember, Message, Channel } from 'discord.js';
const { EmbedBuilder } = require('discord.js');
const { EmbedDecorator } = require('../../config/decorator.json');
module.exports = class WayraChiste extends Command {
    constructor(client) {
        super(
            client,
            {
                name: 'wayrachiste',
                aliases: ['wayrajoke'],
                description: 'Cuenta un chiste de Wayra. +18',
                category: 'Fun',
                usage: 'N/A',
                helpText: '(ej. !wayrachiste) Sin parámetros'
            })
    }
    async run(message, args) {
        const
            user = message.author,
            channel = message.channel,
            jokes = //TODO: Traer de google sheets ? mongoose ?
                [
                    `¿Qué le dijo un plátano a una gelatina? 
        Todavía no me desnudo y ya estás temblando.`,
                    `Pues la postura favorita de mi mujer en la cama es la del pez. 
        ¿La del pez? Pues esa no la conozco. 
        Sí hombre. Se da la vuelta y... 
        ¡nada!`,
                    `¿En qué se parece el sexo al truco? 
        En que si no tenés una buena pareja, necesitás una buena mano.`,
                    `Una amiga le dice a otra: 
        -¡En la cama mi esposo es como Michael Phelps! 
        -¿Ah sí? y ¿Qué te hace? 
        -¡NADA!`,
                    `Inquiere la esposa a su esposo mientras están en la cama: 
        -Si me quedara media hora de vida, ¿Qué me harías? 
        -¡Te haría el amor! 
        -¿Y los otros 28 minutos?`,
                    `Cómo nos despertamos los hombres: 
        Cerebro: “Oh, vamos ya” 
        Cuerpo: “No quiero moverme” 
        Pene: “¡ESTO ES ESPARTAAAA!” …¡Yo hace rato ya me levanté!`,
                    `-¡Hola nena! ¿Andas buscando buen sexo? 
        -No. 
        -Ok. ¡Acabas de dar con el hombre indicado!`,
                    `Después de una tremenda discusión la esposa echó al marido de la casa. El va saliendo con las maletas, cuando está a mitad de calle ella le dice:
        -¡Espero que tengas una vida horrible y que no vuelvas a tener sexo!
        El hombre le contesta:
        -Si eso es lo que quieres, ¡Decídete! ¿Quieres que me vaya o que me quede?`,
                ],
            joke = jokes[Math.floor(Math.random() * jokes.length)],
            embedReply = new EmbedBuilder()
                .setTitle("WayraChiste +18")
                .setDescription(joke)
                .setColor(EmbedDecorator.color)
                .setTimestamp()
                .setFooter(
                    {
                        text: `Solicitado por ${user.username}`,
                        iconURL: user.avatarURL()
                    }
                );
        channel.send({ embeds: [embedReply] });
    }
}