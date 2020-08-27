import React, { Component } from "react";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      formData: {
        firstName: "",
        lastName: "",
      },
    };
  }

  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
  };

  resetForm = (event) => {
    this.setState({
      submitted: false,
      formData: {
        firstName: "",
        lastName: "",
      },
    });
  };

  render() {
    if (this.state.submitted) {
      return (
        <div className="Contact">
          <h1>
            Thank you, {this.state.formData.firstName} , for submitting! We'll
            be in touch soon.
          </h1>
          <button type="reset" onClick={this.resetForm}>
            Reset Form
          </button>
        </div>
      );
    }
    return (
      <div className="Contact">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.formData.firstName}
              onChange={this.handleChange}
              minLength={1}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.formData.lastName}
              onChange={this.handleChange}
              minLength={1}
              required
            />
          </div>
          <button>Submit Form</button>
        </form>

        <details open>
          <summary>User Supplied</summary>
          <strong>First Name:</strong>
          {this.state.formData.firstName}
          <br />
          <strong>Last Name:</strong>
          {this.state.formData.lastName}
        </details>
      </div>
    );
  }
}

export default Contact;
