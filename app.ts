import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'


dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
})

client.on('ready', async () => {

    let mongod = require('./utils/mongod')
    if (mongod.default) mongod = mongod.default
    await mongod()

    let handler = require('./command-handler')
    if (handler.default) handler = handler.default
    handler(client)

    let level = require('./features/levels')
    if (level.default) level = level.default
    level(client)


    console.log('Bot is ready!')
})

client.login(process.env.TOKEN)