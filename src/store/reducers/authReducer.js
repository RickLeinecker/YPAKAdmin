import {
	AUTH_LOGIN_REQUEST,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT_REQUEST,
	AUTH_LOGOUT_SUCCESS,
	AUTH_FLUSH,
	AUTH_RESTORE_SUCCESS,
	AUTH_RESTORE_FAILURE,
	AUTH_RESTORE_REQUEST,
} from '../actions/types/authTypes';

const initState = {
	auth: undefined,
	auth_loading: undefined,
	auth_error: undefined,
	auth_loaded: undefined,
}

const authReducer = (state = initState, action) => {

	switch (action.type) {
		case AUTH_LOGIN_FAILURE:
		case AUTH_RESTORE_FAILURE:
			return { ...initState, auth_error: action.error };
			
		case AUTH_LOGIN_REQUEST:
		case AUTH_RESTORE_REQUEST:
			return { ...initState, auth_loading: true };

		case AUTH_LOGIN_SUCCESS:
			return { ...initState, auth: action.auth }

		case AUTH_RESTORE_SUCCESS:
			return { ...initState, auth: action.auth, auth_loaded: true }

		case AUTH_LOGOUT_REQUEST: console.log("LOGOUT Request is WIP..."); return state;
		case AUTH_LOGOUT_SUCCESS:
		case AUTH_FLUSH:
			return { ...initState, auth_error: state.auth_error }

		default: return state;
	}
}

export default authReducer;