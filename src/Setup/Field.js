import React from 'react';
import { connect } from 'react-redux';
import { update } from './SetupActions';
import styles from './styles.scss';

export const Field = ({ value, name, handleChange, validation = /[\d\D]+/i, label, time = false }) => {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
      <input className={styles.inputFull}
             value={value}
             onChange={(event) => handleChange(event.target.value)} />
    </div>
  )
};

const mapStateToProps = (state, ownProps) => {
  const { name } = ownProps;

  
  if (ownProps.time) {
    console.log('dealing with time');
    return {
      value: state.setup.times[name]
    }
  }
  return {
    value: state.setup[name]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    handleChange: (value) => dispatch(update({
      name: ownProps.name,
      time: ownProps.time,
      value 
    }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
