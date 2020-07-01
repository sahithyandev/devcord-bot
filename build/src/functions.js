"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function createRoleEmojiObject(_a) {
    var roles = _a.roles, emojis = _a.emojis;
    return (roles || []).reduce(function (prev, currRole, i) {
        var _a;
        var currEmoji = emojis[i];
        return __assign(__assign({}, prev), (_a = {}, _a[currRole] = currEmoji, _a));
    }, {});
}
exports.createRoleEmojiObject = createRoleEmojiObject;
function AssignRoles(sentMsg, rolesWithEmojies) {
    if (sentMsg) {
        var guild_1 = sentMsg.guild, channel_1 = sentMsg.channel;
        var filter = function (reaction) { return Object.values(rolesWithEmojies).includes(reaction.emoji.name); };
        var collector = sentMsg.createReactionCollector(filter);
        collector.on('collect', function (reaction, user) {
            console.log(user.username);
            var role = guild_1 === null || guild_1 === void 0 ? void 0 : guild_1.roles.cache.find(function (role) {
                console.log(role.name, rolesWithEmojies, reaction.emoji.name);
                return rolesWithEmojies[role.name] == reaction.emoji.name;
            });
            var member = guild_1 === null || guild_1 === void 0 ? void 0 : guild_1.member(user.id);
            if (role != undefined) {
                channel_1.send(role.name + " is added to " + (member === null || member === void 0 ? void 0 : member.displayName));
                member === null || member === void 0 ? void 0 : member.roles.add(role.id);
            }
        });
    }
}
exports.AssignRoles = AssignRoles;
