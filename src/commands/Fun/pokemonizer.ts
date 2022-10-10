import {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    Interaction,
    TextChannel
} from 'discord.js';
import { Command } from '../../models/Command';
import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

export class ConcreteCommand extends Command {
    constructor(client: Client) {
        super(
            client,
            {
                name: 'pokemonizer',
                description: 'Crea un pokemon de un texto dado.',
                category: 'Fun',
                usage: '/pokemonizer <texto>',
                helpText: 'Crea un pokemon de un texto dado. (ej. !pokemonizer RedPanda)',
                output: 'Creando pokemon...',
                parameters: [
                    {
                        name: 'texto',
                        description: 'El texto para crear el pokemon.',
                        required: true,
                        type: 'string'
                    }
                ]
            })
    }
    async run(sender: Interaction): Promise<void> {
        const slash = sender as ChatInputCommandInteraction;
        const text = slash.options.getString('texto');
        const channel: TextChannel = sender.channel as TextChannel;
        let predictionID;
        await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${process.env.POKEMONIZER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'stability-ai/stable-diffusion',
                version: '3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912',
                input: {
                    prompt: text
                }
            })
        }).then(res => res.json()).then(json => predictionID = json.id);
        console.log("Prediction id = " + predictionID);
        let predictionStatus;
        let predictionOutput;
        let predictionLogs;
        do {
            await fetch(`https://api.replicate.com/v1/predictions/${predictionID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${process.env.POKEMONIZER_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                predictionStatus = json.status;
                predictionOutput = json.output;
                predictionLogs = json.logs;
            });
            console.log("Prediction status = " + predictionStatus);
            await new Promise(r => setTimeout(r, 5000));
        }
        while (predictionStatus != 'succeeded');
        console.log('Prediction completed ' + predictionOutput);
        const embedReply: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Pokemon '${text}' creado!`)
            .setAuthor({
                name: sender.user.username,
                iconURL: sender.user.avatarURL()!
            })
            .setImage(predictionOutput.toString())
            .setColor('#00ff00')
            .addFields([
                {
                    name: 'Semilla',
                    value: predictionLogs.split(' ')[2].replace('\n', ''),
                    inline: true
                },
                {
                    name: 'Modelo',
                    value: 'stability-ai\nstable-diffusion',
                    inline: true
                },
                {
                    name: 'Version',
                    value: '3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912',
                }
            ])
            .setFooter({ text: 'By CatBot.JS | Sasuke', iconURL: this.client.user?.avatarURL()! })
            .setTimestamp();
        channel.send({ embeds: [embedReply] });
    }
}