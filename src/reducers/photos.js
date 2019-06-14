import {
	PHOTOS_FETCH_REQUEST,
	PHOTOS_FETCH_SUCCESS,
	PHOTOS_FETCH_FAILURE,
	RELATED_PHOTOS_FETCH_REQUEST,
	RELATED_PHOTOS_FETCH_SUCCESS,
	RELATED_PHOTOS_FETCH_FAILURE,
	PHOTOS_SEARCH_SUCCESS
} from "../actions/photos";

const photosReducer = (state = {}, action) => {
	switch (action.type) {
		case PHOTOS_FETCH_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case PHOTOS_FETCH_SUCCESS:
			return {
				...state,
				isFetching: false,
				photos:
					action.params.page == 1
						? action.response.data
						: [...(state.photos || []), ...action.response.data],
				moreData: action.response.data.length >= 10
			};
		case PHOTOS_FETCH_FAILURE:
			return {
				...state,
				isFetching: false
			};
		case RELATED_PHOTOS_FETCH_REQUEST:
			return {
				...state
			};
		case RELATED_PHOTOS_FETCH_SUCCESS:
			return {
				...state,
				relatedPhotos: action.response.data
			};
		case RELATED_PHOTOS_FETCH_FAILURE:
			return {
				...state
			};
		case PHOTOS_SEARCH_SUCCESS:
			return {
				...state,
				isFetching: false,
				photos: action.params.page == 1
					? action.response.data
					: [...(state.photos || []), ...action.response.data],
				moreData: action.response.data.length >= 10
			};
		default:
			return state;
	}
};

export default photosReducer;
