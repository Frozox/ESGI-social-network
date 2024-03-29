export enum ActionType {
    Open,
    Close,
    YesNo,
    UpdateContent,
    UpdateTitle,
    YesAction,
    NoAction
}

export const modalIS = {
    open: false,
    title: "",
    content: <></>,
    yesAction: () => { },
    noAction: () => { },
    yesNo: false
};

export const modalReducer = (state: any, action: any) => {
    switch (action.type) {
        case ActionType.Open:
            return {
                ...state,
                open: true
            };
        case ActionType.Close:
            return {
                ...state,
                open: false,
                yesNo: false
            };
        case ActionType.YesNo:
            return {
                ...state,
                yesNo: true
            };
        case ActionType.UpdateContent:
            return {
                ...state,
                content: action.content
            };
        case ActionType.UpdateTitle:
            return {
                ...state,
                title: action.title
            };
        case ActionType.YesAction:
            return {
                ...state,
                yesAction: action.action
            };
        case ActionType.NoAction:
            return {
                ...state,
                noAction: action.action
            };
        default:
            return state;
    }
}