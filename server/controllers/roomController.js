const asyncHandler = require('express-async-handler')
const zoomModel = require('../models/roomModel')
const userModel = require('../models/userModel')



const createZoom = asyncHandler(async(req, res) => {
    const {name} = req.body
    const userId = req.params.id
    const checkUser = await userModel.findById(userId).populate('rooms')
    let checkZoom
    for (let i = 0; i < checkUser.rooms.length; i++){
        if (checkUser.rooms[i] === name){
            checkZoom = true
            break
        }else{
            checkZoom = false
        }
        
    }
    if (checkZoom) {
        res.status(401)
        throw new Error('This zoom has already existed!')
    }

    const newZoom = await zoomModel.create({name})
    if (newZoom){
        checkUser.rooms.push(newZoom._id)
        await checkUser.save()
        res.status(200).json(newZoom)
    }else {
        res.status(400)
        throw new Error('Invalid data of zoom!')
    }
})

const getPin = asyncHandler(async(req,res) => {
    const zoomId = req.params.id
    const checkZoom = await zoomModel.findOne({_id: zoomId})
    if(!checkZoom){
        res.status(401)
        throw new Error('This zoom not found!')
    }

    checkZoom.pin = Math.random().toString(36).substring(2, 8)
    await res.status(200).json(checkZoom)

})



module.exports={
    createZoom,
    getPin
}
