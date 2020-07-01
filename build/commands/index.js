"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const play_1 = __importDefault(require("./play"));
const stop_1 = __importDefault(require("./stop"));
const skip_1 = __importDefault(require("./skip"));
const help_1 = __importDefault(require("./help"));
const available_songs_1 = __importDefault(require("./available_songs"));
exports.default = [play_1.default, stop_1.default, skip_1.default, help_1.default, available_songs_1.default];
