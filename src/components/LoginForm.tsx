import * as React from 'react';
import {connect} from 'react-redux';
import { setLoginUser } from '../ActionCreator/loginActionCreator'

class LoginForm extends React.Component<any,any> {

    constructor(props:any){
    super(props);
    this.validateUser = this.validateUser.bind(this);
    }

    state = {
        userName: "",
        userPwd: "",
        enableLogin:true
    }
    render() {
        return(
        <form onSubmit={this.validateUser}>
            <label>Please login from one of the below credentials</label>
            <br/>
            <br/>
            <label>Username: A pwd: A; Username: B pwd: B; Username: C pwd: C;</label>
            <br/>
            <br/>
            <label>User Name</label>
            <input value={this.state.userName} onChange={this.handleChange('userName')} type="text" name="userName" /><br /><br/>
            <label>User Pswrd</label>
            <input type="password" value={this.state.userPwd} onChange={this.handleChange('userPwd')}name="userPwd" /><br /><br />
            <input  type="submit" value="Submit" />
        </form>               
        )
    }

    validateUser=(event:any)=> {
        event.preventDefault();
        let userIndex = this.props.usersInfo.users.findIndex((i:any)=> i.userName === this.state.userName)
       if(userIndex !== -1){
        this.props.usersInfo.users[userIndex].userPwd === this.state.userPwd ? 
        this.props.setLogInUser(this.props.usersInfo.users[userIndex]) : console.log('  ')
       }
        
    } 
    handleChange= (name:any) => (event:any) => {
        this.setState({
            [name]: event.target.value
        })
      }

}
const mapStateToProps=(state:any)=>{
    return    {
        usersInfo: state.appUtilities
    }

}
const mapDispatchToProps = (dispatch: any) => {
    return {
        setLogInUser: (user:any) => dispatch(setLoginUser(user)),
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)


