"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class default_1 extends discord_js_1.Client {
    constructor(config) {
        super();
        // super({
        // 	disableEveryone: true,
        // 	disabledEvents: ['TYPING_START'],
        // });
        this.commands = new discord_js_1.Collection();
        this.queue = new Map();
        this.config = config;
    }
}
exports.default = default_1;
;
