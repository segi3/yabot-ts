import { GuildMember, MessageEmbed } from "discord.js";
import { GetRequiredXP } from "../../features/levels";

export const ProfileEmbed = (member: GuildMember, data: any):MessageEmbed => {

    const requiredXP = GetRequiredXP(data.level)

    const profileEmbed = new MessageEmbed()
        .setAuthor({
            name: `${member.displayName}`,
        })
        .setThumbnail(`${member.displayAvatarURL()}`)
        .setColor(`${member.displayHexColor}`)
        .addFields({
            name: 'Level',
            value: `${data.level}`,
            inline: true
        }, {
            name: 'XP',
            value: `${requiredXP} / ${data.xp}`,
            inline: true
        }, {
            name: 'Coins',
            value: `${data.coins}`,
            inline: false
        }, {
            name: 'Count Contributions',
            value: `${data.count_contributions}`,
            inline: false
        })

    return profileEmbed
}