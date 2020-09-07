const express = require('express');
const {connectProdDB, connectTestDB} = require('./config/db');
const authRouter = require('./routes/apis/auth');
const postsRouter = require('./routes/apis/posts');
const profileRouter = require('./routes/apis/profile');
const usersRouter = require('./routes/apis/users');
const { connect } = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json({extended: false}))



const PORT = process.env.PORT||5000;

    connectProdDB();
// else{
//     connectTestDB();
// }


app.use('/apis/auth', authRouter);
app.use('/apis/posts', postsRouter);
app.use('/apis/profile', profileRouter);
app.use('/apis/users', usersRouter);

app.listen(PORT,()=>{
    console.log('Running')
})

module.exports = app;