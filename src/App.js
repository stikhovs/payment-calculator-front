import React, { useState, useEffect } from 'react';
import Header from './component/header/Header';
import DataInputSection from './component/data-input-section/DataInputSection';
import CalculationSection from './component/calculation-section/CalculationSection';
import CalculationParametersList from "./component/calculation-parameters-list/CalculationParametersList";
import ResultToPrint from "./component/result-to-print/ResultToPrint";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [fileName, setFileName] = useState('');
  const [dateToCalc, setDateToCalc] = useState(null);
  const [daysOff, setDaysOff] = useState([]);
  const [daysChange, setDaysChange] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultGroups, setResultGroups] = useState(null);
  const [isCalcBtnDisabled, setIsCalcBtnDisabled] = useState(true);
  const [isExcelBtnDisabled, setIsExcelBtnDisabled] = useState(true);
  const [isPrintBtnDisabled, setIsPrintBtnDisabled] = useState(true);

  const [isCalculationInProgess, setIsCalculationInProgess] = useState(false);
  const [isExcelCreationInProgress, setIsExcelCreationInProgress] = useState(false);

  const calcParams =
    <CalculationParametersList
      chosenFileName={fileName}
      chosenMonth={formatDateForExcel(dateToCalc?.date)}
      chosenDaysOff={daysOff}
      chosenDaysChange={daysChange}
      onChangeDayRemove={(index) => setDaysChange(daysChange.filter((el, idx) => idx !== index))}
    />

  useEffect(() => {
    if (fileName !== '') {
      console.log("fileName: " + fileName);
    }
  }, [fileName]);

  useEffect(() => {
    if (dateToCalc !== null && dateToCalc.date !== undefined && groups.length > 0 && isExcelCreationInProgress === false) {
      setIsCalcBtnDisabled(false);
    } else {
      setIsCalcBtnDisabled(true);
    }
  }, [dateToCalc, groups, isCalcBtnDisabled, isExcelCreationInProgress]);

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
    setIsCalcBtnDisabled(true);
    setIsExcelBtnDisabled(true);
    setIsPrintBtnDisabled(true);
    setIsCalculationInProgess(true);
    console.log(JSON.stringify({
      dateToCalc: formatDate(dateToCalc.date),
      daysOff: daysOff,
      daysChange: daysChange,
      groups: groups
    }));
    fetch(`${BACKEND_URL}/calculate`, {
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
      })
      .then(() => {
        setIsCalcBtnDisabled(false);
        setIsExcelBtnDisabled(false);
        setIsPrintBtnDisabled(false);
        setIsCalculationInProgess(false);
      });
  }

  function downloadExcel() {
    setIsCalcBtnDisabled(true);
    setIsExcelBtnDisabled(true);
    setIsExcelCreationInProgress(true);
    fetch(`${BACKEND_URL}/download-excel`, {
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
      .then(() => {
        setIsCalcBtnDisabled(false);
        setIsExcelBtnDisabled(false);
        setIsExcelCreationInProgress(false);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function printResult() {
    console.log("Print result");
    window.print();
  }

  return (
    <>
      <Header
        isCalcBtnDisabled={isCalcBtnDisabled}
        isExcelBtnDisabled={isExcelBtnDisabled}
        isPrintBtnDisabled={isPrintBtnDisabled}
        isCalculationInProgess={isCalculationInProgess}
        isExcelCreationInProgress={isExcelCreationInProgress}
        doCalculation={doCalculation}
        downloadExcel={downloadExcel}
        printResult={printResult}
      />
      <div className="container-fluid">
        <div className='row'>
          <DataInputSection
            onGroupsParsed={(res) => setGroups(res)}
            onFileChoose={(chosenFileName) => setFileName(chosenFileName)}
            onMonthChosen={(res) => setDateToCalc(res)}
            chosenDate={dateToCalc !== null ? dateToCalc.date : new Date()}
            daysOff={daysOff}
            onDaysOffChosen={(res) => setDaysOff(res)}
            daysChange={daysChange}
            onDaysChangeChosen={(res) => setDaysChange(current => [...current, { from: res[0], to: res[1] }])}
          />
          <CalculationSection
            groupsToCalc={groups}
            resultGroups={resultGroups}
            calcParams={calcParams}
          />
        </div>
      </div >
      {isPrintBtnDisabled === false ? <ResultToPrint groupsResult={resultGroups} month={formatDateForExcel(dateToCalc.date)} /> : ''}
    </>
  );

}

function formatDate(date) {

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

function formatDateForExcel(date) {
  if (date !== undefined) {
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();

    return `${month} ${year}`;
  }
}
