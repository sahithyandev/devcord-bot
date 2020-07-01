import { Collection, Message } from "discord.js";
import { createRoleEmojiObject, AssignRoles } from './functions';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import Client from './client/Client';
import { prefix as configPrefix } from './config.json';
let prefix = process.env.BOT_PREFIX || configPrefix

const bot = new Client();
bot.commands = new Collection();

// load commands
import commands from "./commands";
commands.forEach(command => {
    bot.commands.set(command.name, command);
})

const CONSTANTS = {
    ROLES_CHANNEL_ID: '726456775431422053',
    ROLES_EMOJIS: ['💻', '❤️', '🥺', '🥰', '🔥']
}
console.log('Starting the bot...')
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user?.tag}!`);
});

bot.on('message', async (message: Message) => {
    console.log(message.content);
    const {guild, channel} = message
    if (channel.id == CONSTANTS.ROLES_CHANNEL_ID) {
        let availableRoles = guild?.roles.cache.map(role => role.name).filter(name => !['@everyone', 'DevCord Bot'].includes(name))
        if (message.content == '!assign-roles') {
            const rolesWithEmojies = createRoleEmojiObject({roles: availableRoles, emojis: CONSTANTS.ROLES_EMOJIS})
            let formatted = Object.entries(rolesWithEmojies).map(valueSet => {
                let [role, emoji] = valueSet
                return `${emoji} - ${role}`
            }).join("\n")

            channel.send(`!assign-roles!\nReact to this message to get your roles\n${formatted}`).then(sentMsg => {
                AssignRoles.call(undefined, sentMsg, rolesWithEmojies)
            })
        }
        if (message.content == '!roles') {
            message.reply('\nAvailable Roles are\n' + availableRoles?.join(', '))

        }
    }
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    //@ts-ignore
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName);

	if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    try {
        if (["play", "stop", "help", "available_songs"].includes(commandName)) command.execute(message);
    } catch (error) {
        console.error(error);
        message.reply('There is an error');
    }

})

if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
bot.login(process.env.TOKEN);