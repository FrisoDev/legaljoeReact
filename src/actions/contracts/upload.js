import API from '../../api/client'
import updateContract from './update'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const UPLOAD_CONTRACT = 'UPLOAD_CONTRACT'
const api = new API()

export default (formData) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.post('/upload', { attach : formData })
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch(updateContract(result))
    })

    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
