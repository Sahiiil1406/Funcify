const axios=require('axios')
const deployFunction=async(id,token)=>{
    try {
        const res=await axios.post(URL,{

        })
        return res.json({
            msg:"Deployed Succesfully"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    deployFunction
}