import React, {FC} from "react";

interface AnimalCardProps{
    animalType: string;
}
 
const AnimalCard: FC<AnimalCardProps> = ({animalType}) => {
    return  (
        <img src={"/image/animal/" + animalType + ".png"} alt="AnimalCard" width={150} height={150}/>
    );
};

export default AnimalCard;