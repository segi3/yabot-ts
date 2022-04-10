import { SlashCommandBuilder } from "@discordjs/builders"
import { Message, BaseCommandInteraction } from "discord.js"
const wait = require('node:timers/promises').setTimeout

export default {
    legacy: true,
    slash: true,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    callback: async (message: Message, ...args: string[]) => {
        console.log(args)
        await message.reply('pong')
    },
    execute: async (interaction: BaseCommandInteraction) => {
        await interaction.deferReply();
        await wait(4000)
        await interaction.editReply('Pong')
    }
}