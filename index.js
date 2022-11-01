const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//Middle ware

app.use(cors());
app.use(express.json());

// user: sajjad-mongoDB
// password: u6ucq3NavjYJ7Aiv



const uri = "mongodb+srv://sajjad-mongodb:u6ucq3NavjYJ7Aiv@cluster0.2psefg9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {
        const userCollection = client.db('curd-mongo').collection('user');


        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            res.send(user);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        app.delete('users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            console.log('trying to delete ', id);

            const result = await userCollection.deleteOne(query)

            console.log('trying to delete', id);

            res.send(result);

            console.log(result);
        })

    } finally {

    }
}

run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('curd server is running')
})

app.listen(port, () => {
    console.log(`Listening form ${port} `);
})