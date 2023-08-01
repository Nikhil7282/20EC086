var express = require('express');
var jwt=require('jsonwebtoken')
var router = express.Router();

const companyData={
	"companyName":"Express",
	"clientId":"f89af827-bf3e-40ec-a2a8-0422ee18a4da",
	"ownerName":"Nikhil",
	"ownerEmail":"nikhil.sa2020ece@sece.ac.in",
	"rollNo":"20EC086",
	"clientSecret": "hEYUfJcFGiZflYWi"
}

async function fetchData(accessToken){
  const response=await fetch('http://20.244.56.144/train/trains',{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${accessToken}`,
      'content-Type':'application/json'
    },
    // timeout:20000
  })
    // res.send(response)
  const data=await response.json()
  console.log(data)
  return data;
}

async function refreshToken(){
  const newToken=await fetch('http://20.244.56.144/train/auth',{
    method:'POST',
    body:JSON.stringify(companyData),
    // timeout:20000
  })
  const token=await newToken.json()
  console.log(token.access_token)
  return token.access_token;
}

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send('index route');
// });

router.get('/allTrain',async(req,res,next)=>{
  const accessToken=req.body.token
  if(!accessToken){
    const newToken=await refreshToken()
    const result=await fetchData(newToken)
    return res.status(200).json({data:result,token:accessToken})
  }
  else{
    const exp=jwt.decode(accessToken)
    console.log(exp);
  }

  try {
    if(Math.floor((+new Date())/1000)<exp.exp){
      console.log("Not Expired");
      const result=await fetchData(accessToken)
      return res.status(200).json({data:result,token:accessToken})
    }
    else{
      console.log("Expired");
      const newToken=await refreshToken()
      const result=await fetchData(newToken)
      return res.status(200).json({data:result,token:accessToken})
    }
  } catch (error) {
    return res.status(500).json({data:error,message:"Internal Error"})
  }
  
})

module.exports = router;
