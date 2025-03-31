var express = require('express');
var router = express.Router();
const db = require('../dbconfig');

router.post('/userlogin', (req,res)=>{
    const {user_name, user_password} = req.body;
 
   db.query('select * from users where user_name=$1 and user_password=$2',[user_name, user_password]
   ,(err, results)=>{
    if(err){
        throw err
    }
    
        res.json(results.rows);
    
   })
})



module.exports = router;