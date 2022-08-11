import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import Login from './views/Login';
import Home from './views/HomeDashboard/HomeDashboard';
import Detailinvoice from './views/DetailInvoice/DetailInvoice';
import Newinvoice from './views/NewInvoice/NewInvoice';
import Register from './views/Register';
import Registerdetail from './views/RegisterDetail';
import Newclient from './views/NewClient/NewClient';
import BillIssuerUpdated from './views/BillIssuerUpdated/BillIssuerUpdated';
import ProfileUpdated from './views/ProfileUpdated/ProfileUpdated';
import Dashboarddraft from './views/Dashboard/DashboardDraft';
import Dashboardpaid from './views/Dashboard/DashboardPaid';
import Dashboardunpaid from './views/Dashboard/DashboardUnpaid';
import Editinvoice from './views/EditInvoice/EditInvoice';
import DashboardListClient from './views/Dashboard/DashboardListClient';
import Dashboardbillissuer from './views/DashboardBillIssuer/DashboardBillIssuer';
import BillIssuerInfo from './views/BillIssuerInfo/BillIssuerInfo';
import FormEditInvoice from './components/Detail/FormEditInvoice';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("loggedIn") === "bill_issuer" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function GuestRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("loggedIn") !== "bill_issuer" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const history = useHistory();
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact path='/'
            component={Home}
          />
          <GuestRoute
            exact path='/login' >
            <Login />
          </GuestRoute>
          <GuestRoute
            exact path='/register'>
            <Register />
          </GuestRoute>
          <GuestRoute
            exact path='/registerDetail'>
            <Registerdetail />
          </GuestRoute>
          <Route
            exact path='/client'
            component={DashboardListClient}
          />
          <Route
            exact path='/detail'
            component={Detailinvoice}
          />
          <PrivateRoute exact path='/dashboard' >
            <Dashboardbillissuer />
          </PrivateRoute>
          <PrivateRoute exact path='/dashboard/draft'>
            <Dashboarddraft />
          </PrivateRoute>
          <PrivateRoute exact path='/dashboard/paid'>
            <Dashboardpaid />
          </PrivateRoute>
          <PrivateRoute exact path='/dashboard/unpaid'>
            <Dashboardunpaid />
          </PrivateRoute>
          <PrivateRoute exact path='/editInvoice'>
            <Editinvoice />
          </PrivateRoute>
          <PrivateRoute exact path='/addInvoice'>
            <Newinvoice />
          </PrivateRoute>
          <PrivateRoute exact path='/addClient'>
            <Newclient />
          </PrivateRoute>
          <PrivateRoute exact path='/billissuer'>
            <BillIssuerInfo />
          </PrivateRoute>
          <PrivateRoute exact path='/billIssuerUpdated'>
            <BillIssuerUpdated />
          </PrivateRoute>
          <PrivateRoute exact path='/formeditinvoice'>
            <FormEditInvoice />
          </PrivateRoute>
          <PrivateRoute
            exact path='/clientupdated'
            render={ProfileUpdated}
            history={history} />
        </Switch>
      </Router>
    </>
  );
}

export default App;


