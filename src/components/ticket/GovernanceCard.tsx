import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

interface GovernanceCardProps {
  GNT_name: string;
}

const GovernanceCard: FC<GovernanceCardProps> = ({ GNT_name }) => {
  return <Text> 이름 : {GNT_name} </Text>;
};

export default GovernanceCard;

//23.08.09 1차 코드 수정
