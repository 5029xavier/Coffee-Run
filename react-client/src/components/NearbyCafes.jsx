import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import OrderForm from './OrderForm.jsx';
import ActiveRuns from './ActiveRuns.jsx';

class NearbyCafes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cafes: this.props.cafes,
      runs: this.props.runs,
      user: this.props.user,
      name: this.props.name,
      location: this.props.location,
      menu: [],
      view: 'startrun',
      startrun: true,
      currentRun: '',
      cafe: ''
    }
    
    this.Copyright = this.Copyright.bind(this);
    this.Cafes = this.Cafes.bind(this);
    this.renderView = this.renderView.bind(this);
    this.changeView = this.changeView.bind(this);
    this.orderView = this.orderView.bind(this);
    // this.renderCards = this.renderCards.bind(this);
  }

  Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Alex Tian - '}
        <Link color="inherit" href="https://material-ui.com/">
            Coffee Run
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
    };
  
  changeView(view) {
    this.setState({
        view: view
    })
  }

  orderView(startrun, menu) {
    if (startrun === true) {
        console.log(menu)
        this.setState({
            view: 'orderform',
            startrun: startrun,
            menu: menu.menu,
            cafe: menu.cafe
        });
    } else {
        let newMenu;
        if (menu.cafe === 'Starbucks') {
            newMenu = this.state.cafes[0].menu;
        } else if (menu.cafe === "Peet's Coffee") {
            newMenu = this.state.cafes[1].menu;
        } else if (menu.cafe === 'Blue Bottle Coffee') {
            newMenu = this.state.cafes[2].menu;
        } else if (menu.cafe === 'Philz Coffee') {
            newMenu = this.state.cafes[3].menu;
        }            
        this.setState({
            view: 'orderform',
            startrun: startrun,
            menu: newMenu,
            currentRun: menu._id,
            cafe: menu.cafe
        })
    }
  }

  renderView() {
      console.log(this.props)
      if (this.state.view === 'startrun') {
        const classes = makeStyles(theme => ({
            icon: {
                marginRight: theme.spacing(2),
            },
            heroContent: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(8, 0, 6),
            },
            heroButtons: {
                marginTop: theme.spacing(4),
            },
            cardGrid: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8),
            },
            card: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            },
            cardMedia: {
                paddingTop: '56.25%', // 16:9
            },
            cardContent: {
                flexGrow: 1,
            },
            footer: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(6),
            },
            }));  
        return(  
        <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
            {this.state.cafes.map(cafe => (
                <Grid item key={cafe} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={cafe.logo}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {cafe.name}
                    </Typography>
                    <Typography>
                    {cafe.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" name={cafe.name}>
                    Menu
                    </Button>
                </CardActions>
                </Card>
                </Grid>
            ))};    
        </Grid>
        </Container>
        )
      } else if (this.state.view === 'joinrun') {
          console.log('rendering active runs');
          console.log(this.state.runs);
          let runMenu = this.state.runs;
          for (var i = 0; i < runMenu.length; i++) {
            if (runMenu.cafe === 'Starbucks') {
                runMenu.cafe = this.state.cafes[0].menu;
            } else if (runMenu.cafe === "Peet's Coffee") {
                runMenu.cafe = this.state.cafes[1].menu;
            } else if (runMenu.cafe === 'Blue Bottle Coffee') {
                runMenu.cafe = this.state.cafes[2].menu;
            } else if (runMenu.cafe === 'Philz Coffee') {
                runMenu.cafe = this.state.cafes[3].menu;
            }            
          }
          return (
            <ActiveRuns runs={runMenu} user={this.state.user} location={this.state.location} orderView={this.orderView} completeRun={this.props.completeRun}/>
          )
      } else if (this.state.view === 'orderform') {
          console.log('rendering order form');
          console.log(this.state.menu);
          return (
            <OrderForm currentRun={this.state.currentRun} menu={this.state.menu} location={this.state.location} startrun={this.state.startrun} cafes={this.state.cafes} name={this.state.name} user={this.state.user} orderView={this.orderView} handleOrder={this.props.handleOrder}/>
          )
      }
  }
  
  Cafes() {
    const classes = makeStyles(theme => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
        footer: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(6),
        },
        }));
  
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <LocalCafeIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Coffee Run - {this.props.location}
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Welcome, {this.props.name}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={() => {this.orderView(true, this.state)}}>
                      Start a Coffee Run
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" onClick={() => {this.changeView('joinrun')}}>
                      Join a Coffee Run
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          {this.renderView()}
          {console.log(this.state)}
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          {this.Copyright()}
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.Cafes()}  
      </React.Fragment>
    )
  }
}

export default NearbyCafes;