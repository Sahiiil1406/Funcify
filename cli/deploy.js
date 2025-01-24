const axios=require('axios')
const deployFunction=async(id)=>{
    try {
        const res=await axios.post(URL,{

        })
        return res.json({
            msg:"Deployed Succesfully",
            "url":res.data.url
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    deployFunction
}