import moment from "moment";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Button,
  CircularProgress,
  Divider,
  Popover,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PostModal } from "./modal/PostModal";

import { slugify, truncateString } from "../utils/utils";

export const PostCard = ({
  post,
  likePost = null,
  deletePost = null,
  author = null,
}) => {
  const { _id } = useSelector((state) => state?.users?.user) || {};

  const [anchorEl, setAnchorEl] = useState(null); //for popover

  const [isLiked, setIsLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    handlePopClose();
  };

  const userId = _id && _id;

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const data = {
    title: post.title,
    image: post.postImage,
    body: post.body,
    postId: post._id,
  };

  useEffect(() => {
    post?.likes.includes(userId) ? setIsLiked(true) : setIsLiked(false);
    setPostLikeCount(post?.likes.length);
  }, [post, userId]);

  const handlePostLike = (post) => {
    likePost(post);
    setIsLiked(!isLiked);

    isLiked
      ? setPostLikeCount(postLikeCount - 1)
      : setPostLikeCount(postLikeCount + 1);
  };

  return (
    <>
      <div className="shadow-lg">
        <Card className=" max-w-maxlg:max-w-sm h-full">
          <CardHeader
            avatar={
              <Link
                to={`/user/${author ? author.username : post?.author.username}`}
                state={{ id: author ? author._id : post?.author._id }}
              >
                <Avatar
                  alt={`${
                    author
                      ? author.username.toUpperCase()
                      : post.author?.username.toUpperCase()
                  }`}
                  src={`${
                    author ? author.profilePicture : post.author?.profilePicture
                  }`}
                  className="bg-red"
                  aria-label="recipe"
                />
              </Link>
            }
            action={
              !author &&
              userId === post?.author?._id && (
                <IconButton aria-label="settings" onClick={handlePopover}>
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={truncateString(post.title, 26)}
            subheader={moment(post.createdAt).fromNow()}
          />
          {post.postImage ? (
            <CardMedia
              component="img"
              image={post.postImage}
              alt="Loading..."
              style={{ height: "200px" }}
            />
          ) : (
            <CircularProgress className="text-center" color="success" />
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {truncateString(post.body, 80)}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="Like Post"
              disabled={!userId}
              onClick={() => handlePostLike(post._id)}
            >
              {isLiked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
              <span className="font-thin text-lg pl-1">{postLikeCount}</span>
            </IconButton>
            <Link
              to={`/post/${slugify(post.title)}`}
              state={{ id: post._id }}
              style={{ marginLeft: "auto" }}
            >
              <Button sx={{ color: "black" }} size="small">
                Read Post
              </Button>
            </Link>
            <IconButton aria-label="share" sx={{ marginLeft: "auto" }}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>

        {/* pass post data to modal for editing */}
        <PostModal
          open={openModal}
          close={handleCloseModal}
          postData={data}
          isNewPost={false}
        />
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Button
            sx={{ color: "black", padding: "10px" }}
            size="small"
            startIcon={<EditIcon />}
            onClick={handleOpenModal}
          >
            Edit Post
          </Button>
          <Button
            sx={{ color: "red", padding: "10px" }}
            size="small"
            startIcon={<DeleteForeverIcon />}
            onClick={() => deletePost(post.id)}
          >
            Delete Post
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
