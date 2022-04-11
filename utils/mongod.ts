import mongoose from 'mongoose'

export default async() => {
    await mongoose.connect(process.env.MONGO_URI || '', {
        keepAlive: true
    }, (err) => {
        if (err) console.log(err)
        console.log('connected to mongod')
    })

    return mongoose
}