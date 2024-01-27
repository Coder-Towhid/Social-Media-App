import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import Layout from "../../components/layout/Layout";
import Rightbar from "../../components/rightbar/Rightbar";
import { API_SERVER, PUBLIC_FOLDER } from "../../utils/constant";
import "./timeline.css";
const Timeline = () => {

  const [user, setUser] = useState({})
  const username = useParams().username
  
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${API_SERVER}/api/users?username=${username}`
      );

      setUser(res.data);
    };
    fetchUsers();
  }, [username]);
  
  return (
    <Layout>
      <div className="profileContent">
        <div className="profileTop">
          <div className="profileCover">
            <img className="profileCoverImg" src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER+"person/noCover.png"} alt="" />
            <img className="profileUserImg" src={user.profilePicture? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileBottom">
          <Feed username={username} />
          <Rightbar user={user}/>
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;
