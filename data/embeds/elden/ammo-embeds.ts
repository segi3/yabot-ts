import { MessageEmbed } from "discord.js"

export const AmmoEmbed = (data: any ):MessageEmbed => {

    let ammo_attPow: any = []
    let defaultStatVal = 'N/A'

    for (var stat of data.attackPower) {
        ammo_attPow.push({
            name: stat.name,
            value: stat.amount == null || stat.amount == 'null'  ? defaultStatVal : stat.amount + '',
            inline: true
        })
    }

    const ammoEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setDescription(data.description)
        .setImage(data.image)
        .addField('Type', data.type == null ? defaultStatVal : data.type, true)
        .addField('Passive', '' + data.passive, true)
        .addField('Ammo attack power','Ammo stats', false)
        .addFields(ammo_attPow)

    return ammoEmbed
}