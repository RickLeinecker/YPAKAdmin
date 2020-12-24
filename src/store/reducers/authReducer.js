import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_RESTORE,
	AUTH_FLUSH,
} from '../actions/types/authTypes';

const initState = {
	auth: undefined,
	auth_loading: undefined,
	auth_error: undefined,
}

const authReducer = (state = initState, action) => {

	switch (action.type) {
		case AUTH_LOGIN_FAILURE: return { ...initState, auth_error: action.error };
		case AUTH_LOGIN_REQUEST: return { ...initState, auth_loading: true };
		case AUTH_LOGIN_SUCCESS:
		case AUTH_RESTORE:
			return { ...initState, auth: action.auth }

		case AUTH_LOGOUT_REQUEST: console.log("LOGOUT Request is WIP..."); return state;
		case AUTH_LOGOUT_SUCCESS:
		case AUTH_FLUSH:
			return { ...initState }

		default: return state;
	}
}

export default authReducer;