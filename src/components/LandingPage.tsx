
import * as React from 'react';
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import ExpenseDetail from './ExpenseDetail'

class LandingPage extends React.Component<any,any> {

    render() {
        const { usersInfo} = this.props;

        return (
            <div>
                {usersInfo.loggedInUser === null ?  <LoginForm/> : 
                <div><ExpenseDetail user={usersInfo.loggedInUser}/>
                </div>}


            </div>
        )
    }
}
const mapStateToProps=(state:any)=>{
    return    {
        usersInfo: state.appUtilities
    }

}


export default connect(mapStateToProps)(LandingPage)

