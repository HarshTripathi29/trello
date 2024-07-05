import React, { useState } from 'react';
import axios from 'axios';
import './CreateBoardModal.css';
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'


// Assuming you have four images in your assets folder
const imageOptions = [
    '/src/assets/image1.jpg',
    '/src/assets/image2.jpg',
    '/src/assets/image3.jpg',
    '/src/assets/image4.jpg',
];

const CreateBoardModal = ({ isOpen, onClose, onBoardCreated }) => {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newBoard = { title, cover };
            const res = await axios.post('http://localhost:5000/api/boards', newBoard);
            onBoardCreated(res.data);
            setTitle('');
            setCover('');
            onClose();
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    const handleImageSelect = (image) => {
        setCover(image);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="text-2xl font-semibold mb-4">Create New Board</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Board title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <div className="image-options">
                        {imageOptions.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Option ${index + 1}`}
                                className={`image-option ${cover === image ? 'selected' : ''}`}
                                onClick={() => handleImageSelect(image)}
                            />
                        ))}
                        
                    </div>
                    <button type="submit">Create Board</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBoardModal;
