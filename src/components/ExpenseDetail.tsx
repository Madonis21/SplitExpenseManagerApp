import * as React from 'react';
import { connect } from 'react-redux';
import { LogOutUser, InsertExpense, UpdateSplitInfoForBorrower, UpdateSplitInfoForPayer } from '../ActionCreator/loginActionCreator'

let totalAmount: any = 0;
let splitArray: any = [];
let sum: any = 0;
let paySum: any = 0;
let Paykeys: any;
let Payvalues: any
let Getvalues: any;
let Getkeys: any
class ExpenseDetail extends React.Component<any, any> {

    state = {
        showForm: true,
        expName: "",
        expAmt: "",
        time: "",
        totalAmount: 0,
        checked: false,
        splitArray: [],
        showButton: false
    }
    componentDidMount() {
        this.totalAmountSpent();
    }
    render() {
        const { user,userExpenses} = this.props;

        return (
            <div>
                Hi {user.userName} !! You are logged in
                <button style={{float:'right'}} onClick={() => this.props.logOutUser()}>Logout</button>
                {this.state.showForm ?
                    <div>
                        <h3>My Expenses</h3>
                        <button style={{float:'right'}} onClick={() => this.setState({ showForm: false, showButton: false })}>Add Expenses</button>
                        <table>
                            <thead><tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                            </thead>
                            <tbody>
                                {userExpenses.loggedInUser.expenseList && userExpenses.loggedInUser.expenseList.map((el: any, index: number) => {
                                    return <tr key={index}>
                                        <td>{el.expName}</td>
                                        <td>{el.expAmt}</td>
                                        <td>{el.time}</td>
                                    </tr>

                                })}
                            </tbody>

                        </table>
                        <label> Total Amount Spent: {totalAmount}</label>
                        <br />
                        <button onClick={() => this.computeTotal()}>Check Balance With Friends</button>
                        {this.state.showButton ?
                            <div> You Will Get : {sum}<br />
                                {userExpenses.loggedInUser.splitList.toGet.map((i: any, index: number) => {
                                    return (
                                        <p key={index}>Get Rs {Getvalues[index]} from {Getkeys[index]} </p>)
                                })}

                                You have to Pay: {paySum}
                                {userExpenses.loggedInUser.splitList.toPay.map((i: any, index: number) => {
                                    return (
                                        <p key={index}>Pay {Paykeys[index]} Rs {Payvalues[index]}</p>)
                                     }
                                )
                                }
                            </div>
                            : null}
                    </div> :
                    <div>
                        <h3>Add Expenses</h3>
                        <form onSubmit={(event) => this.submitData(event, this.state)}>
                            <label>Expense Name</label>
                            <input value={this.state.expName} onChange={this.handleChange('expName')} type="text" name="expName" /><br />
                            <label>Expense Amount</label>
                            <input type="number" value={this.state.expAmt} onChange={this.handleChange('expAmt')} name="expAmt" /><br />
                            <label>Expense Time</label>
                            <input type="text" disabled defaultValue={new Date().toJSON().slice(0, 10).replace(/-/g, '/')} /><br />
                            <input value='null' onClick={(e: any) => this.checkboxClicked(e)} type="checkbox" />Do You Wish to split?{<br />}
                            {this.state.checked ?
                                <div>
                                    Split Equally Amongst?
                    {this.getAllUserNames().map((user: any, index: number) => {
                                        return (
                                            <div key={index}>
                                                <label >{user.userName}</label>
                                                <input value={user.userName} onClick={(e: any) => this.checkboxClicked(e)} type="checkbox" />
                                            </div>
                                        )
                                    })}

                                </div>

                                : null}

                            <input type="submit" value="Submit" />
                        </form>

                    </div>}
            </div>

        )

    }

    computeTotal() {
        sum = 0; paySum = 0;
        Paykeys = []; Payvalues = [];
        Getkeys = []; Getvalues = [];

        this.setState({ showButton: true })
        this.props.userExpenses.loggedInUser.splitList.toGet.forEach((obj: any) => {
            sum = sum + Object.values(obj)[0]
            Getkeys.push(Object.keys(obj)[0])
            Getvalues.push(Object.values(obj)[0])

        })


        for (let i = 0; i < this.props.userExpenses.loggedInUser.splitList.toPay.length; i++) {
            paySum = paySum + Object.values(this.props.userExpenses.loggedInUser.splitList.toPay[i])[0]

            Paykeys.push(Object.keys(this.props.userExpenses.loggedInUser.splitList.toPay[i]))
            Payvalues.push(Object.values(this.props.userExpenses.loggedInUser.splitList.toPay[i]))

        }



    }
    getAllUserNames() {
        let availableUserList = this.props.userExpenses.users.filter((user: any) =>
            user.userName !== this.props.userExpenses.loggedInUser.userName
        )

        return availableUserList

    }
    checkboxClicked(e: any) {
        if (e.target.value !== 'null') {
            if (e.target.checked) {
                splitArray.push({ user: e.target.value, toPay: 0 })
            }
            else {
                splitArray = splitArray.filter((i: any) => {
                    if (i.user === e.target.value) {
                        return splitArray.indexOf(i) === -1
                    }
                    return true
                })
            }
        }
        else {
            splitArray = []
            this.setState({ checked: e.target.checked })
        }

    }


    totalAmountSpent() {
        totalAmount = 0
        this.props.userExpenses.loggedInUser.expenseList.forEach((element: any) => {
            totalAmount = parseInt(totalAmount) + parseInt(element.expAmt)
        })
        this.setState({ totalAmount: totalAmount })

    }
    handleChange = (name: any) => (event: any) => {
        this.setState({
            [name]: event.target.value
        })
    }

    submitData(event: any, stateData: any) {
        event.preventDefault();
        let obj = { expName: stateData.expName, expAmt: stateData.expAmt, time: new Date().toJSON().slice(0, 10).replace(/-/g, '/') }
        this.props.InsertExpense(obj)
        setTimeout(() => {
            this.totalAmountSpent()
        }, 200);
        let GetInfoForLoggedInUser: any = []


        for (var i = 0; i < splitArray.length; i++) {
            GetInfoForLoggedInUser.push({
                [splitArray[i].user]: (stateData.expAmt / (splitArray.length + 1))
            })

            this.props.UpdateSplitInfoForBorrower({
                'userName': [splitArray[i].user],
                'toPay': {
                    [this.props.user.userName]: (stateData.expAmt / (splitArray.length + 1))
                }
            })

        }

        this.props.UpdateSplitInfoForPayer(GetInfoForLoggedInUser)




        this.setState({ showForm: true, checked: false })
    }


}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logOutUser: () => dispatch(LogOutUser()),
        InsertExpense: (obj: any) => dispatch(InsertExpense(obj)),
        UpdateSplitInfoForBorrower: (obj: any) => dispatch(UpdateSplitInfoForBorrower(obj)),
        UpdateSplitInfoForPayer: (arr: any) => dispatch(UpdateSplitInfoForPayer(arr))
    }

}

const mapStateToProps = (state: any) => {
    return {
        userExpenses: state.appUtilities
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetail)

