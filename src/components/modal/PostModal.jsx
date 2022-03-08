import { Modal } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../redux/features/postSlice";

export const PostModal = ({
  open = false,
  close = null,
  postData = null,
  isNewPost = null,
}) => {
  const { token, _id, username } =
    useSelector((state) => state.users.user) || {};
  const dispatch = useDispatch();

  const postBody = useRef();
  const postTitle = useRef();
  const image = useRef();

  const headers = {
    token: `Bearer ${token}`,
  };

  const submitPost = (e) => {
    e.preventDefault();

    !isNewPost
      ? dispatch(
          updatePost({
            title: postTitle.current.value,
            body: postBody.current.value,
            postImage: image.current.value,
            postId: postData.postId,
            userId: _id,
            headers,
            username,
          })
        )
      : dispatch(
          createPost({
            title: postTitle.current.value,
            body: postBody.current.value,
            postImage: image.current.value,
            headers,
            username,
          })
        );

    close();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-col h-screen ">
          <div className="grid place-items-center mx-2 my-20 sm:my-auto">
            <div
              className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-6/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-whiteColor rounded-lg shadow-lg lg:shadow-xl"
            >
              <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                {postData ? `Edit Post` : "Create a new post"}
              </h2>

              <form className="mt-10" onSubmit={submitPost}>
                <label
                  htmlFor="title"
                  className="block text-xs font-semibold text-gray-600 uppercase"
                >
                  Post Title
                </label>
                <input
                  ref={postTitle}
                  id="title"
                  type="text"
                  name="title"
                  defaultValue={postData?.title ? postData.title : ""}
                  placeholder="Enter the post title"
                  autoComplete="title"
                  className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                  autoFocus
                />

                <label
                  htmlFor="title"
                  className="block mt-8 text-xs font-semibold text-gray-600 uppercase"
                >
                  Post Image Url
                </label>
                <input
                  ref={image}
                  id="link"
                  type="url"
                  name="link"
                  pattern="https://.*"
                  defaultValue={postData?.image ? postData.image : ""}
                  size="100"
                  placeholder="Enter the post image url"
                  autoComplete="link"
                  className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  required
                />

                <label
                  htmlFor="body"
                  className="block mt-8 text-xs font-semibold text-gray-600 uppercase"
                >
                  Post Body
                </label>

                <textarea
                  ref={postBody}
                  className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-2 border-gray-100
                    focus:text-gray-800 focus:outline-none focus:border-gray-200"
                  required
                  id="body"
                  cols="30"
                  rows="10"
                  defaultValue={postData?.body ? postData.body : ""}
                  placeholder="Enter the post description"
                ></textarea>

                <div className="flex gap-4">
                  <button
                    className={`w-full py-3 mt-10 rounded-sm
                    font-medium text-whiteColor uppercase
                    focus:outline-none  bg-red`}
                    onClick={close}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className={`w-full py-3 mt-10 rounded-sm
                    font-medium text-whiteColor uppercase
                    focus:outline-none  
                       hover:bg-yellow hover:text-black bg-black 
                    } hover:shadow-none`}
                  >
                    {isNewPost ? "Post" : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
