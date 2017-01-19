import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import Field from './Field';
import moment from 'moment';
import { SLOT_SELECT } from '../Navigation/constants';
import { getData, saveData } from './SetupActions';

let hasRefreshed = false;

export const Setup = ({ leagueTitle, leagueId, setupData, refresh, save, navigateTo }) => {
  if (leagueId && hasRefreshed !== leagueId) {
    refresh(leagueId);
    hasRefreshed = leagueId;
  }
  
  return (
    <div className={styles.container}>
      <h1>{leagueTitle}</h1>
      <p>Edit the venue settings to reflect available times and courts.</p>
      <div className={styles.formContainer}>
        <Field name="slotsPerTime"
               label={`The maximum number of available slots for ${leagueTitle} play`} 
               validation={/\d+/} />
        <Field name="timeDuration"
               label="The length of an available time slot in minutes"
               validation={/[\d\.]+/} />
        <Field name="morning"
               time={true}
               label="The start of the morning time slot"
               validation={/\d+:\d+\s*(am|pm)/i} />
        <Field name="midday"
               time={true}
               label="The start of the midday time slot"
               validation={/\d+:\d+\s*(am|pm)/i} />
        <Field name="evening"
               time={true}
               label="The start of the evening time slot"
               validation={/\d+:\d+\s*(am|pm)/i} />
        <Field name="startDate"
               label="The day to start scheduling the season"
               validation={/.+/} />
      </div>
      <div className={styles.continueButton} onClick={() => {
          save(Object.assign({}, setupData, { type: leagueId }));
          navigateTo(SLOT_SELECT);
        }}>
        <span>Continue</span>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    leagueTitle: state.league.current.title,
    leagueId: state.league.current.id,
    type: state.setup.type,
    affiliationId: state.setup.affiliaitonId,
    setupData: state.setup, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refresh: (type) => dispatch(getData(type)),
    save: (data) => dispatch(saveData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setup);
