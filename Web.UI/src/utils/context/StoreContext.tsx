import React from "react"
import { UsersIS, usersReducer } from "./reducers/admin";
import { authIS, authReducer } from "./reducers/auth";
import { FriendsIS, friendsReducer } from "./reducers/friends";
import loaderReducer, { loaderIS } from "./reducers/loading";
import { myUserReducer, userIS } from "./reducers/user";
import { myUsersIS, userReducer } from "./reducers/users";

const initialState = {
    loader: loaderIS,
    user: myUsersIS,
    users: UsersIS,
    friends: FriendsIS,
    auth: authIS,
    myUser: userIS,
}

const StoreContext = React.createContext({
    state: initialState,
    dispatch: ({ }) => { }
})

const combinedReducer = (reducerDict: { [key: string]: any }) => {
    return function (state: any = {}, action: any) {
        return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
            let slice = reducerDict[curr](state[curr], action);
            return { ...stateGlobal, [curr]: slice };
        }, state);
    };
}

const reducer = combinedReducer({
    loader: loaderReducer,
    user: userReducer,
    users: usersReducer,
    friends: friendsReducer,
    auth: authReducer,
    myUser: myUserReducer,
})

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

const useStoreContext = () => {
    return React.useContext(StoreContext)
}

export { useStoreContext }
