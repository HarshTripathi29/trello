const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// get all the boards
router.get('/', async function(req,res){
    // put the db calls in try catch and also they are async functions
    try{
        const boards = await Board.find();
        res.json(boards);
    }catch(error){
        res.status(500).json({message : error.message})
    }
});

// get one board
// to get a board give the id of the board
router.get('/:id', async function(res,res){
    try{
        const board = await Board.findById(req.params.id);
        if(!board) return res.status(404).json({message : 'board not found'})
    }catch(error){
        return res.status(500).json({message : error.message})
    }
})

// create a new board
router.post('/', async function(req, res){
    const {title} = req.body;
    const board = new Board({title, lists:[]})
    try{
        const newBoard = await board.save();
        res.status(201).json(newBoard);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

// update a board
router.put('/:id', async function(req, res){
    try{
        const updatedBoard = await Board.findByIdAndUpdate(re.params.id, req.body, {new : true});
        res.json(updatedBoard);
    }catch(err){
        res.status(400).json({message : err.message});
    }
})

// delete a board
router.delete('/:id', async function(req, res){
    try{
        await Board.findByIdAndDelete(req.params.id);
        res.json({message : 'board deleted'});
    }catch(err){
        res.status(500).json({message : err.message});
    }
});

module.exports=router