import {addPostAC, deletePostAC, profileReducer, setUserProfile} from "./profile-reducer";
import {ProfilePageType} from "./store";
import {ProfileType} from "components/Profile/ProfileContainer";
import {ProfilePropsType} from "components/Profile/Profile";

let initialState: ProfilePageType;
beforeEach(() => {
    initialState = {
        posts: [
            {id: 1, message: 'Hi! How are you', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Bla', likesCount: 11},
            {id: 4, message: 'Da', likesCount: 11}
        ],
        profile: null,
        status: ''
    };
});

test('new post should be added', () => {
    let action = addPostAC('it-camasutra');
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(5);
    expect(newState.posts[4].message).toBe('it-camasutra');
    expect(newState.posts[4].likesCount).toBe(0);
});

test('after deleting a post, the length of posts should be decremented', () => {
    let action = deletePostAC(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
});

test("after deleting a post, the length of posts shouldn't be decremented if the id is incorrect", () => {
    let action = deletePostAC(1000);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(4);
});

