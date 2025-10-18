let express = require("express");
let app = express();
let cors = require("cors");
let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";

app.post("/add", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Tasks");
    
    let obj = {
        task: request.body.task
    };
    
    collec.insertOne(obj)
        .then((result) => response.send(result))
        .catch((error) => response.send(error));
});

app.delete("/delete", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Tasks");
    
    collec.deleteOne({ task: request.body.task })
        .then((result) => response.send(result))
        .catch((error) => response.send(error));
});

app.listen(9000, () => {
    console.log("Express is Active on port 9000");
});