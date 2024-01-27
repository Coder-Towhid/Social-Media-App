/* eslint-disable react/prop-types */

import "./post.css";

import { Favorite, MoreVert, RecommendRounded } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { API_SERVER, PUBLIC_FOLDER } from "../../utils/constant";


const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const {user: currentUser} = useContext(AuthContext)
  const handleLike = () => {

    try {
      axios.put(`${API_SERVER}/api/posts/${post._id}/like`, {userId: currentUser._id })
      } catch (error) {
        console.log(error)
   }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
 
  };

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id));
  },[currentUser, post.likes])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${API_SERVER}/api/users?userId=${post.userId}`
      );

      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
         <Link  to={`/profile/${user.username}`}>

            <img
              className="postProfileImg"
              src={user.profilePicture || PUBLIC_FOLDER+"person/noAvatar.png"}
              alt=""
            />
          </Link>
            <span className="postUserName">
              {user.username}
            </span>

            <span className="postDate">{ format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
     
          <img className="postImg" src={PUBLIC_FOLDER+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite className="postReactIconHeart" onClick={handleLike} />
            <RecommendRounded
              className="postReactIconLike"
              onClick={handleLike}
            />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
