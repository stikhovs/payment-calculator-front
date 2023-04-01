import React from "react";
import Table from 'react-bootstrap/Table';

import './PreCalcGroupDetails.css';


export default function PreCalcGroupDetails({ group }) {
    return (
        <div id="pre-calculation-group-details-section" className='col'>
            <h2 className="pre-calculation-group-title">{group.groupName + (group.groupId !== '' ? " (" + group.groupId + ")" : '')}</h2>
            <p className="pre-calculation-group-detail pre-calculation-group-price">Цена за 1 а/ч: {group.pricePerHour} руб.</p>
            <p className="pre-calculation-group-detail pre-calculation-group-schedule">Расписание: {group.classDaysOne
                .concat(group.classDaysTwo)
                .map(weekday => weekToStr(weekday))
                .join(" ")}</p>
            <p className="pre-calculation-group-detail pre-calculation-group-duration">
                Длительность: {group.classDurationOne.toFixed(2)} а/ч
                {group.classDurationTwo !== undefined && group.classDurationTwo !== 0 && group.classDurationTwo.toFixed(2) !== group.classDurationOne.toFixed(2) ?
                    `, ${group.classDurationTwo.toFixed(2)} а/ч`
                    : ''
                }
            </p>
            <p className="pre-calculation-group-detail pre-calculation-group-teachers">
                {[group.teacherOne, group.teacherTwo].filter(teacher => teacher !== undefined).join(", ")}
                {group.groupLevel !== undefined ? `, ${group.groupLevel}` : ''}
            </p>
            <Table bordered hover className="pre-calculation-group-students">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Студент</th>
                        <th>Скидка</th>
                        <th>Остаток (а/ч)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        group.students.map((student, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.name} {student.indGraphic ? <strong>(инд график)</strong> : ''}</td>
                                <td>
                                    {[student.singleDiscount, student.permanentDiscount]
                                        .filter(discount => discount !== undefined)
                                        ?.map(discount => `${(discount * 100.0).toFixed(0)}%`)}
                                </td>
                                <td>{student.balance.toFixed(2)}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

function weekToStr(weekday) {
    switch (weekday) {
        case "MONDAY":
            return "пн";
        case "TUESDAY":
            return "вт";
        case "WEDNESDAY":
            return "ср";
        case "THURSDAY":
            return "чт";
        case "FRIDAY":
            return "птн";
        case "SATURDAY":
            return "сб";
        case "SUNDAY":
            return "вскр";
        default:
            return "";
    }
}