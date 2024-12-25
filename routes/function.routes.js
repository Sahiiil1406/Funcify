const {createFunction,
    getAllFunctions,
    getFunction,
    updateFunction,
    deleteFunction,
    getMyFunctions}=require('../controllers/function')


const express=require('express')
const router=express.Router()
const auth=require('../middleware/auth')

router.post('/',auth,createFunction)
router.get('/my',auth,getMyFunctions)
router.get('/',getAllFunctions)
router.get('/:id',getFunction)
router.put('/:id',updateFunction)
router.delete('/:id',deleteFunction)



module.exports=router