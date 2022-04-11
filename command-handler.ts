const { REST } = require('@discordjs/rest')
import { Client, Collection } from "discord.js"
const { Routes } = require('discord-api-types/v9')
import fs from 'fs'
import getFiles from './get-files'

export default (client: Client) => {

    const commands = {} as {
        [key: string]: any
    }
    const commandsData = []

    const suffix = '.ts'

    const commandFiles = getFiles('./commands', suffix)
    console.log(commandFiles)

    for (const command of commandFiles) {
        let commandFile = require(command)
        if (commandFile.default) commandFile = commandFile.default

        const split = command.replace(/\\/g, '/').split('/')
        const commandName = split[split.length - 1].replace(suffix, '')

        commands[commandName.toLowerCase()] = commandFile
        commandsData.push(commands[commandName.toLowerCase()].data.toJSON())
    }

    // console.log(commands)

    const token = process.env.TOKEN!
    const guildId =  process.env.TEST_GUILD_ID
    const clientId = client.user!.id

    const rest = new REST({version: '9'}).setToken(token)
    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commandsData})
        .then(() => console.log('successfully registered guild bot commands!'))
        .catch(console.error)

    if (process.env.GLOBAL_COMMAND) {
        console.log('registering global command...')
        rest.put(Routes.applicationCommands(clientId, guildId), {body: commandsData})
            .then(() => console.log('registering global command...done!'))
            .catch(console.error)
    }
    

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith('+')) {
            return
        }

        const args = message.content.slice(1).split(/ +/)
        const commandName = args.shift()!.toLowerCase()

        if (!commands[commandName]) return

        try {
            commands[commandName].callback(message, ...args)
        } catch (err) {
            console.log(err)
        }
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        if (!commands[interaction.commandName]) return

        try {
            commands[interaction.commandName].execute(interaction)
        } catch (err) {
            console.log(err)
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    })
}