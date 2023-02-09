const mongodb = require("mongodb");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const MongoClient = mongodb.MongoClient;

let database;

const getConnection = async ()=>{
    const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
    database = client.db("UploadWebApp");
}   

const getDb = ()=>{
    if(!database)
    {
        throw{message: "Database Not Found"};
    }
    return database;
}

module.exports = {
    getConnection: getConnection,
    getDb: getDb
}