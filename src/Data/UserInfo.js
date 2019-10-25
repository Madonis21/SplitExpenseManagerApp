let usersInfo =
(function getUserInfo(){
    return  {
        loggedInUser:null,
        users:[
        {userName:"A",
        userPwd:"A",
        expenseList:
            [{expName:'Tea',expAmt:10,time:'2019/10/22'},
            {expName:'Coffee',expAmt:20,time:'2019/10/22'},
            {expName:'Juice',expAmt:30,time:'2019/10/22'}]
        ,
        splitList:{
            toPay:[{B: 0},{C:0}],
            toGet:[{B: 0},{C:0}]
        }
    },
        {userName:"B",userPwd:"B",expenseList:[],splitList:{toPay:[{A: 0},{C:0}],toGet:[{A: 0},{C:0}]}},

        {userName:"C",userPwd:"C",expenseList:[],splitList:{toPay:[{A: 0},{B:0}],toGet:[{A: 0},{B:0}]}},
        ]}
})()

export default usersInfo