import React from "react"
import loaderReducer, { loaderIS } from "./reducers/loading";

const initialState = {
    loader: loaderIS,
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
