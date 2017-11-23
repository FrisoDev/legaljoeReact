import API from '../../api/client'
import axios from 'axios'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'


export const UPLOAD_FILE = 'UPLOAD_FILE'

const api = new API()

export default (formData) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    console.log(formData)


  axios.post("https://api.cloudinary.com/v1_1/ernesto/raw/upload", formData, {headers: { "X-Requested-With": "XMLHttpRequest" },})
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
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
