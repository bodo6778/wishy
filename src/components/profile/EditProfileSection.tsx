import { Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userProfileState, userState } from "state/atoms";
import { getStorageValue } from "../../../utils/functions";

interface EditProfileSectionProps {
  profile: userProfileState;
}

const EditProfileSection: React.FC<EditProfileSectionProps> = ({ profile }) => {
  const { username, email, name, description } = profile;
  const setProfile = useSetRecoilState(userState);

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const token = getStorageValue("token");

  const settingsHaveChanged = useMemo(
    () =>
      newName !== "" ||
      newEmail !== "" ||
      newUsername !== "" ||
      newDescription !== "",
    [newName, newUsername, newEmail, newDescription]
  );

  const saveChanges = async () => {
    //   useCallback(async () => {
    if (!token) return;

    try {
      await fetch(`${process.env.API_URL}/users/change`, {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName !== "" ? newName : undefined,
          email: newEmail !== "" ? newEmail : undefined,
          username: newUsername !== "" ? newUsername : undefined,
          description: newDescription !== "" ? newDescription : undefined,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setProfile({
      name: newName !== "" ? newName : name,
      email: newEmail !== "" ? newEmail : email,
      username: newUsername !== "" ? newUsername : username,
      description: newDescription !== "" ? newDescription : description,
    });
    // router.reload();
  };
  //   , []);

  return (
    <Stack width="50%">
      <Text mt={6} mb={2} fontSize="xl">
        Change your info:
      </Text>
      <Text pl={4}>Username:</Text>
      <Input
        placeholder={username}
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <Text pl={4}>Email:</Text>
      <Input
        placeholder={email}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <Text pl={4}>Name:</Text>
      <Input
        placeholder={name}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Text pl={4}>Description:</Text>
      <Textarea
        placeholder={description}
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <Button
        disabled={!settingsHaveChanged}
        colorScheme="green"
        onClick={saveChanges}
      >
        Save Changes
      </Button>
    </Stack>
  );
};

export default EditProfileSection;
