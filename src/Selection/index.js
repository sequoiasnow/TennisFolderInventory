import React       from 'react';
import { connect } from 'react-redux';
import { refresh, select } from './SelectionActions';
import styles      from './styles.scss';
import { SETUP }   from '../Navigation/constants';

export const Selection = ({onSelect, title, id, navigateTo}) => {
  return (
    <div className={styles.selection}
         onClick={() => {
             onSelect(id, title);
             navigateTo(SETUP);
           }}>
      <span className={styles.title}>{title}</span>
    </div>
  )
};

export const SelectionContainer = ({ onSelect, leagues, refresh, lastRefresh, navigateTo }) => {
  // Get some up to date data when we're rendered.    RGS->This seems like a looonnnng time.  I assume its one hour?  Maybe 10 minutes?  
  // Also, We need to refresh when first showing the grid inventory page
  //   --  Refresh needs to 'zero out' the grid and re-populate with only the data from the server's DB
  if ( new Date() - lastRefresh > 60 * 60 * 1000) {
    refresh();
  }
  
  return (
    <div className={styles.container}>
      {leagues.map((league, index) => {
         return (
           <Selection key={index}
                      onSelect={onSelect}
                      title={league.title}
                      id={league.id}
                      navigateTo={navigateTo} />
         )
       })}
    </div>
  )
};

const mapStateToProps = (state) => {
 
  return {
    leagues: state.league.leagues,
    lastRefresh: state.league.lastRefresh
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (id, title) => dispatch(select({ id, title })),
    refresh: () => dispatch(refresh())
  }; 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionContainer);
