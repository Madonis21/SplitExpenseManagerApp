import { combineReducers } from 'redux';
import initialState from '../Data/UserInfo'

const sumValue = (state, action) => {
    function sumObjectsByKey(...objs) {
        return objs.reduce((a, b) => {
            let c = {}
            for (let k in b) {
                if (b.hasOwnProperty(k))
                    c[k] = (a[k] || 0) + b[k];
            }
            return c;
        }, {});
    }
    let array = []
    for (let i = 0; i < action.payload.length; i++) {
        array.push(sumObjectsByKey(state.loggedInUser.splitList.toGet[i], action.payload[i]))
    }

    return array
}
const setPayRecord = (userObj, action) => {
    let copyArray
    copyArray = userObj.splitList.toPay.map(el => {

        if (Object.keys(el)[0] !== userObj.userName) {
            return {
                [Object.keys(el)[0]]: action.payload.toPay.hasOwnProperty([Object.keys(el)[0]]) ?
                    action.payload.toPay[Object.keys(el)[0]] : 0 + Object.values(el)[0]
            }
        }
        return el
    })


    return copyArray

}
const initializeStore = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return { ...state, loggedInUser: action.payload }

        case 'LOGOUT':
            return { ...state, loggedInUser: null }

        case 'INSERT_EXPENSE':
            let index = state.users.findIndex(i => i.userName === state.loggedInUser.userName)
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,

                    expenseList: [...state.loggedInUser.expenseList, action.payload]

                },
                users: [
                    ...state.users.slice(0, index),
                    {
                        ...state.users[index],

                        expenseList: [...state.users[index].expenseList, action.payload]

                    },
                    ...state.users.slice(index + 1)
                ]
            }
        case 'UPDATE_SPLIT_INFO_BORROWER':
            let index1 = state.users.findIndex(i => i.userName === action.payload.userName[0])

            return {
                ...state,
                users: [
                    ...state.users.slice(0, index1),

                    {
                        ...state.users[index1],

                        splitList: {
                            ...state.users[index1].splitList,
                            toPay: setPayRecord(state.users[index1], action)
                        }
                    },
                    ...state.users.slice(index1 + 1)
                ]
            }

        case 'UPDATE_SPLIT_INFO_PAYER':
            let index2 = state.users.findIndex(i => i.userName === state.loggedInUser.userName)
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,

                    splitList: {
                        ...state.loggedInUser.splitList,
                        toGet: sumValue(state, action)
                    }
                },
                users: [
                    ...state.users.slice(0, index2),
                    {
                        ...state.users[index2],

                        splitList: {
                            ...state.users[index2].splitList,
                            toGet: sumValue(state, action)

                        }
                    },
                    ...state.users.slice(index2 + 1)
                ]
            }
        default: return state;
    }
}


export default combineReducers({ appUtilities: initializeStore })
