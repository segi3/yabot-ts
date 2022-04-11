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