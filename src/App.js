import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { GlobalStyle, DashboardWrapper, MainSection } from './styles/globalStyles';
import { connect } from 'react-redux';
import { Router, Switch, Redirect } from 'react-router-dom';
import { history } from './utils/history';
import NavMenu from './components/NavMenu/NavMenu';
import MenuHeader from './components/MneuHeader/index';
import AuthRoute from './utils/AuthRouther';
import { getAllNeeds, showToastMeassage } from './store/appActions';
import { ToastContainer, toast } from 'react-toastify';
// import Spinner from './components/Smart/Spinner/Spinner';
const Login = React.lazy(() => import('./pages/Login/Login'));
const CalendarComponent = React.lazy(() => import('./pages/Calendar/Calendar'));
const Staff = React.lazy(() => import('./pages/Staff/Staff'));
const Customers = React.lazy(() => import('./pages/Customers/Customers'));
const Account = React.lazy(() => import('./pages/Account/Account'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const Events = React.lazy(() => import('./pages/Events/Events'));
const EventsEdit = React.lazy(() => import('./pages/EventsEdit/EventsEdit'));
const EventsView = React.lazy(() => import('./pages/EventsView/EventsView'));
const StaffView = React.lazy(() => import('./pages/StaffView/StaffView'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Event = React.lazy(() => import('./pages/Finance/Event/Event'));
const Vendor = React.lazy(() => import('./pages/Finance/Vendor/Vendor'));

function App({ screenSize, isAuthenticated, getAllNeeds, userType, successMessage, errorMessage, showToastMeassage, pending }) {

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getAllNeeds();
  }, [getAllNeeds]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => { showToastMeassage(null, null) }
      });
    }
    if (errorMessage) {
      toast.error(
        errorMessage,
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => { showToastMeassage(null, null) }
        });
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="App">
      <Router history={history}> {isAuthenticated && screenSize > 800 && <MenuHeader isOpen={true} isMobileView={false} />}
        <DashboardWrapper isMobile={screenSize < 801} isAuthenticated={isAuthenticated}>
          {isAuthenticated && userType && <NavMenu isOpen={screenSize < 801 ? isOpen : true}
            setIsOpen={setIsOpen} isMobileView={screenSize} userType={userType} path={history.location.pathname} />}
          <MainSection isOpen={screenSize < 801 ? isOpen : true} isMobileView={screenSize < 801} isAuthenticated={isAuthenticated}>
            {isAuthenticated && screenSize < 801 && <MenuHeader isOpen={isOpen} isMobileView={screenSize} />}
            <main className="pr-1 pl-1" style={{ paddingBottom: screenSize < 801 ? '50px' : '150px' }}>
              <Switch>
                <AuthRoute
                  path='/login'
                  component={Login}
                  exact
                  type='public'
                />
                <AuthRoute
                  path='/'
                  component={Dashboard}
                  exact
                  type='private'
                />
                <AuthRoute
                  path='/events'
                  component={Events}
                  exact
                  type='private'
                />
                <AuthRoute
                  path='/calendar'
                  component={CalendarComponent}
                  exact
                  type='private'
                />
                <AuthRoute
                  path='/eventsedit/:id'
                  component={EventsEdit}
                  exact
                  type='private'
                />
                <AuthRoute
                  path='/eventsview/:id'
                  component={EventsView}
                  exact
                  type='private'
                />
                {userType !== 'user' && <AuthRoute
                  path='/staff'
                  component={Staff}
                  exact
                  type='private'
                />}
                {userType !== 'user' && <AuthRoute
                  path='/customers'
                  component={Customers}
                  exact
                  type='private'
                />}
                {userType !== 'user' && <AuthRoute
                  path='/event'
                  component={Event}
                  exact
                  type='private'
                />}
                {userType !== 'user' && <AuthRoute
                  path='/vendor'
                  component={Vendor}
                  exact
                  type='private'
                />}
                {userType !== 'user' && <AuthRoute
                  path='/settings'
                  component={Settings}
                  exact
                  type='private'
                />}
                <AuthRoute
                  path='/account/:id'
                  component={Account}
                  exact
                  type='private'
                />
                <AuthRoute
                  path='/staff/:id'
                  component={StaffView}
                  exact
                  type='private'
                />
                <Redirect to='/not-found' />
              </Switch>
            </main>
          </MainSection>
        </DashboardWrapper>
        <GlobalStyle />
      </Router>
      <ToastContainer />
      {/* {pending && <Spinner />} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    screenSize: state.AppReducer.screenSize,
    isAuthenticated: state.AppReducer.isAuthenticated,
    userType: state.AppReducer.userType,
    successMessage: state.AppReducer.successMessage,
    errorMessage: state.AppReducer.errorMessage,
    pending: state.AppReducer.pending,
  };
};

const mapDispatchToProps = {
  getAllNeeds,
  showToastMeassage
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
