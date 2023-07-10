import React, { useState } from "react";
import { dbService } from "../firebase-config";

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
      <h3>ScreenRoomMake 페이지입니다.</h3>
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={name}
            onChange={onChangeName}
            type="text"
            placeholder="커뮤니티 이름"
            maxLength={120}
          />
          <input
            value={category}
            onChange={onChangeCategory}
            type="text"
            placeholder="커뮤니티 범주"
            maxLength={120}
          />
          <input
            value={information}
            onChange={onChangeInformation}
            type="text"
            placeholder="커뮤니티 설명"
            maxLength={120}
          />
          <input
            value={investment}
            onChange={onChangeInvesetment}
            type="number"
            placeholder="커뮤니티 목표 투자금액"
            maxLength={120}
          />
          <input
            value={price}
            onChange={onChangePrice}
            type="number"
            placeholder="커뮤니티 티켓 가격"
            maxLength={120}
          />
          <input
            value={maxticket}
            onChange={onChangeMaxticket}
            type="number"
            placeholder="커뮤니티 티켓 최대 구매 개수"
            maxLength={120}
          />
          <input type="submit" value="커뮤니티 만들기" />
        </form>
      </div>
    </>
  );
};

export default ScreenRoomMake;
