import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
const userApi = "http://localhost:3000/api/v1/user/"

export const authApi = createApi({
  reducerPath:"authApi",
  baseQuery:fetchBaseQuery({
    baseUrl:userApi,
    credentials:'include'
  }),
  endpoints: (builder) => ({
    regUser: builder.mutation({
      query: (formData) => ({
        url: "register",
        method:"POST",
        body:formData
      })
    }),
    loginUser: builder.mutation({
      query: (formData) => ({
        url: "login",
        method:"POST",
        body:formData
      }),
      async onQueryStarted(arg,{queryFulfilled,dispatch}) {
        try{
          const result= await queryFulfilled;
          dispatch(userLoggedIn({user:result.data.user})); 
        }catch(error){
          console.log(error);
        }
      }
    }),
    logoutUser:builder.mutation({
      query: ()=> ({
        url:"logout",
        method:"GET"
      }),
      async onQueryStarted(_,{queryFulfilled,dispatch}) {
        try{
          dispatch(userLoggedOut()); 
        }catch(error){
          console.log(error);
        }
      }
    }),
    loadUser: builder.query({
      query: () =>({
        url:"profile",
        method:"GET"
      }),
      async onQueryStarted(_,{queryFulfilled,dispatch}) {
        try{
          const result= await queryFulfilled;
          dispatch(userLoggedIn({user:result.data.user})); 
        }catch(error){
          console.log(error);
        }
      }
    }),
    updateUser: builder.mutation({
      query:(formData) =>({
        url:"profile/update",
        method:"PUT",
        body:formData,
        credentials:"include"
      })
    })
  })
});

export const { useRegUserMutation,useLoginUserMutation,useLogoutUserMutation,useLoadUserQuery,useUpdateUserMutation} = authApi;