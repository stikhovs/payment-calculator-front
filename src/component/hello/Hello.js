import React, { useState, useEffect } from 'react';

export default function Hello() {

    const myHello = "hello";

    const url = 'http://localhost:8080/react-test';
    //const url = 'https://jsonplaceholder.typicode.com/users/1';
    const [name, setName] = useState([]);
    const [time, setTime] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(user => {
                setName(user.name);
                setTime(user.time);
                console.log("Here: " + name + ", " + time);
            })
    }, []);

    return (
        <div id="hello">
            <p>
                {myHello}
            </p>
            <p>
                {name} {time}
            </p>
        </div>
    );
}