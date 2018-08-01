import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';

class Welcome extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="headline" component="h2">
            Welcome to NIPPOLS demo
          </Typography>
          <Typography component="p">
            NIPPOLS is where you can manage your projects, team, and tasks in one place.
            Feel free to explore its features and manipulate some data
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button href="#">
            <CodeIcon style={{ paddingRight: '0.5em' }} />
            Source for this demo
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Welcome;
