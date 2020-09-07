const mongoose = require('mongoose');
const config = require('config');
const prodDb = config.get('prodMongoURI');
const testDb = config.get('testMongoURI');

const connectProdDB = async () => {
    try{
        await mongoose.connect(prodDb, {useNewUrlParser: true, 
            useUnifiedTopology: true,
        useCreateIndex: true,
    useFindAndModify: false})
    }catch(err){
        process.exit(1)
    }
}

const connectTestDB =  async () => {
    try{
     await mongoose.connect(testDb, {useNewUrlParser: true, 
            useUnifiedTopology: true,
        useCreateIndex: true,
    useFindAndModify: false})
    }catch(err){
        process.exit(1)
    }
}

module.exports = {
    connectProdDB,
    connectTestDB};