import { SlashCommandBuilder } from "@discordjs/builders"
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { WeaponEmbed } from "../../data/embeds/elden/weapon-embed";
import { FetchEldenRingAPI } from "../../service/elden";

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

        if (category != 'weapons') {
            await interaction.editReply('cuma bisa weapon aja sekarang ehe')
            return
        }

        const response = await FetchEldenRingAPI(category, itemName)
        
        if (response == 'err:failed') {
            await interaction.editReply('an error occured :(')
        }

        const weaponEmbed = WeaponEmbed(response.data[0])

        await interaction.editReply({
            embeds: [weaponEmbed]
        })

    }
}