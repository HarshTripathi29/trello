import React, { useEffect } from 'react'
import List from './List'

const Board = () => {

    const[board, setBoard]= useState('')

    useEffect(()=>{
        fetchBoard()
    },[]);

    if (!board) return <div>Loading...</div>;

    const fetchBoard =()=>{
        const res = axios.get(`http://localhost:5000/api/boards/${boardId}`);
        setBoard(res.data);
    }
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
