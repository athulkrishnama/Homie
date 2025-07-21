import mongoose from "mongoose";

export class MongodbConnect {

    public static async connect() {
        try {
            if (process.env.MONGODB_URL) {
                await mongoose.connect(process.env.MONGODB_URL)
                console.log("Mongodb Connected")
            } else {
                throw new Error("Invalid mongodb url or url not provided in env")
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
}