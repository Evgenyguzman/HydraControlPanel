import C from './constants'
import HydraService from '../services/HydraService'

export function updateAllThings(things) {
  return (dispatch, getState) => {
    try {
      dispatch({
        type: C.UPDATE_ALL_THINGS,
        things
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export function changeValue({thingId, itemId, value}) {
  try {
    HydraService.getInstance().changeValue(thingId, itemId, value)
  } catch (error) {
    console.error(error)
  }  
}

export function runMethod({thingId, methodId, parameters}) {
  try {
    HydraService.getInstance().runMethod(thingId, methodId, parameters)
  } catch (error) {
    console.error(error)
  }
}
