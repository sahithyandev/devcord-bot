"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var functions_1 = require("./functions");
require('dotenv').config();
var bot = new discord_js_1.Client();
var CONSTANTS = {
    ROLES_CHANNEL_ID: '726456775431422053',
    ROLES_EMOJIS: ['💻', '❤️', '🥺', '🥰', '🔥']
};
console.log('Starting the bot...');
bot.on('ready', function () {
    var _a;
    console.log("Logged in as " + ((_a = bot.user) === null || _a === void 0 ? void 0 : _a.tag) + "!");
});
bot.on('message', function (msg) {
    var guild = msg.guild, channel = msg.channel;
    if (channel.id == CONSTANTS.ROLES_CHANNEL_ID) {
        var availableRoles = guild === null || guild === void 0 ? void 0 : guild.roles.cache.map(function (role) { return role.name; }).filter(function (name) { return !['@everyone', 'DevCord Bot'].includes(name); });
        if (msg.content == '!assign-roles') {
            var rolesWithEmojies_1 = functions_1.createRoleEmojiObject({ roles: availableRoles, emojis: CONSTANTS.ROLES_EMOJIS });
            var formatted = Object.entries(rolesWithEmojies_1).map(function (valueSet) {
                var role = valueSet[0], emoji = valueSet[1];
                return emoji + " - " + role;
            }).join("\n");
            console.log(formatted);
            channel.send("!assign-roles!\nReact to this message to get your roles\n" + formatted).then(function (sentMsg) {
                functions_1.AssignRoles.call(undefined, sentMsg, rolesWithEmojies_1);
            });
        }
        if (msg.content == '!roles') {
            msg.reply('\nAvailable Roles are\n' + (availableRoles === null || availableRoles === void 0 ? void 0 : availableRoles.join(', ')));
        }
    }
});
if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
bot.login(process.env.TOKEN);
