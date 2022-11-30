const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/123',(req,res,next)=>{
  console.log('user你好')
})

module.exports = router;
