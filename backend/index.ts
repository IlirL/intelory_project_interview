import express, { Request, Response, Application, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import db from './models'
import routes from './routes/api/routes';
dotenv.config();




const app:Application = express();
const port = process.env.PORT || 5000;






//Middlewares
app.use(cors())

//Middleware to parse incoming requests

app.use(express.json());
//HTTP request logger middleware
// app.use(morgan('common'))
//HTTP security middleware
// app.use(helmet());  
//Apply the rate limiting middleware to all requests
// app.use(RateLimit({
//     windowMs:60*60*1000,
//     max:100,
//     standardHeaders:true,
//     legacyHeaders:false,
//     message:'Too many requests from this IP, please try again after an hour'
// }))

    
    app.use('/api', routes);


    app.use(errorMiddleware);

    db.sequelize.sync().then(() => {

    app.listen(port, ()=>{
        console.log("App started");
    })
})



export default app;