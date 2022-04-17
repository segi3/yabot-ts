import mongoose from 'mongoose'

const reqString = {
    type: String,
    required: true
}

const tweetLogSchema = new mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    username: reqString,
    discriminator: reqString,
    tweetId: reqString,
    tweetLink: reqString,
    content: reqString
})

export default mongoose.model('tweetLogs', tweetLogSchema)