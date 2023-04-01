import React, { useState, useEffect } from "react";

import './GroupsResultBySchedule.css';


export default function GroupsResultBySchedule({ resultGroups, onScheduleChoose }) {

    const [activeSchedule, setActiveSchedule] = useState('');
    const [resultGroupsCount, setResultGroupsCount] = useState(0);

    const groupsByScheduleMap = new Map([
        ['пн ср пт', resultGroups.monWedFr],
        ['вт чт', resultGroups.tueThr],
        ['сб', resultGroups.sat],
        ['индивидуалы', resultGroups.individuals],
        ['другое', resultGroups.others],
    ]);

    function draw() {
        let result = [];
        for (const schedule of groupsByScheduleMap.keys()) {
            if (groupsByScheduleMap.get(schedule) !== null) {
                result.push(
                    <li key={schedule} className={`list-group-item ${schedule === activeSchedule ? "active" : ''}`} onClick={() => handleClick(schedule)}>
                        <p className="title">{schedule}</p>
                        <p className="groups-count">Групп: {groupsByScheduleMap.get(schedule).length}</p>
                    </li>);
            }
        }
        return result;
    }

    function handleClick(schedule) {
        if (activeSchedule !== schedule) {
            setActiveSchedule(schedule);
            onScheduleChoose(groupsByScheduleMap.get(schedule), schedule);
        }
    }

    useEffect(() => {
        setResultGroupsCount(
            [resultGroups.monWedFr?.length,
            resultGroups.tueThr?.length,
            resultGroups.sat?.length,
            resultGroups.individuals?.length,
            resultGroups.others?.length]
                .filter(res => res !== undefined)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        );
        handleClick('пн ср пт');
    }, []);

    return (
        <div id="groups-result-by-schedule-container">
            <p className="groups-result-by-schedule-list-title">Групп обработано: {resultGroupsCount}</p>
            <ul id="groups-result-by-schedule-list" className="list-group">
                {draw()}
            </ul>
        </div>
    );
}