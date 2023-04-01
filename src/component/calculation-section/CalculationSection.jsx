import React, { useState, useEffect } from "react";
import GroupsToCalcList from "../groups-to-calc-list/GroupsToCalcList";
import PreCalcGroupDetails from "./pre-calc-group-details/PreCalcGroupDetails";
import GroupsResultBySchedule from "../groups-result-by-schedule/GroupsResultBySchedule";
import SelectedResultGroups from "../selected-result-groups/SelectedResultGroups";

import './CalculationSection.css';


export default function CalculationSection({
    groupsToCalc,
    resultGroups,
    calcParams
}) {

    const [selectedPreCalcGroup, setSelectedPreCalcGroup] = useState(null);
    const [selectedResultGroups, setSelectedResultGroups] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [canShowPreCalcGroup, setCanShowPreCalcGroup] = useState(false);
    const [canShowResult, setCanShowResult] = useState(false);


    function getSelectedPreCalcGroup(index) {
        setSelectedResultGroups([]);
        setSelectedSchedule('');
        setSelectedPreCalcGroup(groupsToCalc[index]);
    }

    function getSelectedSchedule(selectedResultGroups, selectedSchedule) {
        setSelectedPreCalcGroup(null);
        setSelectedResultGroups(selectedResultGroups);
        setSelectedSchedule(selectedSchedule);
    }

    useEffect(() => {
        if (groupsToCalc.length > 0) {
            setCanShowPreCalcGroup(true);
            setCanShowResult(false);
        }
    }, [groupsToCalc.length]);

    useEffect(() => {
        if (resultGroups != null) {
            setCanShowPreCalcGroup(false);
            setCanShowResult(true);
        }
    }, [resultGroups]);


    return (
        <>
            <div id='pre-calculation-params-section' className='col-3 d-flex flex-column align-items-start'>
                {
                    canShowPreCalcGroup ?
                        <GroupsToCalcList groupsToCalc={groupsToCalc} onGroupChoose={getSelectedPreCalcGroup} />
                        : ''
                }
                {
                    canShowResult ?
                        <GroupsResultBySchedule resultGroups={resultGroups} onScheduleChoose={getSelectedSchedule} />
                        : ''
                }
                {calcParams}
            </div>
            {
                selectedPreCalcGroup !== null ?
                    <PreCalcGroupDetails group={selectedPreCalcGroup} />
                    : ''
            }
            {
                selectedResultGroups.length > 0 ?
                    <SelectedResultGroups schedule={selectedSchedule} groups={selectedResultGroups}/>
                    : ''
            }
        </>
    );
}