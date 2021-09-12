import { ADDEVENT, REMOVEEVENT, CLEANEVENT } from '../types/eventType'

const initialState = {
  event: {}
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDEVENT:
      return {
        event: action.payload
      }

    case REMOVEEVENT:
      // eslint-disable-next-line no-case-declarations
      const numIndex = parseInt(action.payload)
      return {
        event: [
          ...state.event.slice(0, numIndex),
          ...state.event.slice(numIndex + 1)
        ]
      }

    case CLEANEVENT:
      return initialState

    default:
      return state
  }
}

export default eventReducer
