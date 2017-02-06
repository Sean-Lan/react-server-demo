export const START_CHANGE_COLOR = 'BODY/CHANGE_COLOR';
export const RECEIVE_NEW_COLOR = 'BODY/RECEIVE_NEW_COLOR';

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
  const {isUpdating} = getState().body;
  if (isUpdating) return;
  dispatch(changeColor());
  fetch('http://localhost:3000/api/color?part=body')
    .then(response => response.json())
    .then(({
      color
    }) => {
      dispatch(receiveColor(color));
    });
};
