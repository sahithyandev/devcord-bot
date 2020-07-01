import {Command} from './../types';

export default {
    name: 'stop',
    description: 'Stop all songs',
    execute(message: any) {
        const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
        if (serverQueue) {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        } else {
            message.channel.send('No songs are playing');
        }
    }
} as Command