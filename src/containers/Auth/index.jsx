import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SignUp from '../../components/signUp';
import LogIn from '../../components/logIn';
import ChangeLang from '../../components/changeLang';
import './auth.scss';

class Auth extends Component
{
  state = {
    mode: 'signIn',
  };

  componentDidMount()
  {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (token)
    {
      history.push('/Home');
    }
  }

  static getDerivedStateFromProps(props, state)
  {
    return (props.signedUp && state.mode !== 'signIn') ? { mode: 'signIn' } : null;
  }

  containerClass = () =>
  {
    const { mode } = this.state;
    return mode === 'signIn' ? '' : 'right-panel-active';
  };

  changeMode = (mode) =>
  {
    this.setState({ mode });
  }

  render()
  {
    return (
      <div className="Auth">
        <div className="lang-container">
          <ChangeLang btnColor="dark" />
        </div>
        <div className={`container ${this.containerClass()}`} id="container">
          <div className="form-container sign-up-container">
            <SignUp />
          </div>

          <div className="form-container sign-in-container">
            <LogIn />
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p><Trans i18nKey="auth.sign-up.WELCOME" /></p>
                <button
                  type="button"
                  className="ghost auth-button"
                  onClick={() => { this.setState({ mode: 'signIn' }); }}
                >
                  <Trans i18nKey="auth.log-in.TITLE" />
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p><Trans i18nKey="auth.log-in.WELCOME" /></p>
                <button
                  type="button"
                  className="ghost auth-button"
                  onClick={() => { this.setState({ mode: 'signUp' }); }}
                >
                  <Trans i18nKey="auth.sign-up.TITLE" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  signedUp: state.user.signedUp,
});

export default connect(mapStateToProps, null)(withTranslation('translations')(Auth));
