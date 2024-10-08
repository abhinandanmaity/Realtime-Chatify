
// import mongoose from "mongoose";



// const connectDb = handler => async (req, res) => {

//     if (mongoose.connections[0].readyState) {
//         return handler(req, res);
//     }
//     await mongoose.connect(process.env.MONGO_URI)
//     return handler(req, res);
// }

// export default connectDb;





// const { MongoClient, ServerApiVersion } = require('mongodb');

// const user = process.env.MONGO_USER;
//         const password = process.env.MONGODB_PASSWORD;
//         const database = process.env.MONGO_DATABASE;

// const uri = `mongodb+srv://${user}:${password}@cluster0.j5s3z.mongodb.net/${database}?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });





import mongoose from "mongoose";

global.mongoose = {
    conn: null,
    promise: null
}

export async function connectDb() {

    if (global.mongoose && global.mongoose.conn) {

        console.log("This is a Existing connection")
        return global.mongoose.conn;
    } else {

        console.log("This is a new connection")
        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const database = process.env.MONGO_DATABASE;

        const connectionString = `mongodb+srv://${user}:${password}@cluster0.j5s3z.mongodb.net/${database}?retryWrites=true&w=majority`

        // const connectionString = `mongodb+srv://${user}:${password}@cluster0.j5s3z.mongodb.net/${database}`

        // const connectionString = `mongodb+srv://colourwave:colourwave@cluster0.j5s3z.mongodb.net/colourwavekipassword?retryWrites=true&w=majority`

        const promise = mongoose.connect(connectionString, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            autoIndex: true
        }).then(mongoose => mongoose);


        global.mongoose = {
            conn: await promise,
            promise
        }

        return await promise;
    }

}







// const mongoose = require('mongoose');

// const user = process.env.MONGODB_USER;
// const password = process.env.MONGODB_PASSWORD;
// const database = process.env.MONGO_DATABASE;
// const uri = `mongodb+srv://${user}:${password}@cluster0.j5s3z.mongodb.net/?retryWrites=true&w=majority`;

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//     try {
//         // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//         await mongoose.connect(uri, clientOptions);
//         await mongoose.connection.db.admin().command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await mongoose.disconnect();
//     }
// }
// run().catch(console.dir);

