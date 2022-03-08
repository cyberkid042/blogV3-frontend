import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userPosts: null,
  responseMessage: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    userPosts(state, { payload }) {
      state.userPosts = payload;
    },

    responseData(state, { payload }) {
      state.responseMessage = payload;
    },
  },
});

export const { userPosts, responseData } = postSlice.actions;

export const fetchUserPosts =
  (username = null) =>
  async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/posts/user-posts?username=${username}`
      );

      dispatch(userPosts(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

export const createPost =
  ({ title = "", body = "", postImage = "", headers = {} }) =>
  async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/posts/create`,
        {
          title,
          body,
          postImage,
        },
        { headers: headers }
      );

      // dispatch(responseData({ response: res?.data, type: "success" }));
    } catch (error) {
      console.log(error);
      // dispatch(responseData({ error: error?.response, type: "error" }));
    }
  };

export const updatePost =
  ({
    userId = null,
    postId = null,
    title = null,
    body = null,
    postImage = null,
    headers = null,
  }) =>
  async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/`,
        {
          title,
          body,
          postImage,
          postId,
          userId,
        },
        { headers: headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

export default postSlice.reducer;
