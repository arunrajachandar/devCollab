const app = require("../../server"); // Link to your server file
const supertest = require("supertest");
const { expect } = require("chai");
const request = supertest(app);
const config = require('config');
const testDb = config.get('testMongoURI');
const mongoose = require('mongoose');
const User = require('../../models/users');

describe('Users - /apis/users',()=>{
  beforeAll(async (done) => {
    await mongoose.connect(testDb, {useNewUrlParser: true, 
      useUnifiedTopology: true,
  useCreateIndex: true,
useFindAndModify: false}, done)
  });
  test("/",  async() => {
    // Sends GET Request to /test endpoint
    return await request.get("/").expect(200);
        // ...
  });

  test('POST - Create User',async(done)=>{
  
   return await request
    .post('/apis/users/')
    .send({
      name: 'ArunR',
      password: 'asdfff',
      email: 'asdfadfg@gmail.com'
  })
    .expect(200)
    .catch(done)
})

afterEach(async () => {
  await User.deleteMany();
});

})
