import React from 'react'

import { withRouter } from 'react-router'

import logo from '../../hydra.png'

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.register = this.register.bind(this)
    }
    submit(e) {
        const { _user, _password } = this.refs
        const { _host, _port } = this.refs
        e.preventDefault()
        if(_user.value.length > 0 && _password.value.length > 0){
            this.props.onSignIn({user: _user.value, password: _password.value, host: _host.value, port: _port.value})
            _user.value = ''
            _password.value = ''
            _host.value = ''
            _port.value = ''
            this.props.history.push('/')
        }
    }
    register(e) {
        const { _user2, _password2 } = this.refs
        e.preventDefault()

        if(_user2.value.length > 0 && _password2.value.length > 0){
            this.props.onSignUp(_user2.value, _password2.value)
            _user2.value = ''
            _password2.value = ''

            this.props.history.push('/')
        }

    }
    render() {
        const { message } = this.props
        return (
            <div>
                <div className="login-form">
                    <div>{ message }</div>
                    <form onSubmit={this.submit}>
                        <div className="logo"><img src={logo} alt="hydra-logo"/></div> 
                        <div className="logo-title"><h1>Hydra</h1></div>
                        <input type="text" ref="_user" name="user" id="user" />
                        <input type="password" ref="_password" name="password" id="password" />
                        <input type="text" ref="_host" name="host" id="host" />
                        <input type="text" ref="_port" name="port" id="port" />
                        <button>Войти</button>
                    </form>
                </div>
                <div className="login-form">
                    <form onSubmit={this.register}>
                        <div className="logo"><img src={logo} alt="hydra-logo"/></div> 
                        <div className="logo-title"><h1>Hydra</h1><h3>Registration</h3></div>
                        <input type="text" ref="_user2" name="user2" id="user2" />
                        <input type="password" ref="_password2" name="password2" id="password2" />
                        <button>Регистрация</button>
                    </form>
                </div>
            </div>
        )
    }
}

export const LoginFormWithRouter = withRouter(LoginForm)