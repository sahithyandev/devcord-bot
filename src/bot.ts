import { Client, TextChannel } from "discord.js";
require('dotenv').config();
const client = new Client();

client.on('ready', () => () => {
    console.log(`Logged in as ${client.user?.tag}`)
})

client.on('message', msg => {
    if (msg.content == 'bots!') {
        let channel = (<TextChannel> client.channels.resolve(msg.channel))
        msg.channel.send({
            content: `DevCord bot at '${channel.name}' channel`
        })
    }
})
if (process.env.TOKEN == undefined) {
    throw "TOKEN is undefined";
}
client.login(process.env.TOKEN);