import {connect, connection} from 'mongoose';

export async function dbConnect(){
    const db = await connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${db.connection.host}`);
}

connection.on("connected", () => {
    console.log("MongoDB is connected");
})

connection.on("error", (err) => {
    console.log(err);
})