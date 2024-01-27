/* eslint-disable react/prop-types */
import "./online.css"




const Online = ({users}) => {
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImageContainer">
      <img
        className="rightbarProfileImg"
        src={users.profilePicture}
        alt=""
      />
      <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{users.username}</span>
  </li>
  )
}

export default Online