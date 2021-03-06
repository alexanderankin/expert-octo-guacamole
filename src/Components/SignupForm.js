import React, { Component } from 'react';
import jQuery from 'jquery';

import ReactTestUtils from 'react-dom/test-utils'; // ES6

class SignupForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: this.props.username,
      name: '',
      email: '',
      role: 0
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);

    this.signupFormSubmit = this.signupFormSubmit.bind(this);

    this.backBtn = this.backBtn.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
    this.render = this.render.bind(this);
  }

  usernameChange(event) { this.setState({username: event.target.value}); }
  nameChange(event) { this.setState({name: event.target.value}); }
  emailChange(event) { this.setState({email: event.target.value}); }

  signupFormSubmit(event) {
    event.preventDefault();
    jQuery.ajax({
      method: 'post',
      url: '/api/login/signup',
      contentType: 'application/json',
      data: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        role: this.state.role === 0 ? 'student' : 'instructor'
      }),
      dataType: 'json',
      error: function (jQReq, status, error) {
        console.log(arguments);
      }.bind(this),
      success: function (data, status, jQReq) {
        console.log('success', data, arguments);
        if (!data.err) {
          // return this.props.result({ success: data });
          console.log('Email sent, now refresh page.');
          return this.props.result();
        }
        
        console.log('Email not sent.');
      }.bind(this)
    });
  }

  backBtn(event) {
    console.log('backBtn');
    this.props.back();
  }

  submitBtn(event) {
    if (this.refs.form) {
      ReactTestUtils.Simulate.submit(this.refs.form);
    }
  }

  testing (that) {
    setTimeout(function() {
      if (!(this.refs && this.refs.username && this.refs.name && this.refs.email && this.refs.back))
        return;

      this.refs.name.value = 'New Name';
      this.refs.email.value = 'valid@email.com';
      ReactTestUtils.Simulate.submit(this.refs.form);
      // ReactTestUtils.Simulate.click(this.refs.back);
    }.bind(that), 400);
  }

  render() {
    if (process.env.NODE_ENV !== 'production')
      // this.testing(this);

    return (
      <div style={{ maxWidth: '500px', minHeight: 480, margin: 'auto', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <button id='template-editor-submit' ref='back' type='button' className='btn btn-danger' onClick={this.backBtn}>
            <span className="glyphicon glyphicon-send"></span> Back
          </button>
        </div>

        <p>Username <i>{this.props.username}</i> was not recognized.</p>
        <p>This screen will contain a form to signup and be emailed a password.</p>

        <form className="form-horizontal" onSubmit={this.signupFormSubmit} ref='form'>
          <div className="form-group">
            <label className="col-sm-2 control-label" htmlFor="signup-form-username">Username:</label>
            <div className="col-sm-10">
              <input
                id="signup-form-username"
                ref='username'
                className="form-control"
                placeholder="Username"
                type="text"
                autoComplete="username"
                value={this.state.username}
                onChange={this.usernameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label" htmlFor="signup-form-name">Name:</label>
            <div className="col-sm-10">
              <input
                id="signup-form-name"
                ref='name'
                className="form-control"
                placeholder="Name"
                type="text"
                autoComplete="name"
                value={this.state.name}
                onChange={this.nameChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label" htmlFor="signup-form-email">Email:</label>
            <div className="col-sm-10">
              <input
                id="signup-form-email"
                ref='email'
                className="form-control"
                placeholder="Email"
                type="email"
                autoComplete="name"
                value={this.state.email}
                onChange={this.emailChange} />
            </div>
          </div>

          <p>I am a: </p>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary" onClick={() => { console.log(this.state); this.setState({ role: 0 }) }} >
              <input type="radio" name="options" id="option1" defaultChecked autoComplete="off"  />
              Student
            </label>
            <label className="btn btn-secondary" onClick={() => { console.log(this.state); this.setState({ role: 1 }) }} >
              <input type="radio" name="options" id="option3" autoComplete="off"  />
              Instructor
            </label>
          </div>
        </form>

        <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
          <button id="template-editor-submit" ref="submit" type="button" className="btn btn-success" onClick={this.submitBtn}>
            <span className="glyphicon glyphicon-send"></span> Submit
          </button>
        </div>
      </div>
    );
  }
}

export default SignupForm;
