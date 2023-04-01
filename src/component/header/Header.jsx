import React from 'react';
import { Button } from 'react-bootstrap';

import './Header.css';


export default function Header({ 
    isCalcBtnDisabled, isExcelBtnDisabled, isPrintBtnDisabled, 
    doCalculation, downloadExcel, printResult
}) {
    return (
        <header className="sticky-top shadow">
            <div className='d-flex'>
                <div className='col-3 title-container p-2 d-flex align-items-center'>
                    <h1>Помощник расчета квитанций</h1>
                </div>
                <div className='col buttons-container p-2 d-flex align-items-center'>
                    <Button id='btn-do-calculation'
                        onClick={doCalculation}
                        disabled={isCalcBtnDisabled}>
                        Обработать группы
                    </Button>
                    <Button id='btn-to-excel'
                        onClick={downloadExcel}
                        disabled={isExcelBtnDisabled}>
                        Преобразовать в Excel
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