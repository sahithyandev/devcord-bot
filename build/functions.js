"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRoleEmojiObject({ roles, emojis }) {
    return (roles || []).reduce((prev, currRole, i) => {
        let currEmoji = emojis[i];
        return Object.assign(Object.assign({}, prev), { [currRole]: currEmoji });
    }, {});
}
exports.createRoleEmojiObject = createRoleEmojiObject;
function AssignRoles(sentMsg, rolesWithEmojies) {
    if (sentMsg) {
        const { guild, channel } = sentMsg;
        let filter = (reaction) => Object.values(rolesWithEmojies).includes(reaction.emoji.name);
        let collector = sentMsg.createReactionCollector(filter);
        collector.on('collect', (reaction, user) => {
            console.log(user.username);
            let role = guild === null || guild === void 0 ? void 0 : guild.roles.cache.find(role => {
                console.log(role.name, rolesWithEmojies, reaction.emoji.name);
                return rolesWithEmojies[role.name] == reaction.emoji.name;
            });
            let member = guild === null || guild === void 0 ? void 0 : guild.member(user.id);
            if (role != undefined) {
                channel.send(`${role.name} is added to ${member === null || member === void 0 ? void 0 : member.displayName}`);
                member === null || member === void 0 ? void 0 : member.roles.add(role.id);
            }
        });
    }
}
exports.AssignRoles = AssignRoles;
