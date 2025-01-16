
const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndpoint ={
    SENDOTP_API: BASE_URL+"/auth/sendotp",
    SIGNUP_API:BASE_URL+"/auth/signup",
    LOGIN_API:BASE_URL+"/auth/login",

    // *************  Reset password flow  *************

    VERIFY_EMAIL_OTP_API:BASE_URL+"/auth/verify-email",
    RESET_PASSWORD_API:BASE_URL+"/auth//reset-password"
}

export const teamEndpoints ={
    CREATE_TEAM_API:BASE_URL+"/team/create-team",
    ADD_MEMBER_API:BASE_URL+"/team/add-member",
    GET_ALL_TEAM_DATA:BASE_URL+"/team/get-all-team-data"
}


//get_all_task_data_api
export const taskEndpoint={
    CREATE_TASK_API:BASE_URL+"/task/create-task",
    GET_ALL_TASK_DATA_API:BASE_URL+"/task/get-all-task-data",

    // my-tasks api
    GET_ALL_MY_TASK_API:BASE_URL+"/task/get-all-my-task-data",
    CREATE_MY_TASK_API:BASE_URL+"/task/create-my-task",
    GET_MY_TASK_DETAIL_API:BASE_URL+"/task/get-my-task-detail"
}

export const todoEndpoint ={
    CREATE_TODO_API:BASE_URL+"/todo/create-todo",
    MARK_TODO_COMPLETE_API: BASE_URL+"/todo/mark-complete-todo",
    DELETE_TODO_API: BASE_URL +"/todo/delete-todo",
    EDIT_TODO_API: BASE_URL +"/todo/edit-todo"

    // my-tasks api

}

// *******Profile api*********

export const profileEndpoint ={
    UPDATE_PROFILE_API:BASE_URL+"/profile/update-profile",
    CHANGE_PASSWORD_API:BASE_URL+"/profile/change-password"
}