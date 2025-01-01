
import { Router} from 'express';
import { connectSql } from '../../server.js';

const router = Router();

/**
 *  @swagger
 *  /api/v1/post:
 *    post:
 *     summary: A post request
 *     description: Post request to register users with their names, email, password and id
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *             type: VARCHAR
 *             description: the name of the new user
 *             example: string
 *            email:
 *             type: VARCHAR
 *             description: the email address of the new user
 *             example: string
 *            password:
 *             type: VARCHAR
 *             description: password of the new user
 *             example: string
 *            id:
 *             type: INTEGER
 *             description: id of the new user
 *             example: integer
 *     responses:
 *      201:
 *        description: Created  
 *               
 *      500:
 *        description: server error
 */

router.post('/post', async(req, res) => {
    const {name, email, password, id} = req.body;
    try{
        const postQuery = `
        INSERT INTO users ( name, email, password, id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [name, email, password, id];
        const result = await connectSql.query(postQuery, values);
        res.status(201).json(result.rows[0]);
    }catch (error){
        console.error('Error registering user:', error);
        res.status(500).json(error);
    }


   
        // const insertQuery = 'INSERT INTO users (name, email, password, id) VALUES($1, $2, $3, $4)'
        // connectSql.query(insertQuery, [name, email, password, id], (err, data) =>{
        //     if(err){
        //         res.send(err)
        //     } else{
        //         console.log("User registered")
        //         res.status(201);
        //         res.json( insertQuery);
        //     }
        // })
    
})
export default router;