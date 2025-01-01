
import { Router} from 'express';
import { connectSql } from '../../server.js';


const router = Router();

/**
 * @swagger
 * /api/v1/deleteUserByName/{name}:
 *  delete:
 *   summary: delete request
 *   description: A delete request that delete a user from the postgresql table by name
 *   tags:
 *     - deleteRequest
 *   parameters:
 *     - name: name
 *       in: query
 *       required: true
 *       description: name of the user to be deleted
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Successful
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *          

 *     404:
 *       description: Not found
 */

router.delete('/deleteUserByName/:name', async(req, res) => {
    const name = req.params.name;
    try{
        const deleteUser =
         `DELETE FROM users
         WHERE name = $1
         RETURNING * ;`;
        const result = await connectSql.query(deleteUser, [name])
        console.log(`${name} is deleted from the database`);
        res.status(200).json( result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(404).json( error);
    }

    // const deleteUserByName = 'DELETE FROM users WHERE name =$1'
    // connectSql.query(deleteUserByName, [name], (err, data) =>{
    //     if(err){
    //         console.log(`Error occured, could not find the uer with ${name} in the database`)
    //         res.send("deleted")
    //     } else{
    //         console.log(`${name} is deleted from the database`)
    //         res.json(data);
    //     }
    // })

});
export default router;