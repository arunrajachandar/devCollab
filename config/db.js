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
        console.log('DB connected')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

const connectTestDB =  async () => {
    try{
     await mongoose.connect(testDb, {useNewUrlParser: true, 
            useUnifiedTopology: true,
        useCreateIndex: true,
    useFindAndModify: false})
        console.log('TestDB connected')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = {
    connectProdDB,
    connectTestDB};