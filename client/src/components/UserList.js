import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from '../components/getData';

const Card = ({ name, id }) => {

    return (

        <Link to={`/${id}`} >
        <div>
            <h2>User Post History</h2>
            <h3>{name}</h3>
        </div>
    </Link>
    );
};

export default () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch().then(res => {
            console.log(res);
        setData(res.data);
        });
    }, []);

    return (
        <div>
            {data.map(user => {
                return <Card key={user.id} name={user.name} id={user.id} />;
            })}
        </div>
    );
};
