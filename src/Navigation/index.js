import React from 'react';
import { connect } from 'react-redux';
import { changeRoute } from './NavigationActions';
import { LEAGUE_SELECT, SETUP, SLOT_SELECT } from './constants';
import styles from './styles.scss';

import Selection from '../Selection';
import Setup from '../Setup';
import Week from '../Week';

export const Navigation = ({ selected, navigateTo }) => {
  return (
    <div className={styles.container + ' ' + styles['select' + selected]}>
      <div className={styles.viewWrapper}>
        <div className={styles.viewContainer}>
          <Selection navigateTo={navigateTo} /> 
          <Setup navigateTo={navigateTo} />
          <Week />
        </div>
      </div>
      <div className={styles.selectedView}>
        <span onClick={() => navigateTo(LEAGUE_SELECT)}></span>
        <span onClick={() => navigateTo(SETUP)}></span>
        <span onClick={() => navigateTo(SLOT_SELECT)}></span>
        </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selected: state.navigation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => dispatch(changeRoute(route))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
