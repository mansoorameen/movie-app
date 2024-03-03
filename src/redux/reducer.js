import {SELECTED_MOVIE} from './action';

const initialState = {
  selectedMovie: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
