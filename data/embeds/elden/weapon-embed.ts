import { MessageEmbed } from "discord.js"

export const WeaponEmbed = (data: any ):MessageEmbed => {

    let weapon_att: any = []
    let weapon_def:any = []
    let weapon_scales:any = []
    let weapon_attr:any = []

    
    for (var stat of data.attack) {
        let statval = 'n/a'
        if (stat.amount != null || stat.amount != 'null') statval = stat.amount

        weapon_att.push({
            name: stat.name,
            value: statval + '',
            inline: true
        })
    }

    for (var stat of data.defence) {
        let statval = 'n/a'
        if (stat.amount != null || stat.amount != 'null') statval = stat.amount

        weapon_def.push({
            name: stat.name,
            value: statval + '',
            inline: true
        })
    }

    for (var stat of data.scalesWith) {
        let statval = 'n/a'
        if (stat.scaling != null) statval = stat.scaling

        weapon_scales.push({
            name: stat.name,
            value: statval + '',
            inline: true
        })
    }

    for (var stat of data.requiredAttributes) {
        let statval = 'n/a'
        if (stat.amount != null || stat.amount != 'null') statval = stat.amount

        weapon_attr.push({
            name: stat.name,
            value: statval + '',
            inline: true
        })
    }

    const targetEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setDescription(data.description)
        .setImage(data.image)
        .addField('Category', data.category, true)
        .addField('Weight', '' + data.weight, true)
        .addField('Attack',' Weapon attack stats', false)
        .addFields(weapon_att)
        .addField('Defence',' Weapon defence stats', false)
        .addFields(weapon_def)
        .addField('Weapon Scaling',' Weapon scaling stats', false)
        .addFields(weapon_scales)
        .addField('Required Attributes',' Attributes required to effectively equip weapon', false)
        .addFields(weapon_attr)

    return targetEmbed
}