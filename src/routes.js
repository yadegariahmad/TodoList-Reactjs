import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import requireAuth from "./components/authentication";
import PageLoader from './components/PageLoader';

const waitFor = Tag => props => <Tag {...props} />;

const Home = lazy(() => import('./containers/Home'));
const Add = lazy(() => import('./containers/Add'));
const Auth = lazy(() => import('./containers/Auth'));

const Routes = ({ location }) =>
{
  return (
    <div>
      <Suspense fallback={<PageLoader />}>
        <Switch location={location}>
          <Route path="/Home" component={waitFor(requireAuth(Home))} />
          <Route path="/Add" component={waitFor(requireAuth(Add))} />
          <Route path="/Auth" component={waitFor(Auth)} />

          <Redirect to="/Auth" />
        </Switch>
      </Suspense>
    </div>
  )
}

export default withRouter(Routes);