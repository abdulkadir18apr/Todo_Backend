const express=require('express');
const fetchuser=require("../middleware/fetchuser")
const Todos=require("../models/todos");
const router=express.Router();

router.get('/fetchTodo',fetchuser,async(req,res)=>{
    let success=false;
    try{
        const todos=await Todos.find({user:req.user.id});
        res.json({success:true,todos});
    }
    catch(err){
        res.status(400).json({success,err:err})
    }

})

router.put('/addTodo',fetchuser,async(req,res)=>{
    const {id,task,date,tag}=req.body;
    try{
        const todo=new Todos({id,task,date,tag,user:req.user.id});
        const saveTodo=await todo.save();
        res.json({success:true,todo:saveTodo})

    }
    catch(err){
        console.log(err);
        res.status(400).json({success:false,err:err})
        
    }
})

router.delete("/deleteTodo/:id",fetchuser,async(req,res)=>{
    try{

        console.log(req.params.id,typeof(Number(req.params.id)))
        let task=await Todos.findOne({id:Number(req.params.id)});
        if(!task){
            res.status(404).json({success:false,msg:"no task found"})
        }
        if(task.user.toString()!==req.user.id){
            return res.status(401).json({success:false,msg:"Access denied"})
        }
        task=await Todos.findByIdAndDelete(task._id);
        res.json({success:true,todo:task})

    }
    catch(err){
        console.log(err)
        res.status(400).json({success:true,err:err})
    }

})


module.exports = router;