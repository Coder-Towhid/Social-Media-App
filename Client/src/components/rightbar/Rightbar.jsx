import { Cake } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import { API_SERVER, PUBLIC_FOLDER } from "../../utils/constant";
import Online from "../online/Online";
import "./rightbar.css";
// eslint-disable-next-line react/prop-types
const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`${API_SERVER}/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${API_SERVER}/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `${API_SERVER}/api/users/friends/${user._id}`
        );
        setFriends(friendList.data);
        console.log(friends.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const profileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle"> User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PUBLIC_FOLDER + friend.profilePicture
                      : PUBLIC_FOLDER + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  const homeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <Cake className="birthdayImg" />

          <span className="birthdayText">
            {" "}
            <b>Liton Das</b> and <b>2 other friends</b> have a birthday today
          </span>
        </div>

        <img
          className="rightbarAd"
          src="https://www.suzuki.com.bd/images/website/suzuki_motul_engine_oil.jpg"
        ></img>
        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} users={u} />
          ))}
        </ul>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? profileRightbar() : homeRightbar()}
      </div>
    </div>
  );
};

export default Rightbar;
