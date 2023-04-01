import React, { useState, useEffect } from "react";
import GroupItem from "./group-item/GroupItem";

import './GroupsToCalcList.css';


export default function GroupsToCalcList({ groupsToCalc, onGroupChoose }) {

    const [activeGroupIndex, setActiveGroupIndex] = useState(null);

    function handleClick(index) {
        if (activeGroupIndex !== index) {
            setActiveGroupIndex(index);
            onGroupChoose(index);
        }
    }

    useEffect(() => {
        handleClick(0);
    },[]);

    return (
        <div id="groups-to-calc-list-container">
            {
                groupsToCalc.length > 0 ?
                    <>
                        <p className="groups-to-calc-list-title">Групп к обработке: {groupsToCalc.length}</p>
                        <ul id="groups-to-calc-list" className="list-group">
                            {groupsToCalc.map((groupToCalc, index) =>
                                <GroupItem key={index}
                                    title={groupToCalc.groupName + (groupToCalc.groupId !== '' ? " (" + groupToCalc.groupId +")" : '')}
                                    schedule={groupToCalc.classDaysOne
                                        .concat(groupToCalc.classDaysTwo)
                                        .map(weekday => weekToStr(weekday))
                                        .join(" ")}
                                    studentsCount={groupToCalc.students?.length}
                                    isActive={index === activeGroupIndex}
                                    onClick={() => handleClick(index)} />
                            )}
                        </ul>
                    </> : <p className="groups-to-calc-list-title">Групп к обработке: 0</p>
            }
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