import React, { FC, useState, ChangeEvent } from "react";
import { saleGovernanceTokenContract, web3 } from "../../web3Config";
import GovernanceCard from "./GovernanceCard";
import {
  Box,
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
        <Text>
          이름 : <GovernanceCard GNT_name={GNT_name} /> {" / "} ID : {GNT_Id}
        </Text>

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
                <Button
                  //기능
                  fontSize="2xs"
                  onClick={onClickSell}
                >
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
              <Box
                //정렬
                textAlign="center"
              >
                <Text
                  //글자
                  color="blue"
                >
                  {"<"}판매 등록 완료{">"}
                </Text>
              </Box>
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
            <Box
              //정렬
              textAlign="center"
            >
              <Text
                //글자
                color="blue"
              >
                {"<"}판매 등록 완료{">"}
              </Text>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default MyGovernanceCard;

// <p>초기가격 : {web3.utils.fromWei(GNT_Initial_Price)} ETH</p>
// <p>판매가격 : {web3.utils.fromWei(myGovernanceSalePrice)} ETH</p>

//23.07.24 1차 코드 수정 완료
