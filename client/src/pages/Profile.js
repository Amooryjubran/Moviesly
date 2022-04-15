import React from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const { profile } = useParams();
  const { data } = useFetch(`/api/user/${profile}`);
  if (!data) {
    return null;
  }
  const user = data.data;
  if (!user) {
    return null;
  }
  console.log(user);
  return (
    <div>
      <ProfileHeader user={user} />
    </div>
  );
}
