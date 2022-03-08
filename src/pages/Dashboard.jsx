import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../components/PostCard";
import { fetchUserPosts } from "../redux/features/postSlice";
import { PostModal } from "../components/modal/PostModal";
import axios from "axios";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { username, token } = useSelector((state) => state.users.user);
  const { userPosts } = useSelector((state) => state.posts);

  const [open, setOpen] = useState(false);

  const fabStyle = {
    position: "fixed",
    bottom: 100,
    right: 20,
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      background: "#b7ca6432",
      color: "black",
    },
  };

  useEffect(() => {
    document.title = "BlogV3 | Your Dashboard";
  }, []);

  const headers = {
    token: `Bearer ${token}`,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchPosts = useCallback(() => {
    dispatch(fetchUserPosts(username));
  }, [dispatch, username]);

  const likeAPost = async (postId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/like-post`,
        { postId },
        { headers }
      );
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAPost = async (postId) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/posts`,
      { postId },
      { headers }
    );
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <div className="my-20 pt-20 container mx-auto">
        <div className="grid grid-col-12 lg:grid-cols-3 gap-6">
          {userPosts?.map((post) => (
            <PostCard
              post={post}
              likePost={likeAPost}
              deletePost={deleteAPost}
              key={post._id}
            />
          ))}
        </div>

        {userPosts?.length === 0 && (
          <h5 className="text-center mx-auto text-xl text-gray">
            You have no posts yet. Create a new one by clicking on the plus
            icon!
          </h5>
        )}
      </div>

      <Fab sx={fabStyle} aria-label="create Post" onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <PostModal open={open} close={handleClose} isNewPost={true} />
    </>
  );
};
