var express = require('express');
var router = express.Router();
const db = require('../dbconfig');



/* GET users listing. */
router.post('/userlogin', (req, res) => {
    const { username, password } = req.body;

    db.query('Select * from users', [username, password]
        , (err, results) => {
            if (err) {
                throw err
            }

            res.json(results.rows);

        })
})

router.post('/getuserData', (req, res) => {
    const user_id = req.body.user_id;
    console.log(req.body);
    const query = `Select user_id,user_code,user_name,level,ul.level_name,account_balance
  ,match_commission_percentage, created_by, session_commission_percentage, commission_type from users
  left join user_level ul on ul.level_id = users.level where users.user_id=$1`

    db.query(query, [user_id]
        , (err, results) => {
            if (err) {
                throw err
            }

            res.status(200).json(results.rows);

        })
})

router.get('/getallusersData', (req, res) => {
    
    const query = `Select * from users`

    db.query(query,
         (err, results) => {
            if (err) {
                throw err
            }

            res.status(200).json(results.rows);

        })
})

router.post('/getparentuserDatabyuserid', (req, res) => {
    const user_id = req.body.user_id;
    console.log(req.body, "parentdata");
    const query = `select *, us.user_code as parent_code, us.account_balance as parent_account_balance,us.level as parent_level from users
    join users us on users.created_by = us.user_id where users.user_id = $1`

    db.query(query, [user_id]
        , (err, results) => {
            if (err) {
                throw err
            }

            res.status(200).json(results.rows);

        })
})


router.get('/getlevelData', (req, res) => {

    const query = `Select * from user_level`

    db.query(query, (err, results) => {
        if (err) {
            throw err
        }

        res.status(200).json(results.rows);

    })
})


router.post('/getusershierarchicaldata', (req, res) => {
    console.log(req.body, "getusershierarchicaldata");
    const query = `Select * from getusers_hierarchical_data(${req.body.created_by})`;
    // const value = req.body.created_by;

    db.query(query, (err, results) => {
        if (err) {
            throw err
        }

        res.status(200).json(results.rows);

    })
})

router.post('/getlastusersdataacctolevel', (req, res) => {

    console.log(req.body, "getlevel");
    const level = req.body.level;

    const query = `SELECT * FROM users WHERE user_id = (SELECT MAX(user_id) FROM users where level = ${level})`;

    // const value = req.body.created_by;

    db.query(query, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results);
        res.status(200).json(results.rows);

    })
})

router.post('/adduser', async (req, res) => {
    console.log(req.body, "adduserdata");
    const { parent_user_id, user_code, user_name, password, level, parent_account_balance, account_balance, match_commission_percentage, created_by, commission_type, reference, session_commission_percentage } = req.body;

    const parent_remaining_account_balance = parent_account_balance - account_balance;
    console.log(parent_remaining_account_balance, "parent_remaining_account_balance")

    const query1 = `Insert into public.users(user_code, user_name, user_password, privilege_id, level, account_balance, match_commission_percentage, created_by, commission_type, reference, session_commission_percentage) values($1,$2,$3,$4,$4,$5,$6,$7,$8,$9,$10)`;
    const values1 = [user_code, user_name, password, level, account_balance, match_commission_percentage, created_by, commission_type, reference, session_commission_percentage];
    const query2 = `Update users set account_balance=$1 where user_id = $2`;
    // const value = req.body.created_by;
    try {
        await db.query('BEGIN');
        await db.query(query1, values1);
        const updateAccount = await db.query(query2, [parent_remaining_account_balance, parent_user_id]);
        await db.query('COMMIT');
        res.status(200).json({ message: 'User Added Successfully!' })
    }
    catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
})

router.post('/edituser',(req,res)=>{
    console.log(req.body);
    const {mobile_share, match_share, commission_type, match_commission_percentage, session_commission_percentage, user_id} = req.body
    const query = `update users set commission_type= $1,match_commission_percentage = $2,session_commission_percentage = $3  where user_id = $4`;

    db.query(query,[commission_type, match_commission_percentage, session_commission_percentage, user_id],(err,result)=>{
        if (err){
            console.error(err);
            throw err;
        }

        res.status(200).json({message:'User Updated Successfully!'});
    })
})


router.post('/updateStatus',(req,res)=>{
    console.log(req.body);
    const status = + req.body.status;
    const user_id = + req.body.user_id;
    const query = `update users set status = $1 where user_id = $2`;

    db.query(query,[status,user_id],(err,result)=>{
        if (err){
            console.error(err);
            throw err;
        }

        res.status(200).json({message:'Status Changed!'});
    })
})

router.post('/updateaccountlock',(req,res)=>{
    console.log(req.body);
    const account_lock = + req.body.account_lock;
    const user_id = + req.body.user_id;
    const query = `update users set account_lock = $1 where user_id = $2`;

    db.query(query,[account_lock,user_id],(err,result)=>{
        if (err){
            console.error(err);
            throw err;
        }

        res.status(200).json({message:'Account Status Changed!'});
    })
})

router.post('/updatebetlock',(req,res)=>{
    console.log(req.body);
    const bet_lock = + req.body.bet_lock;
    const user_id = + req.body.user_id;
    const query = `update users set bet_lock = $1 where user_id = $2`;

    db.query(query,[bet_lock,user_id],(err,result)=>{
        if (err){
            console.error(err);
            throw err;
        }

        res.status(200).json({message:'Betting Status Changed!'});
    })
})

router.post('/updatePassword',(req,res)=>{
    console.log(req.body);
    const password = req.body.newPass;
    const user_id = + req.body.user_id;
    const query = `update users set user_password = $1 where user_id = $2`;

    db.query(query,[password,user_id],(err,result)=>{
        if (err){
            console.error(err);
            throw err;
        }

        res.status(200).json({message:'Password Changed!'});
    })
})


router.post('/depositcoins', async(req,res)=>{
    console.log(req.body);
    const {parent_account_balance,account_balance, parent_id, user_id} = req.body

    const query = `update users set account_balance = $1 where user_id = $2`;

    await db.query(query, [parent_account_balance,parent_id]) ;
    await db.query(query, [account_balance,user_id]) ;

    res.status(200).json({message:'Coins deposited!'});
})



module.exports = router;
