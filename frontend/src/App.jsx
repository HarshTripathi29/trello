import { useState, useEffect } from 'react'
import './App.css'
import CreateBoard from './components/CreateBoard'
import Board from './components/Board'
import axios from 'axios'

function App() {

  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  useEffect(() => {
      const fetchBoards = async () => {
          const res = await axios.get('http://localhost:5000/api/boards');
          setBoards(res.data);
      };

      fetchBoards();
  }, []);

  const handleBoardCreated = (newBoard) => {
      setBoards([...boards, newBoard]);
  };

  return (
    <div>
        <CreateBoard onBoardCreated={handleBoardCreated} />
        <div>
            {boards.map((board) => (
                <div key={board._id} onClick={() => setSelectedBoardId(board._id)}>
                    {board.title}
                </div>
            ))}
        </div>
        {selectedBoardId && <Board boardId={selectedBoardId} />}
    </div>
);
};

export default App
