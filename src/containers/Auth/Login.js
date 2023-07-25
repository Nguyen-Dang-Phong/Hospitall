import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: 'phongcoc',
            Password: '11111',
            isCheckPassword: false,
            errorMessage: ''
        }
    }
    handleOnChangeInputUseername = (event) => {
        this.setState({
            Username: event.target.value
        })
    }
    handleOnChangeInputPassword = (event) => {
        this.setState({
            Password: event.target.value
        })
    }
    handleClickButton = async () => {
        console.log('Username: ', this.state.Username, ' Password: ', this.state.Password)
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.Username, this.state.Password)

            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.messange
                })

            }
            if (data && data.errCode === 0) {
                // dùng reduc để lưu thông tin user
                this.props.userLoginSuccess(data.user)
                console.log('login succes')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleClickEye = () => {
        this.setState({
            isCheckPassword: !this.state.isCheckPassword
        })
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username' value={this.state.Username} onChange={(even) => this.handleOnChangeInputUseername(even)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isCheckPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password' value={this.state.Password} onChange={(even) => this.handleOnChangeInputPassword(even)}></input>
                                <i className={this.state.isCheckPassword ? "fas fa-eye" : 'fas fa-eye-slash'} onClick={() => this.handleClickEye()}></i>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>{this.state.errorMessage}</div>
                        <div className='col-12 '>
                            <button className='col-12 login-botton' onClick={() => this.handleClickButton()}>Login</button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span>Forgot your password? </span>
                        </div>
                        <div className='col-12 text-center or-login mt-5'>
                            <span >Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="icon-google fab fa-google-plus-g"></i>
                            <i className="icon-facebook fab fa-facebook-f"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
