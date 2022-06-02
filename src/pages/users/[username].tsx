import OwnProfile from "components/profile/OwnProfile";
import SharedProfilePage from "components/profile/SharedProfilePage";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { UserProfile } from "types/wish";
import { getStorageValue } from "../../../utils/functions";

interface UserProfileDynamicPageProps {
  user: UserProfile;
}

const UserProfileDynamicPage: NextPage<UserProfileDynamicPageProps> = ({
  user,
}) => {
  return (
    <>
      <OwnProfile user={user} />
      <SharedProfilePage user={user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as { username: string };

  try {
    const res = await fetch(`${process.env.API_URL}/users/${username}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    const user = await res.json();

    if (user.error) return { notFound: true }; //check if user is found

    return { props: { user } };
  } catch (error) {
    console.log(error);

    return { notFound: true };
  }
};

export default UserProfileDynamicPage;
