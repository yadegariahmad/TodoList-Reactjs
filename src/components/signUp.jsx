/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import
{
  FormGroup,
  Label,
  Input,
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
    const { _loader } = this.props;
    const { _signUp } = this.props;
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

    // post('auth/signup', JSON.stringify(body))
    //   .then((resData) =>
    //   {
    //     setSettings({ ...settings, showLoader: false });
    //     if (resData.status === 201)
    //     {
    //       userCreated('signIn');
    //       setValues(SignUpFormInit);
    //     } else
    //     {
    //       throw new Error(resData.message);
    //     }
    //   })
    //   .catch((err) =>
    //   {
    //     setSettings({ ...settings, showLoader: false });
    //     error(err.message);
    //   });
  };

  render()
  {
    const { SignUpForm } = this.state;
    return (
      <form onSubmit={(e) => { this.signUp(e); }}>
        <h1>Sign up</h1>
        <br />

        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={SignUpForm.name.value}
            onChange={this.changeHandler('name')}
          />
        </FormGroup>
        {!SignUpForm.name.valid && <span className="error">Name is required</span>}

        <FormGroup>
          <Label for="userName">User Name</Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            value={SignUpForm.userName.value}
            onChange={this.changeHandler('userName')}
          />
        </FormGroup>
        {!SignUpForm.userName.valid && <span className="error">User Name is required</span>}

        <FormGroup>
          <Label for="signUp-email">Email</Label>
          <Input
            type="email"
            name="email"
            id="signUp-email"
            placeholder="Email"
            value={SignUpForm.email.value}
            onChange={this.changeHandler('email')}
          />
        </FormGroup>
        {!SignUpForm.email.valid && <span className="error">e-mail format is incorrect</span>}

        <FormGroup>
          <Label for="signUp-password">Password</Label>
          <Input
            type="password"
            name="password"
            id="signUp-password"
            placeholder="Password"
            value={SignUpForm.password.value}
            onChange={this.changeHandler('password')}
          />
        </FormGroup>
        {!SignUpForm.password.valid && <span className="error">Password min length is 5</span>}

        <button type="submit" disabled={!SignUpForm.formIsValid}>Sign Up</button>
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
