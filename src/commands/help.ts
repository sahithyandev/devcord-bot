import { Command } from './../types';

import { prefix as configPrefix } from './../config.json';
let prefix = process.env.BOT_PREFIX || configPrefix

export default {
    name: 'help',
    description: 'Get help',
    execute(message: any) {
        let helpMessage = [
            `**${prefix}play <name | url>** - plays songs from youtube or by name`,
            `**${prefix}stop** - stops the song`,
            `**${prefix}skip** - skip the current song`,
            `**${prefix}available_songs** - gets all available songs that you can play with name`,
        ].join('\n')
        message.channel.send(helpMessage)
    }
} as Command