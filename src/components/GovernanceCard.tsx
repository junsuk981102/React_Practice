import React, {FC} from "react";

interface GovernanceCardProps{
    governanceType: string;
}

const GovernanceCard: FC<GovernanceCardProps> = ({governanceType}) => {
    return  (
        <img src={"/image/animal/" + governanceType + ".png"} alt="GovernanceCard" width={150} height={150}/>
    );
};

export default GovernanceCard;