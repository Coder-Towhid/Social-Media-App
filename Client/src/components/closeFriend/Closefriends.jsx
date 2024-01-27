/* eslint-disable react/prop-types */
import "./closefriends.css"

const Closefriends = ({users}) => {
  return (
    <li className="sidebarFriend">
      <img
        src={users.profilePicture}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{users.username}</span>
    </li>
  );
};

export default Closefriends;
