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
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./../config.json");
const ytdl = require("ytdl-core");
let SONGS = config_json_1.available_songs;
exports.default = {
    name: "play",
    description: "Play a song in your channel!",
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const args = message.content.split(" ");
                const queue = message.client.queue;
                const serverQueue = message.client.queue.get(message.guild.id);
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel)
                    return message.channel.send("You need to be in a voice channel to play music!");
                const permissions = voiceChannel.permissionsFor(message.client.user);
                if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                    return message.channel.send("I need the permissions to join and speak in your voice channel!");
                }
                const songName = args[1];
                console.log(songName);
                if (!songName)
                    return message.channel.send(`Give a song name using this format -> \`!play <song_url || song_name>\``);
                let url = SONGS[songName] || args[1];
                const songInfo = yield ytdl.getInfo(url);
                const song = {
                    title: songInfo.title,
                    url: songInfo.video_url
                };
                if (!serverQueue) {
                    const queueContruct = {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    };
                    queue.set(message.guild.id, queueContruct);
                    queueContruct.songs.push(song);
                    try {
                        var connection = yield voiceChannel.join();
                        queueContruct.connection = connection;
                        this.play(message, queueContruct.songs[0]);
                    }
                    catch (err) {
                        console.log(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(err);
                    }
                }
                else {
                    serverQueue.songs.push(song);
                    return message.channel.send(`${song.title} has been added to the queue!`);
                }
            }
            catch (error) {
                console.log(error);
                message.channel.send(error.message);
            }
        });
    },
    play(message, song) {
        const queue = message.client.queue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
            serverQueue.songs.shift();
            this.play(message, serverQueue.songs[0]);
        })
            .on("error", (error) => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Start playing: **${song.title}**`);
    }
};
