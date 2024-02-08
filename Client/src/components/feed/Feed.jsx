import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_SERVER } from "../../utils/constant";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPost] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
        ? await axios.get(
            `${API_SERVER}/api/posts/profile/${username}`
          )
        : await axios.get(
            `${API_SERVER}/api/posts/timeline/${user._id}`
          );

          console.log('res :>> ', res);

      setPost(res.data.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date (p1.createdAt);
      }));
      } catch (error) {
        console.log('error :>> ', error);
      }
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
       {(!username ||username === user.username) &&  <Share />}

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
