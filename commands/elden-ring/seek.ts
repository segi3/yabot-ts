import { SlashCommandBuilder } from "@discordjs/builders"
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { WeaponEmbed } from "../../data/embeds/elden/weapon-embed";
import { FetchEldenRingAPI } from "../../service/elden";
import { Paginate } from "../../utils/pagination";

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

        const category = interaction.options.getString('category')
        const itemName = interaction.options.getString('item_name')

        const response = await FetchEldenRingAPI(category, itemName)

        if (response == 'err:failed') {
            await interaction.editReply('an error occured :(')
            return
        } else if (response == 'err:empty') {
            await interaction.editReply('seek not found, therefore try again')
            return
        }

        if (category == 'weapons') {
    
            const weaponEmbeds:any = []
    
            for (let x=0; x<response.data.length; x++) {
                weaponEmbeds.push(WeaponEmbed(response.data[x]))
            }
    
            Paginate(interaction, weaponEmbeds)

        }else {
            await interaction.editReply('seek else')
            return
        }
    }
}