const db = require("../model");
require('dotenv').config();

const env = process.env;
const connect = () => {
    db.mongoose.connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: env.DB_DATABASE
    }).then(() => {
        console.log("Successfully connect to database: " + `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`);
    }).catch(err => {
        console.error("Connection error", err);
        // process.exit();
    });
}
connect();
