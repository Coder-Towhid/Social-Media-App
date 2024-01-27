import Feed from "../../components/feed/Feed";
import Layout from "../../components/layout/Layout";
import Rightbar from "../../components/rightbar/Rightbar";

import "./home.css";

const Home = () => {
  return (
    <Layout>
      <div className="homeContent">
        <Feed />
        <Rightbar />
      </div>
    </Layout>
  );
};

export default Home;
