import { BaseCommandInteraction, MessageActionRow, MessageButton } from "discord.js";

const GetRow = (index: number, length: number) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('prev')
                .setStyle('PRIMARY')
                .setLabel('prev')
                .setDisabled(index === 0)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('next')
                .setStyle('PRIMARY')
                .setLabel('next')
                .setDisabled(index === length - 1)
        )
        .addComponents(
            new MessageButton()
                .setCustomId('finish')
                .setStyle('SECONDARY')
                .setLabel('finish')
                .setDisabled(false)
        )

        return row

}

export const Paginate =  async (interaction: BaseCommandInteraction, pages: any, time = 60000) => {

    if (!interaction || !pages || !(pages.length > 0) || !(time > 10000)) return 'err:arg_not_complete'

    let index = 0
    let row = GetRow(index, pages.length)
    
    const messageData = {
        embeds: [pages[index]],
        components: [row],
        fetchReply: true
    }
    
    const msg:any = await interaction.editReply(messageData)

    const collector = msg.createMessageComponentCollector({
        filter: (i: any) => i.user.id === interaction.user.id,
        time
    })

    collector.on('collect', (i:any) => {
        if (i.customId == 'prev') index--
        else if (i.customId == 'next') index++
        else return collector.stop()

        i.update({
            components: [GetRow(index, pages.length)],
            embeds: [pages[index]]
        })
    })

    collector.on('end', () => {
        msg.edit({
            components: []
        })
    })
}