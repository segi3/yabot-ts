import { TwitterClient } from 'twitter-api-client'

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY!,
    apiSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

export const TweetStatusUpdate = async (status: string) => {
    try {
        const response = await twitterClient.tweets.statusesUpdate({
            status: status
        })

        return response.id_str

    } catch (err) {
        return 'err:tweet'
    }
}

import tweetLogSchema from "./../schemas/tweet-log-schema"

export const LogTweet = async (log:any) => {
    try {
        const response = await new tweetLogSchema(log).save()

        return true

    } catch (err) {

        console.log(err)

        return false

    }
}