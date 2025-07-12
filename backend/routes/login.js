var express = require('express');
var router = express.Router();
const db = require('../dbconfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.post('/userlogin', async (req,res)=>{
    const {user_name, user_password} = req.body;
    try{
        const result = await db.query(`Select * from users where user_name=$1 or user_code=$1`,[user_name]);

        if(result.rows.length == 0){
            return res.status(401).json({message:'User Not found'});
        }

        const user = result.rows[0];
        console.log(user.password, user_password);

        const passwordMatch = await bcrypt.compare(user_password, user.password);
        console.log(process.env.SECRET_KEY, "process.env.SECRET_KEY");

        if(!passwordMatch){
            return res.status(402).json({message:'Invalid crential'});
            
        }

        const token = jwt.sign(
            {user_id:user.user_id, user_name:user.user_name},
            process.env.SECRET_KEY,
            {expiresIn:'24h'}
        );

        const usercloneData = {...user, token:token}

        res.status(200).json({message:'Login Sucessful', user_data:usercloneData});

    }
    catch(err){
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });   
    }
})

async function generateHashedPassword(plainPassword) {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        console.log(hash, "hash");
        console.log('Hashed password:', hash);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

// generateHashedPassword('1234');



module.exports = router;