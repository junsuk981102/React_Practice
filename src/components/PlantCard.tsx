import React, {FC} from "react";

interface PlantCardProps{
    plantType: string;
}
 
const PlantCard: FC<PlantCardProps> = ({plantType}) => {
    return  (
        <img src={"/images/plant/" + plantType + ".jpg"} alt="PlantCard" width={150} height={150}/>
    );
};

export default PlantCard;