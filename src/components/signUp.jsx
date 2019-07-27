/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import
{
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import { loader, signUp } from '../store/actions';
import { SHOW_LOADER } from '../store/actionTypes';
import { email, length, required } from '../utils/validators';
import './logIn_signUp.scss';

class SignUp extends Component
{
  state = {
    SignUpForm: {
      email: {
        value: '',
        valid: false,
        validators: [email, required],
      },
      password: {
        value: '',
        valid: false,
        validators: [required, length({ min: 5 })],
      },
      name: {
        value: '',
        valid: false,
        validators: [required],
      },
      userName: {
        value: '',
        valid: false,
        validators: [required],
      },
      formIsValid: false,
    },
  };

  changeHandler = object => (e) =>
  {
    const { SignUpForm } = this.state;
    let isValid = true;
    for (const validator of SignUpForm[object].validators)
    {
      isValid = isValid && validator(e.target.value);
    }

    let updatedForm = {
      ...SignUpForm,
      [object]: {
        ...SignUpForm[object],
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

    this.setState({ SignUpForm: { ...updatedForm } });
  };

  signUp = (e) =>
  {
    const { _loader, _signUp } = this.props;
    const { SignUpForm } = this.state;
    e.preventDefault();
    _loader(SHOW_LOADER);

    const body = {
      name: SignUpForm.name.value,
      email: SignUpForm.email.value,
      userName: SignUpForm.userName.value,
      password: SignUpForm.password.value,
    };

    _signUp(body);
  };

  render()
  {
    const { SignUpForm } = this.state;
    return (
      <form onSubmit={(e) => { this.signUp(e); }}>
        <h1 style={{ fontWeighteight: 'bold', margin: 0 }}><Trans i18nKey="auth.sign-up.TITLE" /></h1>
        <br />

        <FormGroup>
          <Label for="name"><Trans i18nKey="auth.NAME" /></Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={SignUpForm.name.value}
            invalid={!SignUpForm.name.valid}
            onChange={this.changeHandler('name')}
          />
          <FormFeedback><Trans i18nKey="auth.NAME-ERROR" /></FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="userName"><Trans i18nKey="auth.USER-NAME" /></Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            value={SignUpForm.userName.value}
            invalid={!SignUpForm.userName.valid}
            onChange={this.changeHandler('userName')}
          />
          <FormFeedback><Trans i18nKey="auth.USER-NAME-ERROR" /></FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="signUp-email"><Trans i18nKey="auth.EMAIL" /></Label>
          <Input
            type="email"
            name="email"
            id="signUp-email"
            placeholder="Email"
            value={SignUpForm.email.value}
            invalid={!SignUpForm.email.valid}
            onChange={this.changeHandler('email')}
          />
          <FormFeedback><Trans i18nKey="auth.EMAIL-ERROR" /></FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="signUp-password"><Trans i18nKey="auth.PASSWORD" /></Label>
          <Input
            type="password"
            name="password"
            id="signUp-password"
            placeholder="Password"
            value={SignUpForm.password.value}
            invalid={!SignUpForm.password.valid}
            onChange={this.changeHandler('password')}
          />
          <FormFeedback><Trans i18nKey="auth.PASSWORD-ERROR" /></FormFeedback>
        </FormGroup>

        <button className="auth-button" type="submit" disabled={!SignUpForm.formIsValid}>
          <Trans i18nKey="auth.sign-up.TITLE" />
        </button>
      </form>
    );
  }
}

SignUp.propTypes = {
  _loader: PropTypes.func.isRequired,
  _signUp: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  _loader: (type) =>
  {
    dispatch(loader(type));
  },
  _signUp: (body) =>
  {
    dispatch(signUp(body));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
