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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var functions_1 = require("./functions");
console.log('this much');
require('dotenv').config();
var Client_1 = __importDefault(require("./../client/Client"));
var prefix = require('./config.json').prefix;
var bot = new Client_1.default();
bot.commands = new discord_js_1.Collection();
var playCommand = require('./../commands/play');
bot.commands.set(playCommand.name, playCommand);
console.log(bot.commands);
var CONSTANTS = {
    ROLES_CHANNEL_ID: '726456775431422053',
    ROLES_EMOJIS: ['💻', '❤️', '🥺', '🥰', '🔥']
};
console.log('Starting the bot...');
bot.on('ready', function () {
    var _a;
    console.log("Logged in as " + ((_a = bot.user) === null || _a === void 0 ? void 0 : _a.tag) + "!");
});
bot.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, channel, availableRoles, rolesWithEmojies_1, formatted, args, commandName, command;
    return __generator(this, function (_a) {
        console.log(message.content);
        guild = message.guild, channel = message.channel;
        if (channel.id == CONSTANTS.ROLES_CHANNEL_ID) {
            availableRoles = guild === null || guild === void 0 ? void 0 : guild.roles.cache.map(function (role) { return role.name; }).filter(function (name) { return !['@everyone', 'DevCord Bot'].includes(name); });
            if (message.content == '!assign-roles') {
                rolesWithEmojies_1 = functions_1.createRoleEmojiObject({ roles: availableRoles, emojis: CONSTANTS.ROLES_EMOJIS });
                formatted = Object.entries(rolesWithEmojies_1).map(function (valueSet) {
                    var role = valueSet[0], emoji = valueSet[1];
                    return emoji + " - " + role;
                }).join("\n");
                console.log(formatted);
                channel.send("!assign-roles!\nReact to this message to get your roles\n" + formatted).then(function (sentMsg) {
                    functions_1.AssignRoles.call(undefined, sentMsg, rolesWithEmojies_1);
                });
            }
            if (message.content == '!roles') {
                message.reply('\nAvailable Roles are\n' + (availableRoles === null || availableRoles === void 0 ? void 0 : availableRoles.join(', ')));
            }
        }
        args = message.content.slice(prefix.length).split(/ +/);
        commandName = args.shift().toLowerCase();
        command = bot.commands.get(commandName);
        if (message.author.bot)
            return [2 /*return*/];
        if (!message.content.startsWith(prefix))
            return [2 /*return*/];
        try {
            if (commandName == "play")
                command.execute(message);
        }
        catch (error) {
            console.error(error);
            message.reply('There is an error');
        }
        return [2 /*return*/];
    });
}); });
if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
bot.login(process.env.TOKEN);
