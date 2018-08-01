import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class TeamMonthlyChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.state.data = [
      {name: 'Week 1', average: 20, team: 30},
      {name: 'Week 2', average: 30, team: 35},
      {name: 'Week 3', average: 20, team: 40},
      {name: 'Week 4', average: 27, team: 20},
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

export default TeamMonthlyChart;
