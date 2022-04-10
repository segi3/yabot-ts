const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { Collection } = require('discord.js')
import getFiles from './get-files'

const commands = {} as {
    [key: string]: any
}

const suffix = '.ts'

const commandFiles = getFiles('./commands', suffix)
console.log(commandFiles)

for (const command of commandFiles) {
    let commandFile = require(command)
    if (commandFile.default) commandFile = commandFile.default

    const split = command.replace(/\\/g, '/').split('/')
    const commandName = split[split.length - 1].replace(suffix, '')

    commands[commandName.toLowerCase()] = commandFile
}

console.log(commands)
