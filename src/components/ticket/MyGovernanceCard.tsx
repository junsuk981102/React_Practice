import React, { FC, useState, ChangeEvent } from "react";
import { saleGovernanceTokenContract, web3 } from "../../web3Config";
import GovernanceCard from "./GovernanceCard";
import {
  Button,
  Input,
  Text,
  Image,
  InputGroup,
  InputRightAddon,
  Flex,
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
  //티켓 판매 함수
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
    <Flex
      w="180px"
      h="220px"
      p="5px"
      m="10px"
      bg="white"
      border="3px solid #00A29D"
      borderRadius="xl"
      flexDirection="column"
      alignItems="center"
    >
      {/* 티켓 아이콘 */}
      <Image src="../image/ticket/icon_ticket.png" w="100px" h="100px" />
      {/* 하단 */}
      <Flex flexDirection="column" mt="10px" fontSize="sm">
        <Flex textAlign="center">
          {/* 티켓 이름&ID */}
          <GovernanceCard GNT_name={GNT_name} />
          <Text>
            &nbsp;{" / "} ID : {GNT_Id}
          </Text>
        </Flex>
        {/* 티켓 카드 */}
        {saleStatus ? (
          myGovernanceSalePrice === "0" ? (
            // 판매가능상태 & 판매등록이전
            <>
              <Text>초기가격 : {GNT_Initial_Price} ETH</Text>
              <InputGroup size="xs" mt="10px">
                <Input
                  w="60px"
                  type="number"
                  placeholder="판매가격"
                  value={sellPrice}
                  onChange={onChangeSellPrice}
                  fontSize="2xs"
                ></Input>
                <InputRightAddon fontSize="2xs" children="ETH" />
                <Button fontSize="2xs" onClick={onClickSell}>
                  판매 등록
                </Button>
              </InputGroup>
            </>
          ) : (
            // 판매가능상태 & 판매등록이후
            <>
              <Text>초기가격 : {GNT_Initial_Price} ETH</Text>
              <Text>
                판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH
              </Text>
              <Text color="blue">
                {"<"}판매 등록 완료{">"}
              </Text>
            </>
          )
        ) : myGovernanceSalePrice === "0" ? (
          // 판매불가능상태 & 판매등록이전
          <>
            <Text>초기가격 : {GNT_Initial_Price} ETH</Text>
          </>
        ) : (
          // 판매불가능상태 & 판매등록이후
          <>
            <Text>초기가격 : {GNT_Initial_Price} ETH</Text>
            <Text>
              판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH
            </Text>
            <Text color="blue">
              {"<"}판매 등록 완료{">"}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default MyGovernanceCard;

//23.07.24 1차 코드 수정
//23.08.09 2차 코드 수정
