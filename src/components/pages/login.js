import React, { Component } from 'react'
import PageTemplate from './pageTemplate'

import { LoginFormContainer } from '../../containers/LoginContainers'

class Login extends Component {
    
  render() {

    const {search} = this.props.location
    let warning = ''
    switch (search) {
      case '?error=register':
        warning = <h3>Ошибка регистрации</h3>
        break
      case '?error=login':
        warning = <h3>Ошибка входа</h3>
        break
      default:
        break
    }

    return (
      <PageTemplate>
          <LoginFormContainer message={warning} />
      </PageTemplate>
    )
  }

}

export default Login