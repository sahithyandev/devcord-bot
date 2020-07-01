"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./../config.json");
let prefix = process.env.BOT_PREFIX || config_json_1.prefix;
exports.default = {
    name: 'help',
    description: 'Get help',
    execute(message) {
        let helpMessage = [
            `**${prefix}play <name | url>** - plays songs from youtube or by name`,
            `**${prefix}stop** - stops the song`,
            `**${prefix}skip** - skip the current song`,
            `**${prefix}available_songs** - gets all available songs that you can play with name`,
        ].join('\n');
        message.channel.send(helpMessage);
    }
};
