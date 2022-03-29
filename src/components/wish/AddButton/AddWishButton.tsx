import { AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import AddButton from "./AddButton";

const AddWishButton: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [need, setNeed] = useState("");

  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleDescriptionChange = (e: any) => setDescription(e.target.value);
  const handlePriceChange = (e: any) => setPrice(e.target.value);
  const handleNeedChange = (e: any) => setNeed(e.target.value);

  const addWish = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:3001/api/wishes/add", {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      // BODY UL VINE GOL!!!!!!!!!!!
      body: JSON.stringify({
        title,
        description,
        price,
        need,
      }),
    });

    const data = await response.json();
    if (data.status !== "ok") {
      console.log(data);
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <form onSubmit={addWish}>
            <Stack gap={1}>
              <Input
                placeholder="Title"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
              <Input
                placeholder="Description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <Input
                placeholder="Price"
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
              />
              <Input
                placeholder="Need"
                type="number"
                id="password"
                value={need}
                onChange={handleNeedChange}
              />
              <AddButton
                customType="wish"
                type="submit"
                text="Add"
                icon={<CheckCircleIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
                onClick={() => {
                  addWish();
                  setShowForm(!showForm);
                }}
              />
            </Stack>

            {/* <Button  onClick={loginUser}>
              Log In
            </Button> */}
          </form>
        </>
      ) : (
        <AddButton
          customType="wish"
          text="Add Wish"
          icon={<AddIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
          onClick={() => setShowForm(!showForm)}
        />
      )}
    </>
  );
};

export default AddWishButton;
