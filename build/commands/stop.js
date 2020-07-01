"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'stop',
    description: 'Stop all songs',
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel)
            return message.channel.send('You have to be in a voice channel to stop the music!');
        if (serverQueue) {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }
        else {
            message.channel.send('No songs are playing');
        }
    }
};
