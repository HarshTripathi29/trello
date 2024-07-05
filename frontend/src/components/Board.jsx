import React, { useEffect, useState } from 'react'
import List from './List'
import axios from 'axios'

const Board = ({boardId}) => {

    const[board, setBoard]= useState(null)

    useEffect(()=>{
      const fetchBoard =()=>{
        const res = axios.get(`http://localhost:5000/api/boards/${boardId}`);
        setBoard(res.data);
    }
        fetchBoard()
    },[boardId]);

    if (!board) return <div>Loading...</div>;
    
  return (
    <div>
      <h1>{board.title}</h1>
      <div>
        {
            board.lists.map((list, index)=>(
                <List key={index} list={list}/>
            ))
        }
      </div>
    </div>
  )
}

export default Board
