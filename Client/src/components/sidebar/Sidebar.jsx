import "./sidebar.css"
import {RssFeed, Chat, Bookmark, Group, PlayCircle , HelpOutline, WorkOutline, Event, School} from "@mui/icons-material";
import { Users } from "../../dummyData";
import Closefriendsnds from "../closeFriend/Closefriends";
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <RssFeed className="sidebarIcon"/>
                <span className="sidebarListItemText">Feed</span>
              </li>
              <li className="sidebarListItem">
                <Chat className="sidebarIcon"/>
                <span className="sidebarListItemText">Chats</span>
              </li>
              <li className="sidebarListItem">
                <Bookmark className="sidebarIcon"/>
                <span className="sidebarListItemText">Bookmark</span>
              </li>
              <li className="sidebarListItem">
                <Group className="sidebarIcon"/>
                <span className="sidebarListItemText">Group</span>
              </li>
              <li className="sidebarListItem">
                <PlayCircle className="sidebarIcon"/>
                <span className="sidebarListItemText">Video</span>
              </li>
              <li className="sidebarListItem">
                <HelpOutline className="sidebarIcon"/>
                <span className="sidebarListItemText">Help</span>
              </li>
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon"/>
                <span className="sidebarListItemText">Work</span>
              </li>
              <li className="sidebarListItem">
                <Event className="sidebarIcon"/>
                <span className="sidebarListItemText">Event</span>
              </li>
              <li className="sidebarListItem">
                <School className="sidebarIcon"/>
                <span className="sidebarListItemText">Course</span>
              </li>
            </ul>
            <button className="sidebarButton">Show More</button>
            <hr className="sidebarHr"/>

            <ul className="sidebarFriendList">

            {Users.map((u)=> <Closefriendsnds key={u.id} users={u}/>)}
            
             
            </ul>
        </div>
    </div>
  )
}

export default Sidebar