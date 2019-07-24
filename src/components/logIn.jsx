/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import
{
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { loader, logIn } from '../store/actions';
import { SHOW_LOADER } from '../store/actionTypes';
import { email, length, required } from '../utils/validators';
import './logIn_signUp.scss';

class LogIn extends Component
{
  state = {
    logInForm: {
      email: {
        value: '',
        valid: false,
        validators: [email, required],
      },
      password: {
        value: '',
        valid: false,
        validators: [required, length],
      },
      formIsValid: false,
    },
  };

  changeHandler = object => (e) =>
  {
    const { logInForm } = this.state;
    let isValid = true;
    for (const validator of logInForm[object].validators)
    {
      isValid = isValid && validator(e.target.value);
    }

    let updatedForm = {
      ...logInForm,
      [object]: {
        ...logInForm[object],
        value: e.target.value,
        valid: isValid,
      },
    };

    let formIsValid = true;
    // eslint-disable-next-line guard-for-in
    for (const input in updatedForm)
    {
      if (input !== 'formIsValid')
      {
        formIsValid = formIsValid && updatedForm[input].valid;
      }
    }

    updatedForm = {
      ...updatedForm,
      formIsValid,
    };

    this.setState({ logInForm: { ...updatedForm } });
  };

  signIn = (e) =>
  {
    const { _loader } = this.props;
    const { _logIn } = this.props;
    const { logInForm } = this.state;
    e.preventDefault();
    _loader(SHOW_LOADER);

    const body = {
      email: logInForm.email.value,
      password: logInForm.password.value,
    };

    _logIn(body);
  };

  render()
  {
    const { logInForm } = this.state;
    return (
      <Form onSubmit={(e) => { this.signIn(e); }}>
        <h1>Sign in</h1>
        <br />
        <FormGroup>
          <Label for="logIn-email">Email</Label>
          <Input
            type="email"
            name="email"
            id="logIn-email"
            placeholder="Email"
            value={logInForm.email.value}
            onChange={this.changeHandler('email')}
          />
        </FormGroup>
        {!logInForm.email.valid && <span className="error">e-mail format is incorrect</span>}

        <FormGroup>
          <Label for="logIn-password">Password</Label>
          <Input
            type="password"
            name="password"
            id="logIn-password"
            placeholder="Password"
            value={logInForm.password.value}
            onChange={this.changeHandler('password')}
          />
        </FormGroup>
        {!logInForm.password.valid && <span className="error">Password min length is 5</span>}

        <button type="submit" disabled={!logInForm.formIsValid}>Sign In</button>
      </Form>
    );
  }
}

LogIn.propTypes = {
  _loader: PropTypes.func.isRequired,
  _logIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  _loader: (type) =>
  {
    dispatch(loader(type));
  },
  _logIn: (body) =>
  {
    dispatch(logIn(body));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
