import React from 'react'
import Card from './Card';

const List = ({ list }) => {
    return (
        <div>
            <h2>{list.title}</h2>
            <div>
                {list.cards.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export default List
