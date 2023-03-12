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



  return (
    <div className="container-fluid">
      <div className="App row">
        <div className='col-12 text-center'>
          <h1>Помощник расчета квитанций</h1>
        </div>
        <div className='col-6'>
          <FileChooser onUploadDone={(res) => setFileName(res)} />
          <div className='col-12'>
            <MonthChoose onMonthChosen={(res) => setDateToCalc(res)} />
            <DayOff daysOff={daysOff} onDaysOffChosen={(res) => setDaysOff(res)} />
            <DayChange daysChange={daysChange}
              onDaysChangeChosen={(res) => setDaysChange(current => [...current, { from: res[0], to: res[1] }])}
              onDayRemove={(index) => setDaysChange(daysChange.filter((el, idx) => idx !== index))} />
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
          <Button as='a' variant='success'>Hello</Button>
        </div>
      </div>
    </div>
  );

}
