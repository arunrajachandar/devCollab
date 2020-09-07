const express = require('express');
const {connectProdDB, connectTestDB} = require('./config/db');
const authRouter = require('./routes/apis/auth');
const postsRouter = require('./routes/apis/posts');
const profileRouter = require('./routes/apis/profile');
const usersRouter = require('./routes/apis/users');
const { connect } = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
// const { createProxyMiddleware } = require('http-proxy-middleware');

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


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT)

module.exports = app;
// module.exports = function(app) {
//     app.use(
//       '/api',
//       createProxyMiddleware({
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//       })
//     );
//   };