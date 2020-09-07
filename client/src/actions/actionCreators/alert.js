import * as actionTypes from '../constants';
import { v4 as uuidv4 } from 'uuid';


export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch(
        {
            type: actionTypes.SET_ALERT,
            payload: {
                msg,
                alertType,
                id
            }
        }
    )

    setTimeout(()=>dispatch(
        {
            type: actionTypes.REMOVE_ALERT,
            payload: {
                id
            }
        }
    ), 5000);
} 