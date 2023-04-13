import React from "react";
import Table from 'react-bootstrap/Table';

import './ResultToPrint.css';


export default function ResultToPrint({ groupsResult, month }) {

    function drawNewPage(schedule, groups) {
        return (
            <div className="new-page">
                <h2 className="schedule-title text-center">{schedule} {month}</h2>
                {groups.map((group, index) =>
                    <div key={index}>
                        <p className="result-to-print print-group-title">{group.groupName + (group.groupId !== '' ? " (" + group.groupId + ")" : '')}</p>
                        <p className="result-to-print print-group-price">Цена за 1 а/ч: {group.pricePerHour} руб.</p>
                        <p className="result-to-print print-group-schedule">Расписание: {group.classDaysOne
                            .concat(group.classDaysTwo)
                            .map(weekday => weekToStr(weekday))
                            .join(" ")}</p>
                        <p className="result-to-print print-group-duration">
                            Длительность: {group.classDurationOne.toFixed(2)} а/ч
                            {group.classDurationTwo !== undefined && group.classDurationTwo !== 0 && group.classDurationTwo.toFixed(2) !== group.classDurationOne.toFixed(2) ?
                                `, ${group.classDurationTwo.toFixed(2)} а/ч`
                                : ''
                            }
                        </p>
                        <p className="result-to-print print-group-teachers">
                            {[group.teacherOne, group.teacherTwo].filter(teacher => teacher !== undefined).join(", ")}
                            {group.groupLevel !== undefined ? `, ${group.groupLevel}` : ''}
                        </p>
                        <p className="result-to-print print-next-month-hours">
                            Часов в следующем месяце: {group.nextMonthHours.toFixed(2)} а/ч
                        </p>

                        <Table bordered className="print-group-students">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Студент</th>
                                    <th>Скидка</th>
                                    <th>Часов к оплате</th>
                                    <th>Оплата в рублях</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    group.students.map((student, index) =>
                                        <tr key={index} className={`print-student-info ${student.hasDebt ? 'debt' : ''}`}>
                                            <td>{index + 1}</td>
                                            <td>{student.name} {student.indGraphic ? <strong>(инд график)</strong> : ''}</td>
                                            <td>{student.discount !== 0 ? (student.discount * 100).toFixed(0) + "%" : ""}</td>
                                            <td>{student.hoursToPay > 0.0 ? student.hoursToPay : ""}</td>
                                            <td>{student.hoursToPay > 0.0 ? student.moneyToPay + " руб" : "не должен"}</td>
                                            {/* <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.hoursToPay.toFixed(2) : ""}</td>
                                            <td>{student.hoursToPay.toFixed(2) > 0.0 ? student.moneyToPay.toFixed(2) + " руб" : "не должен"}</td> */}
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div id="to-print">
            {groupsResult.monWedFr !== null ? drawNewPage('пн ср птн', groupsResult.monWedFr) : ''}
            {groupsResult.tueThr !== null ? drawNewPage('вт чт', groupsResult.tueThr) : ''}
            {groupsResult.sat !== null ? drawNewPage('сб', groupsResult.sat) : ''}
            {groupsResult.individuals !== null ? drawNewPage('индивидуалы', groupsResult.individuals) : ''}
            {groupsResult.others !== null ? drawNewPage('другое', groupsResult.others) : ''}
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