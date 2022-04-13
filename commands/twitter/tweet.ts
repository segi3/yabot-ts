import { SlashCommandBuilder } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import { LogTweet, TweetStatusUpdate } from "../../bot-module/twitter";

export default {
    legacy: false,
    slash: true,
    data: new SlashCommandBuilder()
        .setName('tweet')
        .setDescription('tweeter tweet')
        .addStringOption(option =>
            option.setName('status')
            .setDescription('status text')
            .setRequired(true)),
    execute: async (interaction: any) => {

        await interaction.deferReply()

        const { guild, member } = interaction

        // TODO: tweet coin cost

        const status = interaction.options.getString('status')

        if (status.length > 140) {
            await interaction.editReply('150 characters max')
            return
        }

        const twtId = await TweetStatusUpdate(status)

        if (twtId == 'err:tweet') {
            await interaction.editReply('an error occured :( please try again')
            return
        }

        const statusLink = 'https://twitter.com/YabotYa/status/' + twtId

        const log_data = {
            guildId: guild.id,
            userId: member.user.id,
            username: member.user.username,
            discriminator: member.user.discriminator,
            tweetId: twtId,
            tweetLink: statusLink,
            content: status
        }

        await LogTweet(log_data)

        await interaction.editReply(`successfully tweeted. ${statusLink}`)
    }
}