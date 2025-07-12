export const environment = {
    production:true,
     BASE_URL: 'http://localhost:3000/',
    ADMIN_URL: 'http://localhost:3000/admin/',
    LOGIN_URL: 'http://localhost:3000/login/', 
    TEACHER_URL: 'http://localhost:3000/teachers/', 


    LOGIN:{
        VERIFY_USER:'verifyuser',
        USER_LOGIN:'userlogin'
    },

    ADMIN:{
        // teachers component
        GET_TEACHERS_DATA:'getteachersdata',
        GET_SUBJECT_DATA:'getsubjectsdata',
        UPDATE_TEACHERS_DATA:'updateteachersdata',
        GET_MARKS_DATA:'getmarksdata',
        GET_COMPLEXITY_DATA:'getcomplexitydata',
        GET_SUBJECTS_DATA:'getsubjectsdata',
        ADD_TEACHER:'addteachers',
        DELETE_TEACHER:'deactivateTeacher',

        UPDATE_SUBJECT:'updatesubject',
        DELETE_SUBJECT:'deactivateSubject',
        ADD_SUBJECT:'addsubject',
        UPDATE_MARKS:'updatemarks',
        ADD_MARKS:'addmarks',
        DELETE_MARKS:'deactivatemarks',
        UPDATE_COMPLEXITY:'updatecomplexity',
        DELETE_COMPLEXITY:'deactivatecomplexity',
        ADD_COMPLEXITY:'addcomplexity',

        // our works start from here
        GET_USER_DATA:'getuserData',
        GET_USERS_HIERARCHICAL_DATA:'getusershierarchicaldata',
        GET_LAST_USER_DATA_ACCTOLEVEL:'getlastusersdataacctolevel',
        ADD_USER:'adduser',
        UPDATE_STATUS:'updateStatus',
        EDIT_USER:'edituser',
        CHANGE_PASSWORD:'updatePassword',
        GET_PARENT_USER_DATA_BY_USERID:'getparentuserDatabyuserid',
        DEPOSIT_COINS:'depositcoins',
        ACCOUNT_LOCK:'updateaccountlock',
        BET_LOCK:'updatebetlock',
        GETLEVEL:'getlevelData',
        GETALLUSERSDATA:'getallusersData',
        SAVETRANSACTION:'saveTransaction'

    },

};
