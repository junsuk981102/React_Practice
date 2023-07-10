import React, { FC, useState, ChangeEvent } from "react";

import { saleGovernanceTokenContract, web3 } from "../web3Config";
import GovernanceCard from "./GovernanceCard";
import {
  Box,
  Button,
  Input,
  Text,
  Image,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

export interface IMyGovernanceCard {
  GNT_Id: string;
  GNT_name: string;
  GNT_Initial_Price: string;
  GNT_Sale_Price: string;
  GNT_Address: string;
}

interface MyGovernanceCardProps extends IMyGovernanceCard {
  saleStatus: boolean;
  account: string;
}

const MyGovernanceCard: FC<MyGovernanceCardProps> = ({
  GNT_Id,
  GNT_name,
  GNT_Initial_Price,
  GNT_Sale_Price,
  GNT_Address,
  saleStatus,
  account,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myGovernanceSalePrice, setMyGovernanceSalePrice] =
    useState<string>(GNT_Sale_Price);
  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleGovernanceTokenContract.methods
        .setForSaleGovernanceToken(GNT_Id, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      if (response.status) {
        setMyGovernanceSalePrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      //크기
      w="300px"
      h="250px"
      pt="5px"
      m="10px"
      //배경
      borderRadius="md"
      bg="white"
      border="3px solid #00A29D"
    >
      {/* 티켓 아이콘 */}
      <Image
        //위치
        position="absolute"
        ml="100px"
        //배경
        src="../image/ticketicon.png"
        alt="ticket icon"
        //크기
        w="100px"
        h="100px"
      />
      {/* 하단 */}
      <Box
        //위치
        position="absolute"
        mt="120px"
        ml="10px"
        //글자
        fontSize="sm"
        as="b"
      >
        <Text>
          NFT 이름 : <GovernanceCard GNT_name={GNT_name} />
        </Text>
        {/* 티켓 카드 */}
        {saleStatus ? (
          myGovernanceSalePrice === "0" ? (
            // 판매가능상태 & 판매등록이전
            <>
              <Text>NFT ID : {GNT_Id}</Text>
              <Text>초기가격 : {GNT_Initial_Price} ETH</Text>
              <InputGroup size="sm" mt="10px">
                <Input
                  w="110px"
                  fontSize="sm"
                  type="number"
                  placeholder="판매가격 입력"
                  value={sellPrice}
                  onChange={onChangeSellPrice}
                ></Input>
                <InputRightAddon children="ETH" />
                <Button onClick={onClickSell}>판매 등록</Button>
              </InputGroup>
            </>
          ) : (
            // 판매가능상태 & 판매등록이후
            <>
              <Text>NFT ID: {GNT_Id}</Text>
              <Text>초기가격: {GNT_Initial_Price} ETH</Text>
              <Text>판매가격: {myGovernanceSalePrice} ETH</Text>
              <Box textAlign="center">
                <Text as="b" color="blue">
                  {"<"}판매 등록 완료{">"}
                </Text>
              </Box>
            </>
          )
        ) : myGovernanceSalePrice === "0" ? (
          // 판매불가능상태 & 판매등록이전
          <>
            <Text>NFT ID: {GNT_Id}</Text>
            <Text>초기가격: {GNT_Initial_Price} ETH</Text>
          </>
        ) : (
          // 판매불가능상태 & 판매등록이후
          <>
            <Text>NFT ID: {GNT_Id}</Text>
            <Text>초기가격: {GNT_Initial_Price} ETH</Text>
            <Text>판매가격: {myGovernanceSalePrice} ETH</Text>
            <Box textAlign="center">
              <Text as="b" color="blue">
                {"<"}판매 등록 완료{">"}
              </Text>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyGovernanceCard;

// <p>초기가격 : {web3.utils.fromWei(GNT_Initial_Price)} ETH</p>
// <p>판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH</p>
