import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import PrivateRoute from '../Common/PrivateRoute';
import Header from '../Header/Header';
import Flock from '../Flock/Flock';
import FlockManager from '../FlockManager/FlockManager';
import ChickenProfile from '../ChickenProfile/ChickenProfile';
import ChickenEditor from '../ChickenEditor/ChickenEditor';
import EggsDaily from '../EggsDaily/EggsDaily';
import EggsMonthly from '../EggsMonthly/EggsMonthly';
import EggEditor from '../EggEditor/EggEditor';
import Login from '../../containers/LoginForm';
import Signup from '../../containers/SignupForm';
import ForgotPassword from '../../containers/ForgotPasswordForm';
import Loading from '../../components/Loading/Loading';
import Splash from '../../components/Common/Splash';
import { firebaseAuth, C } from '../../config/constants';
import { startListening } from '../../actions';

class App extends Component {
  componentWillMount() {
    this.removeListener = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.onLoggedIn(user);
      } else {
        this.props.onLoggedOut();
      }
    });
  }

  render() {
    const { authStatus } = this.props;
    const authed = authStatus === C.LOGGED_IN;
    if (authStatus === 'UNKNOWN') {
      return <Splash />;
    }
    return (
      <Router>
        <div>
          <Header />
          <Loading />
          <div className="section">
            <div className="columns is-centered">
              <main className="column is-11-tablet is-8-desktop">
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/flock" />
                  </Route>
                  <PrivateRoute path="/flock-manager" component={FlockManager} authed={authed} />
                  <PrivateRoute path="/flock" component={Flock} authed={authed} />
                  <PrivateRoute path="/chicken/add" component={ChickenEditor} authed={authed} />
                  <PrivateRoute path="/chicken/edit/:id" component={ChickenEditor} authed={authed} />
                  <PrivateRoute path="/chicken/:id" component={ChickenProfile} authed={authed} />
                  <PrivateRoute path="/eggs/day/:date" component={EggsDaily} authed={authed} />
                  <PrivateRoute path="/eggs/month/:date" component={EggsMonthly} authed={authed} />
                  <PrivateRoute path="/eggs/add" component={EggEditor} authed={authed} />
                  <PrivateRoute path="/eggs/edit/:eggId" component={EggEditor} authed={authed} />
                  <Route path="/login" render={props => <Login {...props} />} />
                  <Route path="/signup" render={props => <Signup {...props} />} />
                  <Route path="/reset-password" render={props => <ForgotPassword {...props} />} />
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth: { authStatus } }) => ({ authStatus });
const mapDispatchToProps = (dispatch) => {
  return {
    onLoggedIn: user => dispatch(startListening(user)),
    onLoggedOut: () => dispatch({ type: C.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
