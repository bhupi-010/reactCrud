import axios from "axios";
import * as actionTypes from "./actionType";

const getUsers = (users) => ({
  type: actionTypes.Get_User,
  payload: users,
});

export const getLocation = (place, period, idNo) => {
  return {
    type: "GET_LOCATION",

    payload: {
      id: idNo,
      place: place,
      period: period,
    },
  };
};

const loadUsers = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API}`).then((res) => {
      dispatch(getUsers(res.data));
    });
    // .catch((err) => console.log(err));
  };
};

export default loadUsers;
