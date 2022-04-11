import { Client, Message, MessageEmbed, TextChannel } from "discord.js";
import profileSchema from "./../schemas/profile-schema";
import { AddCoins, GetCoins } from './../bot-module/coins'
import mongoose from "mongoose";
import { AddUserLevel, AddUserXp } from "../service/user";

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

        AddGuildMemberXP(guild!.id, member!.id, xp, message)
    })
}

export const GetRequiredXP = (level: number):number => level * 100

const AddGuildMemberXP = async (guildId: string, userId: string, xpToAdd: number, message: Message) => {
    
    const result  = await AddUserXp(guildId, userId, xpToAdd)

    let { xp, level } = result

    const requiredXp = GetRequiredXP(level)

    if (xp >= requiredXp) {
        console.log('initial xp ' + xp)
        level++
        let xpRemaining = xp - requiredXp
        
        await AddUserLevel(guildId, userId, level, xpRemaining)

        const levelUpEmbed = new MessageEmbed()
            .setColor('#f9b243')
            .setDescription(`<@${userId}> is now level ${level}!`)
        const botChannel = message.client.channels.cache.get(bot_channels[guildId]) as TextChannel
        botChannel!.send({
            embeds: [levelUpEmbed]
        })

        let coinFromLevelUp = level * 50

        await AddCoins(guildId, userId, coinFromLevelUp)
    }

}