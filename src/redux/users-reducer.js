import { DispatchConst } from './store'

const initialState = {
  users: [
    {
      "id": 1,
      "nickname": "user123",
      "status": "Online",
      "country": "USA",
      "city": "New York",
      "follow": true
    },
    {
      "id": 2,
      "nickname": "cool_guy",
      "status": "Offline",
      "country": "Canada",
      "city": "Toronto",
      "follow": false
    },
    {
      "id": 3,
      "nickname": "coder2023",
      "status": "Busy",
      "country": "Germany",
      "city": "Berlin",
      "follow": true
    },
    {
      "id": 4,
      "nickname": "traveler",
      "status": "Away",
      "country": "France",
      "city": "Paris",
      "follow": false
    },
    {
      "id": 5,
      "nickname": "gamerX",
      "status": "Online",
      "country": "Japan",
      "city": "Tokyo",
      "follow": true
    }]
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DispatchConst.SET_FOLLOW_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.idOfUser
            ? {
              ...user,
              follow: action.newFollow
            }
            : user
        )
      }

    default:
      return state
  }
}

export const setFollowActionCreator = (newFollow, idOfUser) =>
  ({ type: DispatchConst.SET_FOLLOW_USER, newFollow, idOfUser })


export default usersReducer