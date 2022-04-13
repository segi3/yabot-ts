import mongoose from 'mongoose'

const reqString = {
    type: String,
    required: true
}

const tweetLogSchema = new mongoose.Schema({
    username: reqString,
    discriminator: reqString,
    accessToken: reqString,
    accessTokenSecret: reqString,
    userId: reqString,
    twitterUsername: reqString
})

export default mongoose.model('twitter_access_tokens', tweetLogSchema)