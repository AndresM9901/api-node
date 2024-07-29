const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.USERBD}:${process.env.PASSBD}@adso2669736.kkecyyy.mongodb.net/${process.env.BD}?appName=ADSO2669736`;
mongoose.connect(uri);



module.exports = mongoose;