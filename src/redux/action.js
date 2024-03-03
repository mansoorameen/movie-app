export const SELECTED_MOVIE = 'SELECTED_MOVIE';

export const saveMovieDetails = data => {
  return {
    type: SELECTED_MOVIE,
    payload: data,
  };
};
