const express = require('express');
const app = express();

const queryParmasCaseInsensitive = require('./api/helpers/queryParmasCaseInsensitive');
app.use(queryParmasCaseInsensitive);

const productRoutes = require('./api/routes/product');
app.use('/products', productRoutes);

app.use((req,res,next)=>{
    const error = new Error('Resource Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    const status= error.status || 500;
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started - listening at http://localhost:${port}`);
});