import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './CardModal.css';

const colors = ['#f28b82', '#fbbc04', '#34a853', '#4285f4'];

const CardModal = ({ isOpen, onClose, onCreateOrUpdateCard, existingCard }) => {
    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [labels, setLabels] = useState([]);
    const [labelText, setLabelText] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    useEffect(() => {
        if (existingCard) {
            setCardTitle(existingCard.title);
            setCardDescription(existingCard.description);
            setLabels(existingCard.labels || []);
        }
    }, [existingCard]);

    if (!isOpen) return null;

    const handleAddLabel = () => {
        setLabels([...labels, { text: labelText, color: selectedColor }]);
        setLabelText('');
    };

    const handleRemoveLabel = (index) => {
        setLabels(labels.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateOrUpdateCard(cardTitle, cardDescription, labels);
        setCardTitle('');
        setCardDescription('');
        setLabels([]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{existingCard ? 'Edit Card' : 'Create New Card'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Card title"
                        value={cardTitle}
                        onChange={(e) => setCardTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Card description"
                        value={cardDescription}
                        onChange={(e) => setCardDescription(e.target.value)}
                        required
                    />
                    <div className="labels-section">
                        <div className="label-input">
                            <input
                                type="text"
                                placeholder="Label text"
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                            />
                            <div className='select-container'>
                            <select
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                style={{ backgroundColor: selectedColor }}
                            >
                                {colors.map((color, index) => (
                                    <option
                                        key={index}
                                        value={color}
                                        style={{ backgroundColor: color, color: 'white' }}
                                    >
                                        {color}
                                    </option>
                                ))}
                            </select>
                            
                            <button type="button" className='select-button' onClick={handleAddLabel}>Add Label</button>
                            </div>
                        </div>
                        <div className="labels-list">
                            {labels.map((label, index) => (
                                <div
                                    key={index}
                                    className="label"
                                    style={{ backgroundColor: label.color }}
                                >
                                    {label.text}
                                    <CloseIcon
                                        className="remove-button"
                                        onClick={() => handleRemoveLabel(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">{existingCard ? 'Update Card' : 'Create Card'}</button>
                </form>
            </div>
        </div>
    );
};

export default CardModal;
