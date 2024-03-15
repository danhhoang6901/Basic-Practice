const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');
const { checkUserJWT } = require('../middleware/JWTAction');
const homeRouter = require('./homeRouter');

const routers = (app) => {
    app.all('*', checkUserJWT); //moi request den server phai qua middleware check JWT
    app.use('/', homeRouter);
    app.use('/todo', todoRouter);
    app.use('/user', userRouter);
};

module.exports = routers;