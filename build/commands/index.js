"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const play_1 = __importDefault(require("./play"));
const stop_1 = __importDefault(require("./stop"));
exports.default = [play_1.default, stop_1.default];
