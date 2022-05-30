import Wishlist from "components/wish/Wishlist";
import { NextPage } from "next";
import React from "react";

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  return <Wishlist />;
};

export default Dashboard;
