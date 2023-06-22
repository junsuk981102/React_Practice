import React, { useState} from "react";
import { dbService } from "../firebase-config";

const ScreenTest = (props) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [information, setInformation] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("startup_list").add({
            sup_name : name,
            sup_category : category,
            sup_info : information,
        });
        setName("")
        setCategory("")
        setInformation("")
    }

    const onChangeName = (event) => {
        const {
          target: { value }
        } = event;
        setName(value);
    }
    const onChangeCategory = (event) => {
        const {
          target: { value }
        } = event;
        setCategory(value);
    }
    const onChangeInformation = (event) => {
        const {
          target: { value }
        } = event;
        setInformation(value);
    }

    return (
        <>
            <h3>ScreenTest 페이지입니다.</h3>
            <div>
                <form onSubmit={onSubmit}>
                    <input value={name} onChange={onChangeName} type="text" placeholder="Test 이름" maxLength={120} />
                    <input value={category} onChange={onChangeCategory} type="text" placeholder="Test 범주" maxLength={120} />
                    <input value={information} onChange={onChangeInformation} type="text" placeholder="Test 설명" maxLength={120} />
                    <input type="submit" value="Test" />
                </form>
            </div>
        </>
    );
}

export default ScreenTest;