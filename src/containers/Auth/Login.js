import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username'></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input type='text' className='form-control' placeholder='Enter your password'></input>
                        </div>
                        <div className='col-12 '>
                            <button className='col-12 login-botton'>Login</button>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
