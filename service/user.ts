import profileSchema from "../schemas/profile-schema"

export const GetUser = async (username: string, discriminator: string, guildId: string, userId: string) => {

    const result = await profileSchema.findOneAndUpdate({
        guildId, userId
    }, {
        username: username,
        discriminator: discriminator
    }, {
        upsert: true,
        new: true
    })

    return result
}

export const AddUserXp = async (guildId: string, userId: string, xpToAdd: number) => {

    const result  = await profileSchema.findOneAndUpdate({
        guildId, userId
    }, {
        guildId,
        userId,
        $inc: {
            xp: xpToAdd
        }
    }, {
        upsert: true,
        new: true
    })

    return result
}

export const AddUserLevel = async (guildId: string, userId: string, level: number, xpRemaining: number) => {

    const result = await profileSchema.updateOne({
        guildId, userId
    }, {
        level,
        xp: xpRemaining
    })

    return result
}