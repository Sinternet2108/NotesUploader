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

    const putData=()=>{
        const csvFile = fs.readFileSync('C:/Users/dell/Desktop/New folder (2)/info/faculty.csv', 'utf8');
        const content = csvFile.split('\n');
        const headers = content[0];
        const data = content.slice(1);
      
        // convert the csv file to json
        const csvJSON = data.map(itm => {
          const row = itm.split(',');
          const obj = {};
          headers.split(',').forEach((elm, index) => {
            if(index<=2) {obj[elm] = row[index]};
          });
          return obj;
        });

        database.collection('faculty').insertMany(csvJSON, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Data inserted into the collection');
            }
        });
    }

    const putSData=()=>{
      const csvFile = fs.readFileSync('C:/Users/dell/Desktop/New folder (2)/info/students.csv', 'utf8');
      let content = csvFile.split('\n');
      content = content.map(con => con+",");
      const headers = content[0];
      const data = content.slice(1);
    
      // convert the csv file to json
      const csvJSON = data.map(itm => {
        const row = itm.split(',');
        const obj = {};
        headers.split(",").forEach((elm, index) => {
          if(index<=2) {obj[elm] = row[index]};
        });
        return obj;
      });

      database.collection('students').insertMany(csvJSON, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Data inserted into the collection');
          }
      });
  }

    putData();
    putSData();
    return database;
}

module.exports = {
    getConnection: getConnection,
    getDb: getDb
}