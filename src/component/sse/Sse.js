import React, { useState, useEffect } from 'react';

export default function Sse() {
    const [fluxArr, setFluxArr] = useState([]);

    useEffect(() => {
        const sse = new EventSource('http://localhost:8080/my-sse');
        /* sse.addEventListener('periodic-event', (event) => {
          console.log(event);
        }); */
        sse.onopen = (event) => {
            console.log("Open" + event);
        };
        sse.onmessage = (e) => {
            console.log(e);
            console.log(e.data);
            setFluxArr(current => [...current, e]);
        };
        sse.onerror = (event) => {
            console.log("SSE error");
            console.log(event);
            sse.close();
        }
        return () => {
            sse.close();
        };
    }, []);


    return (
        <div id="sse-container">
            <ul>
                {fluxArr.map((fl) => <li key={fl.lastEventId}>{fl.data}</li>)}
            </ul>
        </div>
    );
}