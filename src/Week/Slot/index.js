import React from 'react';
import { connect } from 'react-redux';
import { select, unselect } from '../WeekActions';
import moment from 'moment';
import styles from './styles.scss';


export const Slot = ({ status, league, affiliationId, onClick, index, date, time, id }) => {
  const statusClass = status == 1 ? styles.isSelected : status == 4 ? styles.isUsed : '';

  return (
    <div className={styles.box + ' ' + statusClass}
    onClick={() => {
      if (status !== 4) {
        onClick({ status, league, affiliationId, index, date, time, id });
      }
    }} />
  )
};

Slot.defaultProps = {
  status: 0,
  onClick: () => {}
};

const mapStateToProps = (state, ownProps) => {
  const record = state.timeSlots.slots.find((item) => {
    return item.index == ownProps.index &&
           item.time  == ownProps.time  &&
           moment(item.date).diff(ownProps.date, 'days') === 0 &&
           moment(item.date).format('YYYY-MMM-D') == moment(ownProps.date).format('YYYY-MMM-D');
  });

  return {
    status: record ? record.status : 0,
    id: record ? record.id : false
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (args) => {
      if ( args.status == 0 ) {
        dispatch(select(args))
      } else {
        dispatch(unselect(args))
      }
    }
  }; 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slot);
