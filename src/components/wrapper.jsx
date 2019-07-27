import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import PageLoader from './pageLoader';
import { setMessage } from '../store/actions';
import miscs from '../utils/miscs';

export default function wrapper(Component)
{
  const WrapperComponent = (props) =>
  {
    const { settings, _setMessage } = props;
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <Alert
          color={miscs.mapMessageTypeToColor(settings.messageType)}
          isOpen={!!settings.message.length}
          toggle={() => _setMessage('', '')}
          style={{
            top: 0, right: 0, position: 'absolute', zIndex: 800,
          }}
        >
          {settings.message}
        </Alert>
        {settings.showLoader && <PageLoader />}
        <Component {...props} />
      </div>
    );
  };

  WrapperComponent.propTypes = {
    settings: PropTypes.shape({
      showLoader: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
      messageType: PropTypes.string.isRequired,
    }).isRequired,
    _setMessage: PropTypes.func.isRequired,
  };

  const mapStateToProps = state => ({
    settings: state.settings,
  });

  const mapDispatchToProps = dispatch => ({
    _setMessage: (message, messageType) =>
    {
      dispatch(setMessage(message, messageType));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
}
