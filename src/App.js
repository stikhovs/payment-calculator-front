import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import FileChooser from './component/file-chooser/FileChooser';
import DayChange from './component/day-change/DayChange';
import MonthChoose from './component/month-choose/MonthChoose';
import DayOff from './component/day-off/DayOff';
import Sse from './component/sse/Sse';
import XLSX from "xlsx";
import GroupContainer from './component/group-container/GroupContainer';
import Accordion from 'react-bootstrap/Accordion';

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
  const [isCalcBtnDisabled, setIsCalcBtnDisabled] = useState(true);

  /* useEffect(() => {
    if (fileName !== '') {
      console.log("fileName: " + fileName);
    }
  }, [fileName]); */

  useEffect(() => {
    if (dateToCalc !== undefined && dateToCalc.date !== undefined && groups.length > 0) {
      console.log(dateToCalc.date);
      setIsCalcBtnDisabled(false);
    } else {
      setIsCalcBtnDisabled(true);
    }
  }, [dateToCalc, groups, isCalcBtnDisabled]);

  useEffect(() => {
    if (daysOff.lenth > 0) {
      console.log(daysOff);
    }
  }, [daysOff]);

  useEffect(() => {
    if (daysChange.length > 0) {
      console.log(daysChange);
    }
  }, [daysChange]);


  function doCalculation() {
    setResultGroups([]);

    fetch(`http://localhost:8080/process-groups`, {
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
    })
      .then(res => res.json())
      .then(res => {
        console.log("Result");
        console.log(res);
        setResultGroups(res);
      });
  }

  function downloadExcel() {
    console.log(resultGroups);
    fetch(`http://localhost:8080/download-excel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        month: dateToCalc.date.toLocaleString('ru-RU', { month: 'long' }),
        monWedFr: resultGroups.monWedFr,
        tueThr: resultGroups.tueThr,
        sat: resultGroups.sat,
        individuals: resultGroups.individuals,
        others: resultGroups.others
      })
    })
      .then(res => {
        if (res.ok) {
          return res.blob();
        } 
        throw new Error('Something went wrong');
      })
      .then((blob) => {

        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.setAttribute('download', `Расчет квитанций - ${formatDateForExcel(dateToCalc.date)}.xlsx`);
        link.href = url;
        link.click();
      })
      .catch((error) => {
        console.log(error)
      });
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
                    <Accordion key={groupIndex}>
                      <Accordion.Item eventKey={groupIndex} className='group-to-process'>
                        <Accordion.Header>{group.groupName}</Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {group.students.map((student, studentIndex) =>
                              <li key={studentIndex} className='student-to-process'>
                                <span>{student.name}</span>
                              </li>
                            )}
                          </ul></Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className='col-6'>

          <Button variant='primary' onClick={doCalculation} disabled={isCalcBtnDisabled}>Обработать группы</Button>

          <Button as='a' variant='success' onClick={downloadExcel}>Скачать Excel</Button>

          <GroupContainer groupsArr={resultGroups.monWedFr} title="пн ср птн" />
          <GroupContainer groupsArr={resultGroups.tueThr} title="вт чт" />
          <GroupContainer groupsArr={resultGroups.sat} title="сб" />
          <GroupContainer groupsArr={resultGroups.individuals} title="индивидуалы" />
          <GroupContainer groupsArr={resultGroups.others} title="другое" />
        </div>
      </div>
    </div >
  );

}

function formatDate(date) {

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function formatDateForExcel(date) {

  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();

  return `${month} ${year}`;
}
