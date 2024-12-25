const Function = require('../models/function')

const createFunction = async (req, res) => {
    try {
        const {name,uuid,environment}=req.body;
        //console.log(req.body,req.user._id)
        const newFunction =await Function.create({
            name,
            uuid,
            environment,
            userId:req.user._id
        })
        res.status(201).json(newFunction)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllFunctions = async (req, res) => {
    try {
        const functions = await Function.find()
        res.status(200).json(functions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getFunction = async (req, res) => {
    try {
        const { id } = req.params
        const func = await Function.findById(id)
        if (!func) {
            return res.status(404).json({ message: 'Function not found' })
        }
        res.status(200).json(func)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateFunction = async (req, res) => {
    try {
        const { id } = req.params
        const func = await Function.findByIdAndUpdate(id, req.body)
        if (!func) {
            return res.status(404).json({ message: 'Function not found' })
        }
        res.status(200).json({ message: 'Function updated successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteFunction = async (req, res) => {
    try {
        const { id } = req.params
        const func = await Function.findByIdAndDelete(id)
        if (!func) {
            return res.status(404).json({ message: 'Function not found' })
        }
        res.status(200).json({ message: 'Function deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getMyFunctions = async (req, res) => {
    try {
        const functions = await Function.find({ userId: req.user._id })
        res.status(200).json(functions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = {
    createFunction,
    getAllFunctions,
    getFunction,
    updateFunction,
    deleteFunction,
    getMyFunctions
}