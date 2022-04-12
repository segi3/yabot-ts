import { SlashCommandBuilder } from "@discordjs/builders"
import { BaseCommandInteraction, GuildMember } from "discord.js"
import { ProfileEmbed } from "../../data/embeds/profile-embed"
import { GetUser } from "../../service/user"

export default {
    legacy: false,
    slash: true,
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Show profile summary'),
    execute: async (interaction: BaseCommandInteraction) => {

        const { guild, member } = interaction
        const username = member!.user.username
        const discriminator = member!.user.discriminator

        const user = await GetUser(username, discriminator, guild!.id, member!.user.id)
        
        const profileEmbed = ProfileEmbed(interaction.member as GuildMember, user)

        await interaction.reply({
            embeds: [profileEmbed]
        })
    }
}