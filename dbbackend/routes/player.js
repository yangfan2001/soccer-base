const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')
const connection = require('../db/connection') // 建立与mysql的连接

// 添加球员信息
router.post('/new',(req,res,next)=> {
    //获取ID
    const query1 = `Insert into player(player_name, country, team_name, player_value, player_avatar_url,position) 
                          values('${req.body.player_name}','${req.body.country}','${req.body.team_name}',
                          '${req.body.player_value}','${req.body.player_avatar_url}','${req.body.position}');`

    connection.query(query1,(err,row,fields)=>{
        if (err) throw (err);
        res.send({suc:true})
    })
    return
})
// 获取球员的信息(根据ID)
router.get('/detail/:id',(req,res,next)=> {
    //获取ID
    const id = req.params.id
    const query1 = `select * from player where player_id = '${id}'`
    connection.query(query1,(err,row,fields)=>{
        if (err) throw (err);
        res.send({player_data:row})
    })
    return
})
// 模糊搜索球队信息
/* 根据输入的帖子名进行模糊匹配搜索帖子名称 */
router.get('/search/:name',(req,res,next)=> {
    //获取ID
    const name = req.params.name // '1'
    const query = `select * from player where player.player_name like'%${name}%'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            player_data:row
        })
    })
    return
})
module.exports = router;