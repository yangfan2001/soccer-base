const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')
const connection = require('../db/connection') // 建立与mysql的连接



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  next();
});


/* login*/
router.post('/login', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let query = `select * from user where user_name='${username}'and password='${password}'`

  connection.query(query,(err,row,fields)=>{
    if (err) throw (err);
    if(row.length>0) {
      //登陆成功
      let data = row[0]
      res.send({status:true,user_name:data.user_name,user_id:data.user_id,auth:data.user_type})
    }
    else{
      //登陆失败
      res.send({status:false})
    }
  })
});

/* register*/
router.post('/register', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let query = `select * from user where user_name='${username}'`

  console.log(username,password)

  connection.query(query,(err,row,fields)=>{
    if (err) throw (err);
    if(row.length>0) {//存在重复的账号名或者邮箱
      res.send({status:false})
    }
    else{
      insert_query = `Insert into user(user_name,password) values('${username}','${password}');`
      console.log(insert_query)
      connection.query(insert_query,(err,row,fields)=>{
        if (err) throw (err);
      })
      res.send({status:true})
    }
  })
});

module.exports = router;
