import {
	LIKE_REQUEST,
	LIKE_SUCCESS,
	LIKE_FAILURE,
	DISLIKE_REQUEST,
	DISLIKE_SUCCESS,
	DISLIKE_FAILURE,
	TOGGLE_REFRESH
} from "../actions/likes";

const likesReducer = (state = {}, action) => {
	switch (action.type) {
		case LIKE_REQUEST:
			return {
				...state,
				refresh: false,
				error: false
			};
		case LIKE_SUCCESS:
			return {
				...state,
				refresh: true
			};
		case LIKE_FAILURE:
			return {
				...state,
				error: true
			};
		case DISLIKE_REQUEST:
			return {
				...state,
				refresh: false,
				error: false
			};
		case DISLIKE_SUCCESS:
			return {
				...state,
				refresh: true
			};
		case DISLIKE_FAILURE:
			return {
				...state,
				error: true
			};
		case TOGGLE_REFRESH:
			return {
				...state,
				refresh: false
			};
		default:
			return state;
	}
};

export default likesReducer;
