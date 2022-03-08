import { Button, Divider, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

export const SinglePost = () => {
  const location = useLocation();

  const postId = location?.state?.id;

  const { _id, token } = useSelector((state) => state.users.user) || {};
  const [isLiked, setIsLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/posts/post?id=${postId}`
        );

        setPost(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    document.title = `BlogV3 | ${post?.title}`;
    post?.likes?.map((like) =>
      like._id === _id ? setIsLiked(true) : setIsLiked(false)
    );

    setPostLikeCount(post?.likes?.length);
  }, [post?.title, post?.likes, _id]);

  const likePost = async () => {
    const headers = {
      token: `Bearer ${token}`,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/like-post`,
        { postId: post?.id },
        { headers }
      );
      setIsLiked(!isLiked);
      setPostLikeCount(isLiked ? postLikeCount - 1 : postLikeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-19">
      <div className=" relative container-fluid">
        <img
          alt="post "
          src={post?.postImage}
          style={{ width: "100vw", height: "45vw" }}
        />

        <div className="z-40 absolute w-10 h-10 left-5 top-20 rounded-full bg-whiteColor">
          <div className="flex justify-center">
            <Link to="/posts">
              <Button>
                <ArrowBackOutlinedIcon sx={{ color: "black" }} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <h1 className="text-center text-2xl font-medium lg:text-5xl pt-5">
        {post?.title}
      </h1>

      <div className="container mx-auto">
        <div className="flex justify-center space-x-2 mb-7">
          <p className="text-gray text-center">
            posted {moment(post?.createdAt).fromNow()} by
          </p>
          <Link
            to={`/user/${post?.author.username}`}
            state={{ id: post?.author.id }}
          >
            {post?.author?.username}
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mb-5">
          <div className="text-gray flex items-center space-x-1">
            <VisibilityIcon />
            <span className="text-lg">{post?.numberOfViews}</span>
          </div>

          <IconButton aria-label="Like Post" disabled={!_id} onClick={likePost}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span className="font-thin text-lg pl-1">{postLikeCount}</span>
          </IconButton>
        </div>
        <Divider />
        <p className="pt-5">{post?.body}</p>
      </div>
    </div>
  );
};
