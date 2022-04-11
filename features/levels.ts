import { Client, Message, MessageEmbed, TextChannel } from "discord.js";
import profileSchema from "./../schemas/profile-schema";
import { addCoins, getCoins } from './../bot-module/coins'
import mongoose from "mongoose";

const { bot_channels } = require('./../data/static/channels.json')

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

const getRequiredXP = (level: number):number => level * 100

const addGuildMemberXP = async (guildId: string, userId: string, xpToAdd: number, message: Message) => {
    
    const result  = await profileSchema.findOneAndUpdate({
        guildId, userId
    }, {
        guildId,
        userId,
        $inc: {
            xp: xpToAdd
        }
    }, {
        upsert: true,
        new: true
    })

    console.log(guildId, userId)

    let { xp, level } = result

    const requiredXp = getRequiredXP(level)

    if (xp >= requiredXp) {
        level++
        xp -= requiredXp

        const levelUpEmbed = new MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`<@${userId}> is now level ${level}!`)
        const botChannel = message.client.channels.cache.get(bot_channels[guildId]) as TextChannel
        botChannel!.send({
            embeds: [levelUpEmbed]
        })

        await profileSchema.updateOne({
            guildId, userId
        }, {
            level, xp
        })

        let coinFromLevelUp = level * 50

        await addCoins(guildId, userId, coinFromLevelUp)
    }

}