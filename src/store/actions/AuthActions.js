import {
    login,
    runLogoutTimer,
    saveTokenInLocalStorage
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function logout(navigate) {
    localStorage.removeItem('userDetails');
    navigate('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    return (dispatch) => {
        login(email, password)
            .then((response) => {
                if(response.data.user.role === 'Admin' || response.data.user.role === 'SubAdmin') {
                    saveTokenInLocalStorage({
                        kind: "identitytoolkit#SignupNewUserResponse",
                        idToken: response.data.token,
                        email: response.data.user.email,
                        refreshToken: response.data.token,
                        expiresIn: response.data.expiresIn,
                        localId: response.data.user._id,
                        user: response.data.user
                    });
                    runLogoutTimer(
                        dispatch,
                        response.data.expiresIn * 1000,
                        navigate,
                    );
                    dispatch(loginConfirmedAction(response.data));
                    window.location.href = '/dashboard';
                }else {
                    dispatch(loginFailedAction('Not authenticated'));
                }
            })
            .catch((error) => {
                let errorMessage = error.message;
                if (error.response) {
                    errorMessage = error.response.data.message;
                }
                dispatch(loginFailedAction(errorMessage));
            });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
