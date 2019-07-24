import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from '../../components/signUp';
import LogIn from '../../components/logIn';
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
                <p>To keep connected with us please login with your personal info</p>
                <button
                  type="button"
                  className="ghost auth-button"
                  onClick={() => { this.setState({ mode: 'signIn' }); }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  type="button"
                  className="ghost auth-button"
                  onClick={() => { this.setState({ mode: 'signUp' }); }}
                >
                  Sign Up
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

export default connect(mapStateToProps, null)(Auth);
