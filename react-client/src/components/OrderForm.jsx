import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            startrun: this.props.startrun,
            user: this.props.user,
            name: this.props.name,
            menu: this.props.menu,
            cafes: this.props.cafes,
            run: this.props.currentRun,
            cafe: this.props.cafe
        }

        this.orderForm = this.orderForm.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.chooseCafe = this.chooseCafe.bind(this);
    }
    
    handleCart(update, item) {
        if (update === 'add') {
          let newItem = { name: this.state.name, item: item }  
          let newOrder = this.state.cart.concat(newItem);
          this.setState({
            cart: newOrder
          })
        } else if (update === 'remove') {
          let index;
          for (var i = 0; i < this.state.cart.length; i++) {
              if (this.state.cart[i].item === item) {
                  index = i
              } else {
                  index = -1
              }
          };
          let newOrder = this.state.cart;
          if (index > -1) {
            newOrder.splice(index, 1);
            this.setState({
              cart: newOrder
            })
          }
        }
    }

    placeOrder() {
        console.log(this.state);
        let order = {
            user: this.state.user,
            name: this.state.name,
            cafe: this.state.cafe,
            order: this.state.cart,
            location: this.state.location
        }
        this.props.handleOrder(this.state.startrun, order, this.state.run)
    }

    chooseCafe(cafe) {
        this.setState({
            menu: cafe.menu,
            cafe: cafe.name
        })
        this.props.orderView(true, cafe)
    }

    orderForm() {
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
            
        return (
            <div className={classes.root}>
            <Paper className={classes.paper}>
            <Grid container spacing={2}>
                {this.state.menu.map(item => (
                <div>
                {console.log(item)}
                <Grid item>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} src={item.image} />
                </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                        {item.item}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        items in cart: {this.state.cart.length}
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant='outlined' style={{ cursor: 'pointer' }} onClick={() => {this.handleCart('add', item.item)}}>
                        Add
                    </Button>    
                    <Button variant='outlined' style={{ cursor: 'pointer' }} onClick={() => {this.handleCart('remove', item.item)}}>
                        Remove
                    </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{item.price}</Typography>
                </Grid>
                </Grid>
                </div>
                ))}
                <Button variant='contained' onClick={() => {this.placeOrder()}}>
                    Submit Order
                </Button>
            </Grid>
            </Paper>
            </div>
        );
    }

    renderView() {
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
                margin: '20px'
            },
            paper: {
                padding: theme.spacing(2),
                margin: 0,
                maxWidth: 500,
            },
            image: {
                width: '20px',
                height: '20px'
            },
            img: {
                margin: 'auto',
                display: 'block',
                maxWidth: '20px',
                maxHeight: '20px',
            },
            item: {
                margin: 0
            }
        }));

        if (this.state.menu.length === 0) {
            return (
                <div className={classes.root}>
                <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    {this.state.cafes.map(cafe => (
                    <div className={classes.root}>
                    {/* <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} src={cafe.logo} />
                    </ButtonBase>
                    </Grid> */}
                    <Grid className={classes.item} item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            {cafe.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {cafe.address}
                        </Typography>
                        </Grid>
                        <Grid item>
                        <Button variant='outlined' style={{ cursor: 'pointer' }} onClick={() => {this.chooseCafe(cafe)}}>
                            Order
                        </Button>    
                        </Grid>
                    </Grid>
                    </Grid>
                    </div>
                    ))}
                </Grid>
                </Paper>
                </div>
            )   
        } else {
            return this.orderForm();
        }
    }

    render() {
        return(
            <div>
                {this.renderView()}
            </div>
        )
    }
}

export default OrderForm;