import mongoose from "mongoose"

mongoose.connect(`mongodb+srv://tristan:${process.env.DATABASE_PASSWORD}@cluster0.ahugy.mongodb.net/devroom_eco?retryWrites=true&w=majority`)