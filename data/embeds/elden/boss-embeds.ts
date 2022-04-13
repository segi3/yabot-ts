import { MessageEmbed } from "discord.js";

export const BossEmbed = (data: any ):MessageEmbed => {
    
    let drops = ''
    let defaultVal = 'n/a'

    if (data.drops.length > 0) {
        for (var drop of data.drops) {
            drops = drops + drop + '\n'
        }
    }

    const bossEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setDescription(data.description)
        .setImage(data.image)
        .addField('Boss Health Points', data.healthPoints, false)
        .addField('Region', data.region, true)
        .addField('Location', data.location, true)

    if (data.drops.length > 0) {
        bossEmbed.addField('Boss drops', drops, false)
    }
    
    return bossEmbed
}