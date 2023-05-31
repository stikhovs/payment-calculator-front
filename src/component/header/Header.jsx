import React from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import './Header.css';


export default function Header({ 
    isCalcBtnDisabled, isExcelBtnDisabled, isPrintBtnDisabled, 
    doCalculation, downloadExcel, printResult, isCalculationInProgess, isExcelCreationInProgress
}) {

    return (
        <header className="sticky-sm-top shadow">
            <div className='d-flex flex-column flex-sm-row'>
                <div className='col-12 col-sm-3 title-container p-2 d-flex align-items-center'>
                    <h1>Помощник расчета квитанций</h1>
                </div>
                <div className='col buttons-container p-2 d-flex align-items-center'>
                    <Button id='btn-do-calculation'
                        onClick={doCalculation}
                        disabled={isCalcBtnDisabled}>
                        {isCalculationInProgess ? <><span>Идет обработка...</span><Spinner className='in-progress-spinner' animation="border" variant="light" size="sm" /></>
                        : <span>Обработать группы</span> }
                    </Button>
                    <Button id='btn-to-excel'
                        onClick={downloadExcel}
                        disabled={isExcelBtnDisabled}>
                        {isExcelCreationInProgress ? <>Формирование отчета...<Spinner className='in-progress-spinner' animation="border" variant="light" size="sm" /></>
                        : <span>Преобразовать в Excel</span>
                        }
                    </Button>
                    <Button id='btn-do-print' variant='outline-secondary'
                        onClick={printResult}
                        disabled={isPrintBtnDisabled}>
                        Распечатать
                    </Button>
                </div>
            </div>
        </header>
    );
}