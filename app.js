const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

const authRouter = require('./Routers/authRouter');
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/plans', planRouter);
app.use("/review", reviewRouter);
