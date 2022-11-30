const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')
const connection = require('../db/connection') // 建立与mysql的连接

/* GET users listing. */
router.post('/new',(req,res,next)=>{
    // 直接插入就好...
    const data = {
        post_title:req.body.post_title,
        user_name:req.body.user_name,
        user_id:req.body.user_id,
        block_name:req.body.block_name,
        content:req.body.content,
        post_time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
        cover_url:req.body.cover_url,
        link:req.body.link
    }
    const insert_query = `Insert into post(post_title,user_name,user_id,block_name,content,post_time,cover_url,link) 
                          values('${data.post_title}','${data.user_name}','${data.user_id}',
                          '${data.block_name}','${data.content}','${data.post_time}','${data.cover_url}'
                          ,'${data.link}');`

    connection.query(insert_query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({suc:true,post_id:row.insertId})
    })
    return
})

router.get('/detail/:id',(req,res,next)=> {
    //获取ID
    const id = req.params.id // '1'
    const query = `select * from post where post_id = '${id}'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            post_title:row[0].post_title,
            user_name:row[0].user_name,
            content:row[0].content,
            block_name:row[0].block_name,
            post_time:row[0].post_time,
            link:row[0].link
        })
    })
    return
})
// 根据id删除某个post
router.post('/delete/:id',(req,res,next)=> {
    //获取ID
    const id = req.params.id // '1'
    const query = `delete from post where post_id = '${id}'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            suc:true
        })
    })
    return
})
/* 根据输入的帖子名进行模糊匹配搜索帖子名称 */
router.get('/search/:name',(req,res,next)=> {
    //获取ID
    const name = req.params.name // '1'
    const query = `select user_name,post_id,post_title,post_time,block_name from post where post_title like'%${name}%'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            post_data:row
        })
    })
    return
})

/*获取某个post的comment->return array*/
router.get('/comment/:id',(req,res,next)=> {
    //获取ID
    const id = req.params.id // '1'
    const query = `select * from comment where post_id = '${id}'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        console.log(row)
        res.send({
            comment_data:row
        })
    })
    return
})


/*add comment*/
router.post('/comment/new/:id',(req,res,next)=> {
    //获取ID
    const id = req.params.id // '1'
    const data = {
        user_name:req.body.user_name,
        user_id:req.body.user_id,
        post_id:req.body.post_id,
        content:req.body.content,
        comment_time:dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
    const query = `Insert into comment(user_name,user_id,post_id,content,comment_time) 
                          values('${data.user_name}','${data.user_id}',
                                 '${data.post_id}','${data.content}','${data.comment_time}');`

    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        console.log(row)
        res.send({suc:true})
    })

    return
})

/*get Block Post*/
router.get('/block/:block_name',(req,res,next)=> {
    //获取ID
    const block_name = req.params.block_name // '1'
    const query = `select user_name,post_id,post_title,post_time,cover_url,link from post where block_name = '${block_name}'`

    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({BlockPostData:row})
    })
    return
})

module.exports = router;
