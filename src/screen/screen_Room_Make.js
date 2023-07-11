import React, { useState } from "react";
import { dbService } from "../firebase-config";
import { Box, Input } from "@chakra-ui/react";

const ScreenRoomMake = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [information, setInformation] = useState("");
  const [investment, setInvesetment] = useState("");
  const [price, setPrice] = useState("");
  const [maxticket, setMaxticket] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("community_list").add({
      com_name: name,
      com_category: category,
      com_info: information,
      com_total_investment: investment,
      com_now_investment: 0,
      com_ticket_price: price,
      com_ticket_max: maxticket,
      com_createAt: Date.now(),
      com_member: 0,
    });
    setName("");
    setCategory("");
    setInformation("");
    setInvesetment("");
    setPrice("");
    setMaxticket("");
  };

  const onChangeName = (event) => {
    const {
      target: { value },
    } = event;
    setName(value);
  };
  const onChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };
  const onChangeInformation = (event) => {
    const {
      target: { value },
    } = event;
    setInformation(value);
  };
  const onChangeInvesetment = (event) => {
    const {
      target: { value },
    } = event;
    setInvesetment(value);
  };
  const onChangePrice = (event) => {
    const {
      target: { value },
    } = event;
    setPrice(value);
  };
  const onChangeMaxticket = (event) => {
    const {
      target: { value },
    } = event;
    setMaxticket(value);
  };

  return (
    <>
      <Box>
        <form onSubmit={onSubmit}>
          <Input
            value={name}
            onChange={onChangeName}
            type="text"
            placeholder="커뮤니티 이름"
            maxW="120px"
          />
          <Input
            value={category}
            onChange={onChangeCategory}
            type="text"
            placeholder="커뮤니티 범주"
            maxW="120px"
          />
          <Input
            value={information}
            onChange={onChangeInformation}
            type="text"
            placeholder="커뮤니티 설명"
            maxW="120px"
          />
          <Input
            value={investment}
            onChange={onChangeInvesetment}
            type="number"
            placeholder="커뮤니티 목표 투자금액"
            maxW="120px"
          />
          <Input
            value={price}
            onChange={onChangePrice}
            type="number"
            placeholder="커뮤니티 티켓 가격"
            maxW="120px"
          />
          <Input
            value={maxticket}
            onChange={onChangeMaxticket}
            type="number"
            placeholder="커뮤니티 티켓 최대 구매 개수"
            maxW="120px"
          />
          <Input type="submit" value="커뮤니티 만들기" />
        </form>
      </Box>
    </>
  );
};

export default ScreenRoomMake;
