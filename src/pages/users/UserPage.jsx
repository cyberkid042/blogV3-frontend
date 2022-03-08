import { Avatar, Button, Divider } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostCard } from "../../components/PostCard";

export const UserPage = () => {
  const params = useParams();
  const { _id, token, username } =
    useSelector((state) => state.users.user) || {};

  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const userName = params?.username;

  useEffect(() => {
    document.title = `BlogV3 | ${userName || {}}'s Page`;
  }, [userName]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/profile?username=${userName}`
        );
        setUser(response?.data);
        setIsFollowing(response?.data?.followers.includes(_id) ? true : false);
        setFollowersCount(response?.data?.followers.length);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [userName, _id]);

  const handleFollow = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/follow`,
        { userToFollowId: userName },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setIsFollowing(!isFollowing);
      isFollowing
        ? setFollowersCount(followersCount - 1)
        : setFollowersCount(followersCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const likeAPost = async (postId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/like-post`,
        { postId },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20 sm:pt-20 lg:pt-0 container mx-auto">
      <h2 className="text-3xl lg:pt-8 font-bold capitalize text-center">
        {user?.username}
      </h2>
      <div className="flex justify-center my-7 items-center space-x-10">
        <Avatar
          alt={`${user?.username.toUpperCase()}`}
          src={`${user?.profilePicture}`}
          className="bg-red"
          aria-label="user"
          sx={{ width: "85px", height: "85px" }}
        />
        <div>
          <div className="flex space-x-5">
            <div>
              <h5 className="text-center text-2xl font-bold">
                {user?.posts.length}
              </h5>
              <h5>Posts</h5>
            </div>

            <div>
              <h5 className="text-center text-2xl font-bold">
                {followersCount}
              </h5>
              <h5>{followersCount === 1 ? "Follower" : "Followers"}</h5>
            </div>

            <div>
              <h5 className="text-center text-2xl font-bold">
                {user?.following.length}
              </h5>
              <h5>Following</h5>
            </div>
          </div>
          {_id && userName !== username.toLowerCase() && (
            <Button
              variant="contained"
              sx={{
                marginTop: "10px",
                backgroundColor: `${!isFollowing ? "black" : "red"}`,
                "&:hover": { backgroundColor: "gray" },
              }}
              onClick={handleFollow}
            >
              {isFollowing ? " Unfollow " : "Follow"}
            </Button>
          )}
        </div>
      </div>
      <Divider />
      <div className="grid grid-col-12 lg:grid-cols-3 gap-6 my-12">
        {user?.posts?.map((post) => (
          <PostCard
            post={post}
            likePost={likeAPost}
            key={post._id}
            author={user}
          />
        ))}
      </div>

      {user?.posts.length === 0 && (
        <h5 className=" text-center text-xl text-gray">
          <span className="capitalize">{userName}</span> has no posts yet!
        </h5>
      )}
    </div>
  );
};
