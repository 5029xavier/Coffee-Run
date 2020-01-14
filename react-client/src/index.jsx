import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CustomerForm from './components/CustomerForm.jsx';
import NearbyCafes from './components/NearbyCafes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      name: '',
      location: '',
      runs: '',
      cafes: [],
      order: []
    }

    this.handleUser = this.handleUser.bind(this);
    this.renderView = this.renderView.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.completeRun = this.completeRun.bind(this);
  }

  componentDidMount() {
    axios.get('/cafes')
    .then(data => {
      this.setState({
        cafes: data.data
      });
    })
    .then(() => {
      console.log(this.state)
    })
    .then(() => {
      axios.get('/runs')
      .then(data => {
        this.setState({
          runs: data.data
        })
      })
    })
    .catch(err => {
      console.log('error getting: ');
      console.log(err)
    })
  }

  handleUser(userInfo) {
    axios.post('/users/post', userInfo)
    .then(data => {
      console.log(data);
      console.log(`Welcome, ${data.data.name}`);
      this.setState({
        user: data.data._id,
        name: data.data.name,
        location: data.data.location
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleOrder(startrun, order, runId) {
    if (startrun === true) {
      axios.post('/runs/post', {
        user: order.user,
        name: order.name,
        cafe: order.cafe,
        time: Date.now(),
        location: order.location,
        order: order.order
      })
      .then(() => {
        alert('Now wait for your peers to join in!');
      })
      .then(() => {
        axios.get('/runs')
        .then(runs => {
          this.setState({
            runs: runs.runs
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      axios.post('/orders/post', {
        runId: runId,
        name: order.name,
        order: order.order
      })
      .then(() => {
        alert('Order placed!');
      })
      .then(() => {
        axios.get('/runs')
        .then(runs => {
          this.setState({
            runs: runs.runs
          })
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  completeRun(runId) {
    axios.delete('/runs/complete', {
      data: {
        runId: runId
      }
    })
    .then(() => {
      alert('Thanks for your run!');
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  renderView() {
    if (this.state.user !== null && this.state.address !== '') {
      return <NearbyCafes runs={this.state.runs} cafes={this.state.cafes} name={this.state.name} user={this.state.user} location={this.state.location} handleOrder={this.handleOrder} completeRun={this.completeRun}/>
    } else {
      return <CustomerForm handleUser={this.handleUser}/>
    }
  }

  render () {
    return (
    <React.Fragment>
      {this.renderView()}
    </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));