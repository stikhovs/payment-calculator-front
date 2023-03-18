import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import FileChooser from './component/file-chooser/FileChooser';
import DayChange from './component/day-change/DayChange';
import MonthChoose from './component/month-choose/MonthChoose';
import DayOff from './component/day-off/DayOff';
import Sse from './component/sse/Sse';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {

  const [fileName, setFileName] = useState('');
  const [dateToCalc, setDateToCalc] = useState();
  const [daysOff, setDaysOff] = useState([]);
  const [daysChange, setDaysChange] = useState([]);
  const [fluxArr, setFluxArr] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultGroups, setResultGroups] = useState([]);

  useEffect(() => {
    console.log("fileName: " + fileName);
  }, [fileName]);

  useEffect(() => {
    if (dateToCalc !== undefined) {
      console.log(dateToCalc.date);
    }
  }, [dateToCalc]);

  useEffect(() => {
    console.log(daysOff);
  }, [daysOff]);

  useEffect(() => {
    console.log(daysChange);
  }, [daysChange]);


 function doCalculation() {
    /* setLoading(true);
  
    const response = await fetch(`http://localhost:8080/process-groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dateToCalc: formatDate(dateToCalc.date),
        daysOff: daysOff,
        daysChange: daysChange,
        groups: groups
      })
    });
    const data = await response.json();
    setResultGroups(data); 
    setLoading(false); */
    setResultGroups([]);
    const socket = new WebSocket("ws://localhost:8080/process-groups-ws");
    socket.onopen= (event) => {
      console.log("Websocket is opened");
      console.log(event);
      socket.send(
        JSON.stringify({
          dateToCalc: formatDate(dateToCalc.date),
          daysOff: daysOff,
          daysChange: daysChange,
          groups: groups
        })
      );
    };
    socket.onmessage = (event) => {
      console.log(event.data);
      setResultGroups(current => [...current, event.data]);
    };
    socket.onerror = (error) => {
      console.log("Error");
      console.log(error);
    }
    socket.onclose = (event) => {
      console.log("Closing");
      console.log(event);
    }

      
    /* if (socket.bufferedAmount <= 0) {
      socket.close();
    } */
    /* socket.addEventListener('message', async (event) => {
      const profile = JSON.parse(event.data);
      this.state.profiles.push(profile);
      this.setState({ profiles: this.state.profiles });
    }); */
  }

  return (
    <div className="container-fluid">
      <div className="App row">
        <div className='col-12 text-center'>
          <h1>Помощник расчета квитанций</h1>
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-6'>
              <FileChooser onGroupsParsed={(res) => setGroups(res)} onUploadDone={(res) => setFileName(res)} />
              <MonthChoose onMonthChosen={(res) => setDateToCalc(res)} />
              <DayOff daysOff={daysOff} onDaysOffChosen={(res) => setDaysOff(res)} />
              <DayChange daysChange={daysChange}
                onDaysChangeChosen={(res) => setDaysChange(current => [...current, { from: res[0], to: res[1] }])}
                onDayRemove={(index) => setDaysChange(daysChange.filter((el, idx) => idx !== index))} />
            </div>
            <div className='col-6'>
              <div id='groups-to-process-container'>
                {
                  groups.map((group, groupIndex) =>
                    <div key={groupIndex} className='group-to-process'>
                      <p><strong>{group.groupName}</strong></p>
                      <ul>
                        {group.students.map((student, studentIndex) =>
                          <li key={studentIndex} className='student-to-process'>
                            <span>{student.name}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className='col-12'>


            <Button variant='success' onClick={() => {
              const sse = new EventSource('http://localhost:8080/calculate');
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
            }}>Начать обработку</Button>

          </div>
        </div>
        <div className='col-6'>

          <Button variant='primary' onClick={doCalculation}>Обработать группы</Button>

          <Button as='a' variant='success'>Hello</Button>

          <ul>
            {resultGroups.map((res, index) => 
              <li key={index}>
              <span>{res}</span>
            </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

}

function formatDate(date) {

  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
