import React, { useState, useEffect } from 'react';
import CreateBoardModal from './components/CreateBoardModal';
import Board from './components/Board';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const App = () => {
    const [boards, setBoards] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/boards');
                setBoards(res.data);
            } catch (error) {
                console.error('Error fetching boards:', error);
            }
        };

        fetchBoards();
    }, []);

    const handleBoardCreated = (newBoard) => {
        setBoards([...boards, newBoard]);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="app-container">
            <button onClick={openModal} className="add-board-button">
                Add Board
            </button>
            <CreateBoardModal isOpen={isModalOpen} onClose={closeModal} onBoardCreated={handleBoardCreated} />
            <div className="boards-container">
                {boards.map((board) => (
                    <div
                        key={board._id}
                        onClick={() => setSelectedBoardId(board._id)}
                        className="board-card"
                    >
                        {board.cover && <img src={board.cover} alt={board.title} className="board-cover" />}
                        <div className="board-title">{board.title}</div>
                    </div>
                ))}
            </div>
            {selectedBoardId && <Board boardId={selectedBoardId} />}
        </div>
    );
};

export default App;
