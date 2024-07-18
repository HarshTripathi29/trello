import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateBoardModal from './components/CreateBoardModal';
import Board from './components/Board';
import Footer from './components/Footer';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { checkLogin } from './features/auth/authSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const App = () => {
    const [boards, setBoards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogin());
    }, [dispatch]);

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

    const handleDeleteBoard = async (boardId) => {
        try {
            await axios.delete(`http://localhost:5000/api/boards/${boardId}`);
            setBoards(boards.filter(board => board._id !== boardId));
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route 
                        path="/dashboard" 
                        element={
                            <>
                                <Header />
                                <div className='board-button-heading'>
                                    <h3>All Boards</h3>
                                    <button onClick={openModal} className="add-board-button">Add Board</button>
                                </div>
                                <CreateBoardModal isOpen={isModalOpen} onClose={closeModal} onBoardCreated={handleBoardCreated} />
                                <div className="boards-container">
                                    {boards.map((board) => (
                                        <div key={board._id} className="board-card">
                                            {board.cover && <img src={board.cover} alt={board.title} className="board-cover" />}
                                            <div className='title-icon'>
                                                <div className="board-title">{board.title}</div>
                                                <DeleteIcon onClick={() => handleDeleteBoard(board._id)} className="delete-board-icon" />
                                            </div>
                                            <Button
                                                component={Link}
                                                to={`/board/${board._id}`}
                                                
                                                startIcon={<ArrowForwardIcon />}
                                                className="view-board-button"
                                                
                                            >
                                                View Board
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        } 
                    />
                    <Route path="/board/:boardId" element={<Board onDeleteBoard={handleDeleteBoard} />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
