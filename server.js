import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import express, { urlencoded } from  'express';
import cors from "cors";
import pgk  from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import post from './Src/Routes/post.js';
import fetchUsers from './Src/Routes/get.js';
import deleteUser from './Src/Routes/delete.js';
import updateUser from './Src/Routes/put.js';

const port = process.env.PORT || 5020;

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Zarttech API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Zarttech Cohort 5 TypeScript application",
    },
    servers: [
      {
        url: "http://localhost:6080",
        description: "Development server",
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: [
    //   "./src/routes/*.ts", // Matches: /routes/users.ts
      "./Src/Routes/*.js",
    ],
  };

  const swaggerSpec = swaggerJSDoc(options);

let corOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use( express.json());
app.use(cors(corOptions));
app.use(express.urlencoded({extended: true}));
app.disable("x-powered-by");
const {Client} = pgk;


export const connectSql =  new Client({
    user :process.env.USER_NAME,
    host : process.env.HOST_ADDRESS,
    database : process.env.DATABASE_NAME,
    password: process.env.PASSWORD ,
    port : parseInt(process.env.SQL_PORT, 10)
});

connectSql.connect((err) => {
    if(err) {
        console.log("Failed to connect to the sql server", err.stack);
    } else{
        console.log("Sql database is connected successfully");
    }
});

app.get('/api/get/:id', async(req, res) =>{
    try{
        res.status(200).send("<h1>Hello sql developers</h1>");
        console.log("Successful");
    }catch (error){
        res.status(400).send("Bad request")
        console.log("Something went wrong ", error)
    }
});

// swagger set up
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', post);
app.use('/api/v1', fetchUsers);
app.use('/api/v1', deleteUser);
app.use('/api/v1', updateUser);

app.listen(port, () => {
    console.log(`server started running on port ${port}`);
})