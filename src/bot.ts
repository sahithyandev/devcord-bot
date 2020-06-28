import { Client } from "discord.js";
import { createRoleEmojiObject, AssignRoles } from './functions';
require('dotenv').config();
const bot = new Client();

const CONSTANTS = {
    ROLES_CHANNEL_ID: '726456775431422053',
    ROLES_EMOJIS: ['💻', '❤️', '🥺', '🥰', '🔥']
}
console.log('Starting the bot...')
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user?.tag}!`);
});

bot.on('message', msg => {
    const {guild, channel} = msg
    if (channel.id == CONSTANTS.ROLES_CHANNEL_ID) {
        let availableRoles = guild?.roles.cache.map(role => role.name).filter(name => !['@everyone', 'DevCord Bot'].includes(name))
        if (msg.content == '!assign-roles') {
            const rolesWithEmojies = createRoleEmojiObject({roles: availableRoles, emojis: CONSTANTS.ROLES_EMOJIS})
            let formatted = Object.entries(rolesWithEmojies).map(valueSet => {
                let [role, emoji] = valueSet
                return `${emoji} - ${role}`
            }).join("\n")
            console.log(formatted);

            channel.send(`!assign-roles!\nReact to this message to get your roles\n${formatted}`).then(sentMsg => {
                AssignRoles.call(undefined, sentMsg, rolesWithEmojies)
            })
        }
        if (msg.content == '!roles') {
            msg.reply('\nAvailable Roles are\n' + availableRoles?.join(', '))

        }
    }
})

if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
bot.login(process.env.TOKEN);