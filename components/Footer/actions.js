export const START_CHANGE_COLOR = 'FOOTER/CHANGE_COLOR';
export const RECEIVE_NEW_COLOR = 'FOOTER/RECEIVE_NEW_COLOR';

export const changeColor = () => ({
  type: START_CHANGE_COLOR
});

export const receiveColor = (color) => ({
  type: RECEIVE_NEW_COLOR,
  payload: {
    color
  }
});

export const fetchColor = () => (dispatch, getState) => {
  const {isUpdating} = getState().footer;
  if (isUpdating) return;
  dispatch(changeColor());
  fetch('http://localhost:3000/api/color?part=footer')
    .then(response => response.json())
    .then(({
      color
    }) => {
      dispatch(receiveColor(color));
    });
};
