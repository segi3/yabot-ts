import { Client, Message } from "discord.js";

export default (client: Client) => {
    
    client.on('messageCreate', (message) => {
        if (message.author.bot || message.content.startsWith('+')) {
            return
        }

        const { guild, member } = message

        const min = 15
        const max = 23
        let xp = Math.floor(
            Math.random() * (max-min+1) + min
        )

        addGuildMemberXP(guild!.id, member!.id, xp, message)

        console.log(message.content)
    })
}

const addGuildMemberXP = (guildId: string, userId: string, xp: number, message: Message) => {
    // TODO: MONGDODB LOGIC
}