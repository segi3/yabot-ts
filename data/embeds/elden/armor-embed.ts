import { MessageEmbed } from "discord.js";

export const ArmorEmbed = (data: any ):MessageEmbed => {

    let armor_dmgNegation: any = []
    let armor_resist: any = []
    let defaultStatVal = 'N/A'

    for (var stat of data.dmgNegation) {
        armor_dmgNegation.push({
            name: stat.name,
            value: stat.amount == null || stat.amount == 'null'  ? defaultStatVal : stat.amount + '',
            inline: true
        })
    }

    for (var stat of data.resistance) {
        armor_resist.push({
            name: stat.name,
            value: stat.amount == null || stat.amount == 'null'  ? defaultStatVal : stat.amount + '',
            inline: true
        })
    }

    const armorEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setDescription(data.description)
        .setImage(data.image)
        .addField('Category', '' + data.category, true)
        .addField('Weight', '' + data.weight, true)
        .addField('Armor damage negation','Armor damage negation stats', false)
        .addFields(armor_dmgNegation)
        .addField('Armor resistance','Armor resistance stats', false)
        .addFields(armor_resist)

    return armorEmbed
}