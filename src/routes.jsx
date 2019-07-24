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
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { setMessage } from './store/actions';
import requireAuth from './components/authentication';
import PageLoader from './components/pageLoader';

const waitFor = Tag => props => <Tag {...props} />;

const Home = lazy(() => import('./containers/Home'));
const Add = lazy(() => import('./containers/Add'));
const Auth = lazy(() => import('./containers/Auth'));

const mapMessageTypeToColor = (type) =>
{
  let retVal = '';
  switch (type)
  {
    case 'error':
      retVal = 'danger';
      break;

    case 'success':
      retVal = 'success';
      break;

    case 'general':
    default:
      retVal = 'primary ';
      break;
  }

  return retVal;
};

const Routes = ({ location, settings, _setMessage }) => (
  <div style={{ position: 'relative', height: '100%' }}>
    <Alert
      className="alert-container"
      color={mapMessageTypeToColor(settings.messageType)}
      isOpen={!!settings.message.length}
      toggle={() => _setMessage('', '')}
      style={{ top: 0, right: 0, position: 'absolute' }}
    >
      {settings.message}
    </Alert>
    <Suspense fallback={<PageLoader />} style={{ position: 'absolute' }}>
      <Switch location={location}>
        <Route path="/Home" component={waitFor(requireAuth(Home))} />
        <Route path="/Add" component={waitFor(requireAuth(Add))} />
        <Route path="/Auth" component={waitFor(Auth)} />

        <Redirect to="/Auth" />
      </Switch>
    </Suspense>
  </div>
);

Routes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
  }).isRequired,
  _setMessage: PropTypes.func.isRequired,
};

// const Routes = connect(
//   state => ({ settings: state.settings }),
//   dispatch => ({
//     _setMessage: (message, messageType) =>
//     {
//       dispatch(setMessage(message, messageType));
//     },
//   }),
// )(withRouter(_Routes));

export default connect(
  state => ({ settings: state.settings }),
  dispatch => ({
    _setMessage: (message, messageType) =>
    {
      dispatch(setMessage(message, messageType));
    },
  }),
)(withRouter(Routes));
