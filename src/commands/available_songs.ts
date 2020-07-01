// import { Message } from 'discord.js'
import { Command } from "./../types";
import { available_songs } from  './../config.json';

export default {
    name: "available_songs",
    description: "get all available songs which can be played by name",
    execute(message: any) {
        let songs = Object.entries(available_songs).map(songArr => {
            const [songName, songURL] = songArr
            return songName;
        }).join(', ');
        message.channel.send(songs)
    }
} as Command