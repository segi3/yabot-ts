import { SlashCommandBuilder } from "@discordjs/builders"
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { AmmoEmbed } from "../../data/embeds/elden/ammo-embeds";
import { ArmorEmbed } from "../../data/embeds/elden/armor-embed";
import { AshEmbed } from "../../data/embeds/elden/ashes-embed";
import { BossEmbed } from "../../data/embeds/elden/boss-embeds";
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

        } else if (category == 'bosses') {

            const bossEmbeds:any = []

            for (let x=0; x<response.data.length; x++) {
                bossEmbeds.push(BossEmbed(response.data[x]))
            }

            Paginate(interaction, bossEmbeds)

        } else if (category == 'ammos') {

            const ammoEmbed:any = []

            for (let x=0; x<response.data.length; x++) {
                ammoEmbed.push(AmmoEmbed(response.data[x]))
            }

            Paginate(interaction, ammoEmbed)

        } else if (category == 'armors') {

            const armorEmbed:any = []

            for (let x=0; x<response.data.length; x++) {
                armorEmbed.push(ArmorEmbed(response.data[x]))
            }

            Paginate(interaction, armorEmbed)

        } else if (category == 'ashes') {

            const ashesEmbed:any = []

            for (let x=0; x<response.data.length; x++) {
                ashesEmbed.push(AshEmbed(response.data[x]))
            }

            Paginate(interaction, ashesEmbed)

        }else {
            await interaction.editReply('seek else')
            return
        }

        

    }
}