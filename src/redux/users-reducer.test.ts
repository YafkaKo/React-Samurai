import UsersAPI, { ResultCodeEnum, ResultType } from "../API/API";
import usersReducer, {
  actionsUsers,
  followUsersThunkCreator,
  InitialStateType,
} from "./users-reducer";
let state: InitialStateType;
jest.mock("../API/API");
const usersAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>;

const result: ResultType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
};

usersAPIMock.followUsersAPI.mockReturnValue(Promise.resolve(result));

beforeEach(() => {
  state = {
    users: [
      {
        id: 1,
        name: "John Doe",
        status: "Frontend Developer",
        photos: {
          small: "https://example.com/john-doe-small.jpg",
          large: "https://example.com/john-doe-large.jpg",
        },
        followed: false,
      },
      {
        id: 2,
        name: "Jane Smith",
        status: "Backend Developer",
        photos: {
          small: "https://example.com/jane-smith-small.jpg",
          large: "https://example.com/jane-smith-large.jpg",
        },
        followed: true,
      },
      {
        id: 3,
        name: "Alex Johnson",
        status: "UI/UX Designer",
        photos: {
          small: "https://example.com/alex-johnson-small.jpg",
          large: "https://example.com/alex-johnson-large.jpg",
        },
        followed: false,
      },
      {
        id: 4,
        name: "Emily Brown",
        status: "Fullstack Developer",
        photos: {
          small: "https://example.com/emily-brown-small.jpg",
          large: "https://example.com/emily-brown-large.jpg",
        },
        followed: true,
      },
      {
        id: 5,
        name: "Michael Wilson",
        status: "DevOps Engineer",
        photos: {
          small: "https://example.com/michael-wilson-small.jpg",
          large: "https://example.com/michael-wilson-large.jpg",
        },
        followed: false,
      },
      {
        id: 6,
        name: "Sarah Davis",
        status: "Product Manager",
        photos: {
          small: "https://example.com/sarah-davis-small.jpg",
          large: "https://example.com/sarah-davis-large.jpg",
        },
        followed: true,
      },
    ],
    usersPerPage: 6,
    currentPage: 1,
    isFetching: false,
    filter: {
      term: '' ,
      isFriend: false
    },
    FollowingIsProgress: [2, 4], // Массив ID пользователей, у которых в процессе подписка/отписка
    totalCount: 100,
  };
});

test("follow | unfollow success", () => {
  const newState = usersReducer(
    state,
    actionsUsers.handleFollow(!state.users[0].followed, state.users[0].id)
  );

  expect(newState.users[0].followed).not.toBe(state.users[0].followed);
});

test("Follow Thuck Creator", async () => {
  const thunk = followUsersThunkCreator(
    state.users[0].id,
    state.users[0].followed
  );

  const dispatchMock = jest.fn();
  const getStateMock = jest.fn()

  await thunk(dispatchMock,getStateMock,{});

  expect(dispatchMock).toHaveBeenCalledTimes(3);
});
