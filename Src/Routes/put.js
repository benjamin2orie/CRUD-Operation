
import { Router} from 'express';
import { connectSql } from '../../server.js';



const putRouter = Router();

/**
 * @swagger
 * /api/v1/updateUsers/{id}:
 *  put:
 *   summary: put request to update the user by their id
 *   description: updating a user from the database through their ID
 *   tags:
 *    - putRequest
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: The id of the user to be updated
 *      schema:
 *       type: string
 *   requestBody:
 *    description: User object that needs to be updated
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *          name:
 *           type: string
 *          email:
 *           type: string
 *          password:
 *           type: string
 *   responses:
 *    200:
 *     description: okay
 * 
 *    400:
 *      description: Unauthorized

 *         
 */

putRouter.put('/updateUsers/:id', async(req, res) =>{
    const  id = req.params.id;
    const { name, email, password} = req.body;
    try{  
    const views = [name, email,password, id];
    const putQuery = `UPDATE users 
    SET name= $1, email= $2, password =$3
     WHERE id = $4
     RETURNING *;
     `;
    const results = await connectSql.query(putQuery, views)
    console.log(results);
    res.status(200).json(results.rows[0]);
} catch(error){
    console.log(error)
    res.status(404).json( `No user with this ${name} and ${email} is found`);
}

});

export default putRouter;