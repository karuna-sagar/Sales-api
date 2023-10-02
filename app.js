const express = require('express');
require('express-async-errors');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const dotenv = require('dotenv');
dotenv.config();
const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
//Middleware

app.use(express.json());


app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);


app.use(notFound);
app.use(errorMiddleware);


const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));
    }
    catch (err) {
        console.log(err);
    }
}
start();