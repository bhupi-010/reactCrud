const initialState = {
  users: [],
  isLoading: true,
  // user: {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Get_User":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "GET_LOCATION":
      const filterUser = state.users.find(
        (user) => parseInt(user.id) === parseInt(action.payload.id)
      );

      console.log(filterUser, "this is filter");
      const editUser = [filterUser]?.map((user) => {
        user.address.map((add) => {
          add.location.map((loc) => {
            loc.place = action.payload.place;
            loc.period = action.payload.period;
            return loc;
          });
          return add;
        });
        return user;
      });
      console.log(editUser, "this is editUser");
      const newData = editUser.find(
        (user) => parseInt(user.id) === parseInt(action.payload.id)
      );
      const newUser = state.users.map((user) =>
        user.id === newData.id ? newData : user
      );
      console.log(newUser, "this is newUser");
      // let newUser = state.users.map((per) =>
      //   parseInt(per.id) === parseInt(action.payload.id)
      //     ? per.address.map((add) => {
      //         add.location.map(() => {
      //           return [
      //             {
      //               place: action.payload.place,
      //               period: action.payload.period,
      //             },
      //           ];
      //         });
      //         return  per;
      //       })
      //     : per
      // );
      // console.log(state.users, "this is User");
      // console.log(newUser, "this is updated ");

      return {
        ...state,
        users: newUser,

        isLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
