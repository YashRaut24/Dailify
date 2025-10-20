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
        task: request.body.task,
        category: request.body.category
    };
    
    collec.insertOne(obj)
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.delete("/delete", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Tasks");
    
    collec.deleteOne({ 
        task: request.body.task,
        category: request.body.category
    })
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.get("/tasks/:category", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Tasks");
    
    collec.find({ category: request.params.category }).toArray()
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.get("/tasks", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Tasks");
    
    collec.find({}).toArray()
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.post("/category/add", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Categories");
    
    let obj = {
        id: request.body.id,
        name: request.body.name
    };
    
    collec.insertOne(obj)
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.get("/categories", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Categories");
    
    collec.find({}).toArray()
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.delete("/category/delete", (request, response) => {
    let client = new MongoClient(url);
    client.connect();
    let db = client.db("Dailify");
    let collec = db.collection("Categories");
    
    collec.deleteOne({ id: request.body.id })
        .then((result) => {
            client.close();
            response.send(result);
        })
        .catch((error) => {
            client.close();
            response.send(error);
        });
});

app.listen(9000, () => {
    console.log("Express is Active on port 9000");
});