import { MessageEmbed } from "discord.js";

export const AshEmbed = (data: any ):MessageEmbed => {

    let defaultStatVal = 'N/A'

    const ashEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setDescription(data.description)
        .setImage(data.image)
        .addField('Affinity', '' + data.affinity, true)
        .addField('Skill', '' + data.skill, true)

    return ashEmbed
}