"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
require('dotenv').config();
var client = new discord_js_1.Client();
client.on('ready', function () { return function () {
    var _a;
    console.log("Logged in as " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag));
}; });
client.on('message', function (msg) {
    if (msg.content == 'bots!') {
        var channel = client.channels.resolve(msg.channel);
        msg.channel.send({
            content: "DevCord bot at '" + channel.name + "' channel"
        });
    }
});
if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
client.login(process.env.TOKEN);
