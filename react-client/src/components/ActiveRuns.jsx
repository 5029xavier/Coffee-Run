import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

class ActiveRuns extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            runs: this.props.runs,
            location: this.props.location,
            user: this.props.user
        }

        this.ComplexGrid = this.ComplexGrid.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.compareUser = this.compareUser.bind(this);
    }

    handleMenu(startrun, run) {
        if (startrun === true) {
            this.props.orderView(true, run);
        } else {
            this.props.orderView(false, run);
        }
    }

    compareUser(run, user) {
        if (run.user === user) {
            return (
                <Button variant='contained' onClick={() => {this.props.completeRun(run._id)}}>
                    Complete Your Run
                </Button>
            )
        } else {
            return (
                <Button onClick={() => {this.handleMenu(false, run)}}>
                    Join Order
                </Button>
            )
        }
    }

    ComplexGrid() {
        console.log(this.state);
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(2),
                margin: 'auto',
                maxWidth: 500,
            },
            image: {
                width: 128,
                height: 128,
            },
            img: {
                margin: 'auto',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
            },
        }));
        
        if (this.state.runs.length === 0) {
            let menuObj = {
                menu: [],
                cafe: ''
            }
            return(
                <h1>No Active Runs!
                <Button onClick={() => {this.props.orderView(true, menuObj)}} value="startrun">
                    Start a Run
                </Button>
                </h1>
            )
        } else {
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    {this.props.runs.map(run => (
                    <div>
                    <Grid item>
                    <ButtonBase className={classes.image}>
                    </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            {run.cafe}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {run.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {run.time}
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                            Add Items
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">{run.order.length} orders</Typography>
                        {this.compareUser(run, this.state.user)}
                    </Grid>
                    </Grid>
                    </div>
                    ))}
                </Grid>
                </Paper>
            </div>
            )
        }
        }

    render() {
        return(
            <div>
                {this.ComplexGrid()}
            </div>
        )
    }
}

export default ActiveRuns;