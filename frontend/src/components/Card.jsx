import React from 'react'


const Card = ({ card }) => {
    return (
        <div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
        </div>
    );
};

export default Card
