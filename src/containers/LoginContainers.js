import { connect } from 'react-redux'
import { LoginFormWithRouter } from '../components/ui/login-form'

import C from '../redux/constants'

export const LoginFormContainer = connect( 
    null,
    dispatch =>
    ({
        async onSignIn({user, password, host, port}) {
            dispatch({
                type: C.SIGN_IN,
                user,
                password, 
                host, 
                port
            })
            
        },
        async onSignUp(user, password) {
            dispatch({
                type: C.SIGN_UP,
                user,
                password
            })
            
        }
    })
)(LoginFormWithRouter)

