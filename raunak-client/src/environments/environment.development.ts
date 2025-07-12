export const environment = {
    production:false,
    BASE_URL: 'http://localhost:3000/',
    ADMIN_URL: 'http://localhost:3000/admin/',
    LOGIN_URL: 'http://localhost:3000/login/', 
    TEACHER_URL: 'http://localhost:3000/teachers/', 
    SHARED_URL: 'http://localhost:3000/shared/', 


    LOGIN:{
        VERIFY_USER:'verifyuser',
        USER_LOGIN:'userlogin'
    },
    CLIENT:{
        PLACE_BET:'place-bet',
        UPDATE_STAKE:'updateStake'
    },
    ADMIN:{
        GET_USERS_DATA:'getallusersData',
        GET_ACCOUNT_STATEMENT:'getAccountStatement'
    },
   SHARED:{
        GET_STAKE:'getStakes',
   }

};
