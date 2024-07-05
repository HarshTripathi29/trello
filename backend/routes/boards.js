const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const mongoose = require('mongoose');

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
router.get('/:id', async (req, res) => {
    try {
        const boardId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(boardId)) {
            console.error('Invalid board ID:', boardId);
            return res.status(400).json({ message: 'Invalid board ID' });
        }
        const board = await Board.findById(boardId);
        if (!board) {
            console.error('Board not found with ID:', boardId);
            return res.status(404).json({ message: 'Board not found' });
        }
        res.json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

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