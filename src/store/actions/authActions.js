import firebase from '../firebase';
import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_RESTORE,
	AUTH_FLUSH,
} from './types/authTypes'

export const authRestore = (auth) => ({ type: AUTH_RESTORE, auth });
export const authFlush = () => ({ type: AUTH_FLUSH });

const authLoginRequest = () => ({ type: AUTH_LOGIN_REQUEST });
const authLoginSuccess = auth => ({ type: AUTH_LOGIN_SUCCESS, auth });
const authLoginFailure = error => ({ type: AUTH_LOGIN_FAILURE, error });
export const authLogin = (email, password) => {
	return (dispatch) => {
		dispatch(authLoginRequest());
		try {
			firebase.auth()
				.signInWithEmailAndPassword(email, password)
				.then(auth => dispatch(authLoginSuccess(auth)))
				.catch(err => { dispatch(authLoginFailure(err)) });
		}
		catch (err) {
			console.log("Try-catch", err)
			dispatch(authLoginFailure(err));
		}
	}
}

const authLogoutRequest = () => ({ type: AUTH_LOGOUT_REQUEST });
const authLogoutSuccess = () => ({ type: AUTH_LOGOUT_SUCCESS });
export const authLogout = () => {
	return (dispatch) => {
		dispatch(authLoginRequest());
		firebase.auth().signOut()
			.then(() => {
				dispatch(authLogoutSuccess());
			})
			.catch(err => {
				// TODO : handle logout errors?
				console.log("Logout error", err);
				dispatch(authLogoutSuccess()); // For now.
			})
	}
}