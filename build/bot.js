"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const functions_1 = require("./functions");
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const Client_1 = __importDefault(require("./client/Client"));
const config_json_1 = require("./config.json");
let prefix = process.env.BOT_PREFIX || config_json_1.prefix;
const bot = new Client_1.default();
bot.commands = new discord_js_1.Collection();
// load commands
const commands_1 = __importDefault(require("./commands"));
commands_1.default.forEach(command => {
    bot.commands.set(command.name, command);
});
const CONSTANTS = {
    ROLES_CHANNEL_ID: '726456775431422053',
    ROLES_EMOJIS: ['💻', '❤️', '🥺', '🥰', '🔥']
};
console.log('Starting the bot...');
bot.on('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = bot.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
bot.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(message.content);
    const { guild, channel } = message;
    if (channel.id == CONSTANTS.ROLES_CHANNEL_ID) {
        let availableRoles = guild === null || guild === void 0 ? void 0 : guild.roles.cache.map(role => role.name).filter(name => !['@everyone', 'DevCord Bot'].includes(name));
        if (message.content == '!assign-roles') {
            const rolesWithEmojies = functions_1.createRoleEmojiObject({ roles: availableRoles, emojis: CONSTANTS.ROLES_EMOJIS });
            let formatted = Object.entries(rolesWithEmojies).map(valueSet => {
                let [role, emoji] = valueSet;
                return `${emoji} - ${role}`;
            }).join("\n");
            channel.send(`!assign-roles!\nReact to this message to get your roles\n${formatted}`).then(sentMsg => {
                functions_1.AssignRoles.call(undefined, sentMsg, rolesWithEmojies);
            });
        }
        if (message.content == '!roles') {
            message.reply('\nAvailable Roles are\n' + (availableRoles === null || availableRoles === void 0 ? void 0 : availableRoles.join(', ')));
        }
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    //@ts-ignore
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName);
    if (message.author.bot)
        return;
    if (!message.content.startsWith(prefix))
        return;
    try {
        if (bot.commands.keyArray().includes(commandName))
            command.execute(message);
    }
    catch (error) {
        console.error(error);
        message.reply('There is an error');
    }
}));
if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
bot.login(process.env.TOKEN);
