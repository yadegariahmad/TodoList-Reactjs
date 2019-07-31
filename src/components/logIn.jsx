/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Trans, withTranslation } from 'react-i18next';
import
{
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
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
        validators: [required, length({ min: 5 })],
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
    const { _loader, _logIn, history } = this.props;
    const { logInForm } = this.state;
    e.preventDefault();
    _loader(SHOW_LOADER);

    const body = {
      email: logInForm.email.value,
      password: logInForm.password.value,
    };

    _logIn(body, history);
  };

  render()
  {
    const { logInForm } = this.state;
    return (
      <Form onSubmit={(e) => { this.signIn(e); }}>
        <h1 style={{ fontWeighteight: 'bold', margin: 0 }}><Trans i18nKey="auth.log-in.TITLE" /></h1>
        <br />
        <FormGroup>
          <Label for="logIn-email"><Trans i18nKey="auth.EMAIL" /></Label>
          <Input
            type="email"
            name="email"
            id="logIn-email"
            placeholder="Email"
            value={logInForm.email.value}
            invalid={!logInForm.email.valid}
            onChange={this.changeHandler('email')}
          />
          <FormFeedback><Trans i18nKey="auth.EMAIL-ERROR" /></FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="logIn-password"><Trans i18nKey="auth.PASSWORD" /></Label>
          <Input
            type="password"
            name="password"
            id="logIn-password"
            placeholder="Password"
            value={logInForm.password.value}
            invalid={!logInForm.password.valid}
            onChange={this.changeHandler('password')}
          />
          <FormFeedback><Trans i18nKey="auth.PASSWORD-ERROR" /></FormFeedback>
        </FormGroup>

        <button className="auth-button" type="submit" disabled={!logInForm.formIsValid}>
          <Trans i18nKey="auth.log-in.TITLE" />
        </button>
      </Form>
    );
  }
}

LogIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
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
  _logIn: (body, history) =>
  {
    dispatch(logIn(body, history));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation('translations')(LogIn)));
