import React, {
  Suspense,
  lazy,
} from 'react';
import
{
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import RequireAuth from './components/authentication';
import Wrapper from './components/wrapper';
import PageLoader from './components/pageLoader';


const waitFor = Tag => props => <Tag {...props} />;

const Home = lazy(() => import('./containers/Home'));
const AddAndEdit = lazy(() => import('./containers/Add'));
const Auth = lazy(() => import('./containers/Auth'));

const Routes = ({ location }) => (
  <>
    <Suspense fallback={<PageLoader />}>
      <Switch location={location}>
        <Route path="/Home" component={waitFor(RequireAuth(Wrapper(Home)))} />
        <Route path="/Add" component={waitFor(RequireAuth(Wrapper(AddAndEdit)))} />
        <Route path="/Auth" component={waitFor(Wrapper(Auth))} />

        <Redirect to="/Auth" />
      </Switch>
    </Suspense>
  </>
);

Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Routes);
