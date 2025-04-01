// profile-reducer.test.js
import profileReducer, {
  handleProfile,
  handleStatus,
  handlePost,
  handleFetching,
  handleLikesCount,
} from './profile-reducer';
import { DispatchConst } from './store';

// Mock API module
jest.mock('../API/API');

describe('profileReducer', () => {
  const initialState = {
    posts: [],
    profile: null,
    isFetching: false,
    status: null,
  };

  it('should return initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_PROFILE', () => {
    const profileData = { id: 1, name: 'John Doe' };
    const action = handleProfile(profileData);
    const expectedState = {
      ...initialState,
      profile: profileData,
    };

    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_STATUS', () => {
    const status = 'New status';
    const action = handleStatus(status);
    const expectedState = {
      ...initialState,
      status,
    };

    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_POST', () => {
    const newPost = { id: 1, text: 'New post', likes: 0 };
    const action = handlePost(newPost);
    const expectedState = {
      ...initialState,
      posts: [newPost],
    };

    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_LIKE_COUNT', () => {
    const initialStateWithPosts = {
      ...initialState,
      posts: [
        { id: 1, text: 'Post 1', likes: 0 },
        { id: 2, text: 'Post 2', likes: 0 },
      ],
    };

    const action = handleLikesCount(1, 5);
    const expectedState = {
      ...initialStateWithPosts,
      posts: [
        { id: 1, text: 'Post 1', likes: 5 },
        { id: 2, text: 'Post 2', likes: 0 },
      ],
    };

    expect(profileReducer(initialStateWithPosts, action)).toEqual(expectedState);
  });

  it('should handle SET_FETCHING', () => {
    const action = handleFetching(true);
    const expectedState = {
      ...initialState,
      isFetching: true,
    };

    expect(profileReducer(initialState, action)).toEqual(expectedState);
  });
});

describe('action creators', () => {
  it('should create handleProfile action', () => {
    const profile = { id: 1, name: 'Test' };
    const expectedAction = {
      type: DispatchConst.SET_PROFILE,
      profile,
    };

    expect(handleProfile(profile)).toEqual(expectedAction);
  });

  it('should create handleStatus action', () => {
    const status = 'Test status';
    const expectedAction = {
      type: DispatchConst.SET_STATUS,
      status,
    };

    expect(handleStatus(status)).toEqual(expectedAction);
  });

  it('should create handlePost action', () => {
    const newPost = { id: 1, text: 'Test post' };
    const expectedAction = {
      type: DispatchConst.ADD_POST,
      newPost,
    };

    expect(handlePost(newPost)).toEqual(expectedAction);
  });

  it('should create handleLikesCount action', () => {
    const expectedAction = {
      type: DispatchConst.SET_LIKE_COUNT,
      idOfPost: 1,
      newLikesCount: 5,
    };

    expect(handleLikesCount(1, 5)).toEqual(expectedAction);
  });

  it('should create handleFetching action', () => {
    const expectedAction = {
      type: DispatchConst.SET_FETCHING,
      isFetching: true,
    };

    expect(handleFetching(true)).toEqual(expectedAction);
  });
});
