const axios=require('axios')
const authCli=async(username,password,token)=>{
    const res=await axios.post('http://localhost:3000/api/auth',{
        username,
        password,
        token
    })
    return res.data({
        token:res.data.token,
    })
}
module.exports={
    authCli
}