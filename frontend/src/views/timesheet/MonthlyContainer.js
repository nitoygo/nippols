
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class MonthlyContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ padding: 8 * 3 }}>
        <Typography>
          MonthlyContainer
        </Typography>
      </div>
    );
  }

}

export default MonthlyContainer;
