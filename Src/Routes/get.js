
import {Router} from 'express';
import { connectSql } from '../../server.js';


const router = Router();

/**
 *  @swagger
 *  /api/v1/getUsers:
 *    get:
 *     summary: Fetched all the users in the posgresql database
 *     description: Fetch and display all the users with their name, emaail, password, and id
 *     responses:
 *      200:
 *        description: Ok
 *        content:
 *          application/json: 
 *            schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                      type: VARCHAR
 *                      description: user name
 *                      example: Benjamin Orie
 *                     email:
 *                      type: VARCHAR
 *                      description: user email
 *                      example: benj@gmail.com
 *                     password:
 *                      type: VARCHAR
 *                      description: user password
 *                      example: ben234
 *                     id:
 *                      type: INTEGER
 *                      description: user id
 *                      example: 1
 * 
 */

router.get('/getUsers', async(req, res) => {
    try{
        const fetchUsers = 'SELECT * FROM users';
        const result = await connectSql.query(fetchUsers);
        // disabling catche
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
         res.set('Pragma', 'no-cache'); 
         res.set('Expires', '0');

        console.log('users fetched');
        res.status(200).json(result.rows);
    }catch(error){
        console.log(error);
        res.status(404).json(error);
    }
    // const fetchUsers = 'SELECT * FROM users';
    // connectSql.query(fetchUsers, (err, data) => {
    //     if(err){
    //         console.log(err);
    //         res.status(500);
    //         res.json({error: "server error", err});
    //     } else{
    //         console.log('users fetched');
    //         res.status(200);
    //         res.json(data.rows);
    //     }
    // })
})
export default router;