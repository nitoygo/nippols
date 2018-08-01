import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class TeamYearlyChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.state.data = [
      {name: 'Jan', average: 20, team: 30},
      {name: 'Feb', average: 30, team: 35},
      {name: 'Mar', average: 20, team: 40},
      {name: 'Apr', average: 27, team: 20},
      {name: 'May', average: 18, team: 8 },
      {name: 'Jun', average: 23, team: 22},
      {name: 'Jul', average: 34, team: 27},
      {name: 'Aug', average: 20, team: 30},
      {name: 'Sep', average: 15, team: 20},
      {name: 'Oct', average: 10, team: 30},
      {name: 'Nov', average: 18, team: 35},
      {name: 'Dec', average: 25, team: 20},
    ];
  }

  render () {
  	return (
    	<LineChart width={600} height={300} data={this.state.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="team" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="average" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export default TeamYearlyChart;
