const reducer = (state = { content: '', timerID: null }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(state.timerID)
      return { content: action.content, timerID: action.timerID }
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (content, sec) => {

  return async (dispatch) => {
    let timerID
    timerID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, sec * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      content: content,
      timerID: timerID
    })
    
  }
}

export default reducer
