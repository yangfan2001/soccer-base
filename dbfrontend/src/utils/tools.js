export const getLeagueChineseName = (EngName)=>{
    const BlockArr = [
        {val:'News',name:'新闻'},
        {val:'SoccerBlock',name:'足球话题专区'},
        {val:'EuropeSoccerBlock',name:'欧洲足球专区'},
        {val:'UkSoccerBlock',name:'英超专区'},
        {val:'SpainSoccerBlock',name:'西甲专区'},
        {val:'GermainSoccerBlock',name:'德甲专区'},
        {val:'ItalySoccerBlock',name:'意甲专区'},
        {val:'FranceSoccerBlock',name:'法甲专区'}
    ]
    let res = false;
    BlockArr.forEach((item)=>{
        if(item.val === EngName)
            res = item.name
    })
    return res
}

export const getLeagueEnglishName = (ChineseName)=>{
    const BlockArr = [
        {val:'News',name:'新闻'},
        {val:'SoccerBlock',name:'足球话题专区'},
        {val:'EuropeSoccerBlock',name:'欧洲足球专区'},
        {val:'UkSoccerBlock',name:'英超专区'},
        {val:'SpainSoccerBlock',name:'西甲专区'},
        {val:'GermainSoccerBlock',name:'德甲专区'},
        {val:'ItalySoccerBlock',name:'意甲专区'},
        {val:'FranceSoccerBlock',name:'法甲专区'}
    ]
    let res = false;
    BlockArr.forEach((item)=>{
        if(item.name === ChineseName)
            res = item.val
    })
    return res
}

export const getRandomUrl = ()=>{
    const randomUrlArr = [
        'https://uploadfile.bizhizu.cn/up/22/b2/56/22b256090a9e29ad9645008c462b952b.jpg',
        'https://uploadfile.bizhizu.cn/up/a6/dc/bd/a6dcbd37fcdfcac9aa7828b3c880ff5a.jpg',
        'https://scpic.chinaz.net/files/pic/pic9/201811/bpic9075.jpg'
    ]
    return randomUrlArr[Math.round(Math.random()*3)]
}