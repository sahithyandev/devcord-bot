"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./../config.json");
exports.default = {
    name: "available_songs",
    description: "get all available songs which can be played by name",
    execute(message) {
        let songs = Object.entries(config_json_1.available_songs).map(songArr => {
            const [songName, songURL] = songArr;
            return songName;
        }).join(', ');
        message.channel.send(songs);
    }
};
