import React, {FC} from "react";

interface GovernanceCardProps{
    GNT_name : string;
}

const GovernanceCard: FC<GovernanceCardProps> = ({GNT_name}) => {
    return  (
        <text> {GNT_name} </text>
    );
};

export default GovernanceCard;