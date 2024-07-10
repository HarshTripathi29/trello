import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Board.css';
import CardModal from './CardModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';

const Board = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [listTitle, setListTitle] = useState('');
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedListId, setSelectedListId] = useState(null);
    const [editListId, setEditListId] = useState(null);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
                setBoard(res.data);
            } catch (error) {
                console.error('Error fetching board:', error);
            }
        };

        fetchBoard();
    }, [boardId]);

    const handleCreateList = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/lists/${boardId}/lists`, { title: listTitle });
            setBoard(res.data);
            setListTitle('');
            setIsListModalOpen(false);
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const handleEditList = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/lists/${boardId}/lists/${editListId}`, { title: listTitle });
            setBoard(res.data);
            setListTitle('');
            setEditListId(null);
            setIsListModalOpen(false);
        } catch (error) {
            console.error('Error editing list:', error);
        }
    };

    const handleDeleteList = async (listId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/lists/${boardId}/lists/${listId}`);
            setBoard(res.data);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const handleCreateOrUpdateCard = async (title, description, labels) => {
        try {
            const res = selectedCard
                ? await axios.put(`http://localhost:5000/api/lists/${boardId}/lists/${selectedListId}/cards/${selectedCard._id}`, { title, description, labels })
                : await axios.post(`http://localhost:5000/api/lists/${boardId}/lists/${selectedListId}/cards`, { title, description, labels });
            setBoard(res.data);
            setIsCardModalOpen(false);
            setSelectedCard(null);
            setSelectedListId(null);
        } catch (error) {
            console.error('Error creating or updating card:', error);
        }
    };

    const handleDeleteCard = async (listId, cardId) => {
        try {
            await axios.delete(`http://localhost:5000/api/lists/${boardId}/lists/${listId}/cards/${cardId}`);
            const res = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
            setBoard(res.data);
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleOpenCardModal = (listId, card) => {
        setSelectedListId(listId);
        setSelectedCard(card);
        setIsCardModalOpen(true);
    };

    if (!board) return <div>Loading...</div>;

    return (
        <div>
            <Header />
    
            <div className="board-container" style={{ backgroundImage: `url(${board.cover})` }}>
                <div>
                    <button onClick={() => setIsListModalOpen(true)} className="create-list-button">Create List</button>
                </div>
                <div className="board-lists-container">
                    {board.lists.map((list) => (
                        <div key={list._id} className="list-card">
                            <div className="list-header">
                                <h3>{list.title}</h3>
                                <div>
                                    <button className='icon-button' onClick={() => {
                                        setEditListId(list._id);
                                        setListTitle(list.title);
                                        setIsListModalOpen(true);
                                    }}><EditIcon /></button>
                                    <button className='icon-button' onClick={() => handleDeleteList(list._id)}><DeleteIcon /></button>
                                </div>
                            </div>
                            {list.cards.map((card) => (
                                <div key={card._id} className="card" onClick={() => handleOpenCardModal(list._id, card)}>
                                    
                                    <div className='card-title'>
                                    <p>{card.title}</p>
                                    <button className='icon-button' onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCard(list._id, card._id);
                                    }}><DeleteIcon /></button>
                                    </div>

                                    <div className="card-labels">
                                        {card.labels.map((label, index) => (
                                            <span key={index} className="card-label" style={{ backgroundColor: label.color }}>
                                                {label.text}
                                            </span>
                                        ))}
                                    </div>
                                    
                                </div>
                            ))}
                            <button className="add-card-button" onClick={() => handleOpenCardModal(list._id, null)}>Add Card</button>
                        </div>
                    ))}
                    {isListModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={() => setIsListModalOpen(false)}>×</button>
                                <h2>{editListId ? 'Edit List' : 'Create New List'}</h2>
                                <form onSubmit={editListId ? handleEditList : handleCreateList}>
                                    <input
                                        type="text"
                                        placeholder="List title"
                                        value={listTitle}
                                        onChange={(e) => setListTitle(e.target.value)}
                                        required
                                    />
                                    <button type="submit">{editListId ? 'Update List' : 'Create List'}</button>
                                </form>
                            </div>
                        </div>
                    )}
                    {isCardModalOpen && (
                        <CardModal
                            isOpen={isCardModalOpen}
                            onClose={() => setIsCardModalOpen(false)}
                            onCreateOrUpdateCard={handleCreateOrUpdateCard}
                            existingCard={selectedCard}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
