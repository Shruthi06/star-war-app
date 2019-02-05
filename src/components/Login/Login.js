import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../../services/api-list'
import { login } from "../../actions/session";
import Loader from '../Loader/Loader'
import axios from 'axios';



class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", loader: false }
       

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

  
    login = () => {
        this.setState({ loader: true })
        api.getUserDetails(this.state).then((resp) => {
            console.log(this.state.username);
            let userdata = resp.data.results[0];
            console.log(userdata)
            console.log(resp.data.results[0])
            if (resp.data.results[0] !== undefined && userdata.name === this.state.username) {
                if (this.state.username === "Luke Skywalker") {
                    userdata["isAdmin"] = true;
                }
                else {
                    userdata["isAdmin"] = false;
                }
                if (resp.data.results[0] !== undefined) {
                    localStorage.setItem("userTokenData", resp.data.results[0]);
                    this.setState({ loader: false })
                    this.props.login(userdata)
                }
                else {
                    this.setState({ loader: false })
                    this.props.login(null)
                }
            }
            else {
                console.log("not GET DATA")
                console.log(userdata)
                this.setState({ loader: false })
                this.props.login(null)
            }


        })
    }
    render() {
        const { user, message } = this.props;
        let login = ((this.state.username == "") || (this.state.password == "")) ? true : false;
        if (user) {
            return <Redirect to="/" />
        }
        return (

            <div className="container-fluid flex-center login">
                {
                    this.state.loader ? <Loader /> : (


                        <div className="row">
                            <div className="col col-md-8">
                                <img src="https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200"height="100%" width="100%"/>
                            </div>
                            <div className="col col-md-4">
                                <div className="box" style={{marginTop:"40%"}}>
                                    <img src="https://www.loginbusiness.com/wp-content/uploads/2018/06/login-logo-web-transparent.png" height="60px" width="100%" style={{ margin: "auto" }} />
                                    <div  className="text-center"></div>

                                    <Typography component="div" className="text-center">
                                        <TextField
                                            id="username"
                                            name="username"
                                            label="Username"
                                            fullWidth
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            error={message}
                                            />
                                        <TextField
                                            id="password"
                                            name="password"
                                            label="Password"
                                            fullWidth
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            error={message}
                                            />
                                    </Typography>

                                    <div className="text-center">
                                        <Button style={{ margin: 20 }} variant="outlined" color="primary" onClick={this.login} disabled={login}>Login</Button>
                                        <Button style={{ margin: 20 }} variant="outlined">
                                            Forgot?
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>


                    )
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.session.user,
    message: state.session.message,
});
const mapDispatchToProps = dispatch => ({
    login: (userDetails) => {
        dispatch(login(userDetails));
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);