import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateBoardModal from './components/CreateBoardModal';
import Board from './components/Board';
import Footer from './components/Footer'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Header from './components/Header';

const App = () => {
    const [boards, setBoards] = useState([]);
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
        <Router>
            <div className="app-container">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                            <Header/>
                                <div className='board-button-heading'>
                                <h3>All Boards</h3>
                                <button onClick={openModal} className="add-board-button">Add Board</button>
                                </div>
                                <CreateBoardModal isOpen={isModalOpen} onClose={closeModal} onBoardCreated={handleBoardCreated} />
                                <div className="boards-container">
                                    {boards.map((board) => (
                                        <Link to={`/board/${board._id}`} key={board._id} className="board-card">
                                            {board.cover && <img src={board.cover} alt={board.title} className="board-cover" />}
                                            <div className="board-title">{board.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        } 
                    />
                    <Route path="/board/:boardId" element={<Board />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />



                </Routes>
            </div>
            <Footer/>
        </Router>
    );
};

export default App;
