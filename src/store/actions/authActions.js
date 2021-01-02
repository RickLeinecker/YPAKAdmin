import firebase from '../firebase';
import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_RESTORE_FAILURE,
	AUTH_RESTORE_SUCCESS,
	AUTH_RESTORE_REQUEST,
	AUTH_FLUSH,
} from './types/authTypes'

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
		dispatch(authLogoutRequest());
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


const authRestoreRequest = () => ({ type: AUTH_RESTORE_REQUEST });
const authRestoreSuccess = (auth) => ({ type: AUTH_RESTORE_SUCCESS, auth });
const authRestorFailure = (error) => ({ type: AUTH_RESTORE_FAILURE, error });
export const authRestore = (auth) => {
	return (dispatch) => {
		// Verify basic auth data (uid)
		if (!auth || !auth.uid)
			return dispatch(authRestorFailure("Invalid user, please log in again."))

		// Loading prompt
		dispatch(authRestoreRequest());

		// Fetch additional auth data
		// firebase.firestore().collection("Users").doc("fail").get()
		firebase.firestore().collection("Users").doc(auth.uid).get()
			.then((doc) => {
				const docData = doc.data();
				
				if (!doc || !doc.exists) 
					throw Error('Invalid user, please log in again.');

				// Append additional auth data
				auth.groupId = docData.belongsTo.id;
				auth.super = docData.super;
				
				// Success
				dispatch(authRestoreSuccess(auth));
			})
			.catch((err) => {
					console.log(err)	
					console.log(err.message)	
					firebase.auth().signOut()
					.finally(() => dispatch(authRestorFailure(err.message)))
				}
			);
	}
}