import Sidebar from "./Sidebar.js";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>7</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>8</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>9</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
