import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './Login/LoginPage';
import SignupPage from './Signup/SignupPage';
import EmailVerificationPage from './EmailVerification/EmailVerificationPage';
import PasswordResetRequestPage from './PasswordResetRequest/PasswordResetRequestPage';
import PasswordResetSuccessPage from './PasswordResetSuccess/PasswordResetSuccessPage';
import PasswordResetPage from './PasswordReset/PasswordResetPage';
import KitListPage from './KitList/KitListPage';
import KitShowPage from './KitShow/KitShowPage';
import KitShowAdminPage from './KitShowAdmin/KitShowAdminPage';
import AccountPage from './Account/AccountPage';
import ScoreboardPage from './Scoreboard/ScoreboardPage';
import OrderKitPage from './OrderKit/OrderKitPage';
import OrderKitSuccessPage from './OrderKitSuccess/OrderKitSuccessPage';
import NotFoundPage from './NotFoundPage';
import {ErrorBoundary, PrivateRoute, PrivateRouteContainer, SideNav} from 'Components';


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const {
      isAuthenticated, isLoaded, user
    } = this.props;
    return isLoaded ? <ErrorBoundary>
      <Switch>
        <PrivateRoute path="/login" component={LoginPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
        <PrivateRoute path="/signup" exact component={SignupPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
        <PrivateRoute path="/signup/verify" exact component={EmailVerificationPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
        <PrivateRoute exact path="/password/request" component={PasswordResetRequestPage} isAuthorized={!isAuthenticated} redirectTo="/"/>
        <Route exact path="/password/reset" component={PasswordResetPage} />
        <Route exact path="/password/reset/success" component={PasswordResetSuccessPage} />
        <PrivateRoute path="/signup/order" isAuthorized={isAuthenticated} redirectTo="/login" exact component={OrderKitPage} />
        <PrivateRoute path="/signup/order/success" isAuthorized={isAuthenticated} redirectTo="/login" exact component={OrderKitSuccessPage} />
        <PrivateRouteContainer isAuthorized={isAuthenticated} redirectTo="/signup" withParams>
          <div className="fill flex-row app__row">
            <SideNav />
            <div className="fill flex-column">
              <div className="fill flex-row">
                <Switch>
                  <Route path="/account" exact component={AccountPage} />
                  <Route path="/kits" exact component={KitListPage} />
                  <Route path="/kits/:kitId" exact component={KitShowPage} />
                  <Route path="/scores" component={ScoreboardPage} />
                  <PrivateRoute path="/" exact redirectTo="/scores" isAuthenticated={false}/>
                  <PrivateRoute path="/admin/kits/:kitId" exact component={KitShowAdminPage} isAuthorized={user && user.role == 'admin'} redirectTo="/" />
                  <Route path="/" component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </div>
        </PrivateRouteContainer>
      </Switch>
    </ErrorBoundary> : null;
  }
}

App.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired
};

export default App;
