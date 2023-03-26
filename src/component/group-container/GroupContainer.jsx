import React from 'react';
import GroupItem from '../group-item/GroupItem';

import './GroupContainer.css';


export default function GroupContainer({groupsArr, title}) {
    if ( groupsArr?.length > 0 ) {
      return (
        <>
          <h3>{title}</h3>
          {
            groupsArr?.map((group, index) =>
            <div key={index} className="group-payment">
              <GroupItem group={group}/>
            </div>
          )}
        </>
      );
    }
    
}