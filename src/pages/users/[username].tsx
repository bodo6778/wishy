import SharedProfilePage from "components/profile/SharedProfilePage";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { UserProfile } from "types/wish";

interface UserProfileDynamicPageProps {
  user: UserProfile;
}

const UserProfileDynamicPage: NextPage<UserProfileDynamicPageProps> = ({
  user,
}) => {
  return <SharedProfilePage user={user} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as { username: string };

  try {
    const res = await fetch(
      `https://wishy-backend.vercel.app/api/users/${username}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const user = await res.json();

    return { props: { user } };
  } catch (error) {
    console.log(error);

    return { notFound: true };
  }
};

export default UserProfileDynamicPage;
