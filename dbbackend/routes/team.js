const express = require('express');
const router = express.Router();
const dayjs = require('dayjs')
const connection = require('../db/connection') // 建立与mysql的连接

// 添加一个球队
router.post('/new',(req,res,next)=> {
    //获取ID
    const query1 = `Select * from team where team_name = '${req.body.team_name}';`
    const query2 = `Insert into team(team_name,country,city,coach,team_avatar_url,team_content) 
                          values('${req.body.team_name}','${req.body.country}','${req.body.city}',
                          '${req.body.coach}','${req.body.team_avatar_url}','${req.body.team_content}');`

    connection.query(query1,(err,row,fields)=>{
        if (err) throw (err);
        if(row.length>0){
            res.send({suc:false})
        }else{
            connection.query(query2,(err,row,fields)=>{
                if (err) throw (err);
                res.send({suc:true})
            })
        }
    })
    return
})
// 获取球队的信息
router.get('/',(req,res,next)=> {
    const query = `select * from team;`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            team_data:row
        })
    })

})
// 根据Name获取信息
router.get('/detail/:name',(req,res,next)=> {
    const name = req.params.name // '1'
    const query1 = `select * from team where team_name = '${name}';`
    const query2 = `select * from player where team_name = '${name}';`
    connection.query(query1,(err,row,fields)=>{
        if (err) throw (err);
        let team_data = row[0]
        connection.query(query2,(err,row,fields)=>{
            if (err) throw (err);
            res.send({
                team_data:team_data,
                player_data:row
            })
        })
    })

})
// 模糊搜索球队信息
/* 根据输入的帖子名进行模糊匹配搜索帖子名称 */
router.get('/search/:name',(req,res,next)=> {
    //获取ID
    const name = req.params.name // '1'
    const query = `select team_name, country, city, coach, team_avatar_url from team where team.team_name like'%${name}%'`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            team_data:row
        })
    })
    return
})


router.get('/teamname',(req,res,next)=> {
    //获取ID
    const name = req.params.name // '1'
    const query = `select team_name from team;`
    connection.query(query,(err,row,fields)=>{
        if (err) throw (err);
        res.send({
            team_name_data:row
        })
    })
    return
})


module.exports = router;