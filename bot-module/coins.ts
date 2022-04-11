import profileSchema from "../schemas/profile-schema"

interface loose {
    [key: string]: any
}
var coinsCache: loose = {}

export const AddCoins = async(guildId: string, userId: string, coins: number) => {

    const result = await profileSchema.findOneAndUpdate({
        guildId, userId
    }, {
        guildId,
        userId,
        $inc: {
            coins
        }
    }, {
        upsert: true,
        new: true
    })

    coinsCache[`${guildId}-${userId}`] = result.coins

    return result.coins
}

export const GetCoins = async(guildId: string, userId: string) => {
    
    const cachedCoins = coinsCache[`${guildId}-${userId}`]

    if (cachedCoins) return cachedCoins

    let coins = 0
    const result = await profileSchema.findOne({
        guildId,
        userId
    })

    if (result) {
        coins = result.coins
    } else {
        await new profileSchema({
            guildId,
            userId,
            coins
        }).save()
    }

    coinsCache[`${guildId}-${userId}`] = coins

    return coins
}