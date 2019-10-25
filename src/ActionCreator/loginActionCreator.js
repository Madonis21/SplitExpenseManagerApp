
export const setLoginUser = (user) => {
    return  {
        type:'SET',payload: user
    }
}
export const LogOutUser = () => {
    return  {
        type:'LOGOUT'
    }
}
export const InsertExpense = (obj) => {
    return  {
        type:'INSERT_EXPENSE',
        payload:obj
    }
}

export const UpdateSplitInfoForBorrower = (obj) => {
    return  {
        type:'UPDATE_SPLIT_INFO_BORROWER',
        payload:obj
    }
}

export const UpdateSplitInfoForPayer = (arr) => {
    return  {
        type:'UPDATE_SPLIT_INFO_PAYER',
        payload:arr
    }
}


