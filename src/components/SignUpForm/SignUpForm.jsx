import React, { Component } from "react";
import { signUp } from "../../utilities/UserRequests/users-service";
import "./SignUpForm.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Input, Button, Link } from "@mui/material";
import { Container } from "@mui/system";

export class SignUpForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...this.state, profilePicture: "", about: "" };
      delete formData.error;
      delete formData.confirm;

      const user = await signUp(formData);
      this.props.setUser(user);
    } catch (error) {
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };
  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <Container
        sx={{
          display: "flex",
          height: "100vh",
          width: "60vw",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={this.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 className="logo">chatter[box]</h1>
          <h3> Welcome! Create an account to start chatting! </h3>
          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="firstname"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="First Name"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="lastname"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Last Name"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />

          <Input
            className="outlined-basic"
            variant="outlined"
            type="password"
            name="confirm"
            value={this.state.confirm}
            onChange={this.handleChange}
            placeholder="Confirm Password"
            margin="normal"
            fullWidth
            required
            autoFocus
            disableUnderline
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "30px" }}
            disabled={disable}
            autoFocus
          >
            START CHATTING
          </Button>
          <Link
            variant="contained"
            onClick={() => this.props.setShowSignUp(!this.props.showSignUp)}
          >
            {this.props.showSignUp
              ? "Already have an account? Log In!"
              : "Don't have an account? Sign Up!"}
          </Link>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </Box>
      </Container>
    );
  }
}

export default SignUpForm;
