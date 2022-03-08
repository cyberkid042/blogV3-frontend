import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components/PostCard";

export const AllPosts = () => {
  const { token } = useSelector((state) => state?.users?.user) || {};

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/posts`
        );

        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);

  useEffect(() => {
    document.title = "BlogV3 | Read our collection of posts";
  }, []);

  const headers = {
    token: `Bearer ${token}`,
  };

  const likeAPost = async (postId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/posts/like-post`,
        { postId },
        { headers }
      );
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
  };

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="my-20 pt-20 container mx-auto">
      <input
        type="text"
        className="px-4 py-2 w-full mb-10 border-2 rounded border-black focus:outline-black"
        placeholder="Search for a post..."
        autoFocus
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredPosts.length > 0 ? (
        <div className="grid grid-col-12 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              post={post}
              likePost={likeAPost}
              deletePost={deleteAPost}
              key={post._id}
            />
          ))}
        </div>
      ) : (
        <h5 className="text-center text-3xl text-gray">No Posts found</h5>
      )}
    </div>
  );
};
