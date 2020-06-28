import { Message, MessageReaction } from "discord.js"

export interface Obj<T> {
    [key: string]: T
}

export function createRoleEmojiObject({roles, emojis}: {roles: string[] | undefined, emojis: string[]}): Obj<string> {
    return (roles || []).reduce((prev, currRole, i) => {
        let currEmoji = emojis[i]
        return { ...prev, [currRole] : currEmoji}
    }, {})
}

export function AssignRoles(sentMsg: Message | undefined, rolesWithEmojies: Obj<string>) {
    if (sentMsg) {
        const {guild, channel} = sentMsg
        let filter = (reaction: MessageReaction) => Object.values(rolesWithEmojies).includes(reaction.emoji.name)
        let collector = sentMsg.createReactionCollector(filter)
        collector.on('collect', (reaction, user) => {
            console.log(user.username);                
            let role = guild?.roles.cache.find(role => {
                console.log(role.name, rolesWithEmojies, reaction.emoji.name)
                return rolesWithEmojies[role.name] == reaction.emoji.name
            });
            let member = guild?.member(user.id)
            if (role != undefined) {
                channel.send(`${role.name} is added to ${member?.displayName}`)
                member?.roles.add(role.id)
            }
        })
    }
}