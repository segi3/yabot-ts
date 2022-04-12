import { SlashCommandBuilder } from "@discordjs/builders"
import axios from "axios";
import { MessageEmbed } from "discord.js";

export default {
    legacy: false,
    slash: true,
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Seek Elden Ring Info')
        .addStringOption(option =>
            option.setName('category')
            .setDescription('Elden Ring information category')
            .setRequired(true)
            .addChoice('Weapon', 'weapons')
            .addChoice('Ammo', 'ammos')
            .addChoice('Armor', 'armors')
            .addChoice('Ashes of War', 'ashes')
            .addChoice('Boss', 'bosses')
            .addChoice('Class', 'classes')
            .addChoice('Creature', 'creatures')
            .addChoice('Incantation', 'incantations')
            .addChoice('Item', 'items')
            .addChoice('NPC', 'npcs')
            .addChoice('Shield', 'shields')
            .addChoice('Spirit', 'spirits')
            .addChoice('Talisman', 'talismans')
        )
        .addStringOption(option =>
            option.setName('item_name')
            .setDescription("item's name")
            .setRequired(true)
        ),
    execute: async (interaction: any) => {

        await interaction.deferReply();

        console.log('seek')

        const category = interaction.options.getString('category')
        const itemName = interaction.options.getString('item_name')

        if (category != 'weapons') {
            await interaction.editReply('cuma bisa weapon aja sekarang ehe')
            return
        }

        axios.get(`https://eldenring.fanapis.com/api/${category}?name=${itemName}`)
            .then(async (res) => {
                const data = res.data.data[0]

                if (res.data.data < 1) {
                    await interaction.editReply('visions of sadness, seek not found')
            return
                }

                let weapon_att: any = []
                let weapon_def:any = []
                let weapon_scales:any = []
                let weapon_attr:any = []

                // console.log(data.attack[0])

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
                // console.log(weapon_att)
                // console.log(weapon_def)
                // console.log(weapon_scales)
                // console.log(weapon_attr)

                // temprary, TODO: make embed class
                const weaponEmbed = new MessageEmbed()
                    .setTitle(data.name)
                    .setDescription(data.description)
                    .setImage(data.image)
                    .addField('Attack',' Weapon attack stats', false)
                    .addFields(weapon_att)
                    .addField('Defence',' Weapon defence stats', false)
                    .addFields(weapon_def)
                    .addField('Weapon Scaling',' Weapon scaling stats', false)
                    .addFields(weapon_scales)
                    .addField('Required Attributes',' Attributes required to effectively equip weapon', false)
                    .addFields(weapon_attr)
                
                    
                // console.log(weaponEmbed)
                
                await interaction.editReply({
                    embeds: [weaponEmbed]
                })

            })
            .catch(async (err) => {
                console.log(err)
                await interaction.editReply('error occured :(')
            })

        // const res = await fetch(`https://eldenring.fanapis.com/api/${category}?name=${itemName}`)
        // const body = await res.text()

        // console.log(body)
    }
}