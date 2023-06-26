import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import { mintGovernanceTokenContract, saleGovernanceTokenAddress } from '../web3Config';
import MyGovernanceCard, { IMyGovernanceCard }  from '../components/MyGovernanceCard';

interface MyGovernanceProps{
  account: string;
}

const ScreenMyGovernance: FC<MyGovernanceProps> = ({account}) => {
    const [governanceCardArray, setGovernanceCardArray] = useState<IMyGovernanceCard[]>();
    const [saleStatus, setSaleStatus] =useState<boolean>(false);

    const getGovernanceTokens = async() =>{
        try{
            const balanceLength = await mintGovernanceTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0") return;

            const tempGovernanceCardArray: IMyGovernanceCard[] = [];

            const response = await mintGovernanceTokenContract.methods
                .getGovernanceTokens(account)
                .call();

            response.map((v: IMyGovernanceCard) => {
                tempGovernanceCardArray.push({
                    GNT_Id : v.GNT_Id,
                    GNT_name : v.GNT_name,
                    GNT_Initial_Price : v.GNT_Initial_Price,
                    GNT_Sale_Price : v.GNT_Sale_Price,
                    GNT_Address : v.GNT_Address,
                });
            });

            setGovernanceCardArray(tempGovernanceCardArray);
        } catch(error){
            console.error(error);
        }
    };

    const getIsApprovedForAll = async () =>{
        try{
            const response = await mintGovernanceTokenContract.methods
                .isApprovedForAll(account,saleGovernanceTokenAddress)
                .call();

            if(response.status){
                setSaleStatus(response);
            }
        } catch (error){
            console.error(error);
        }
    };
 
    const onClickApproveToggle = async () => {
        try{
            if(!account) return;

            const response = await mintGovernanceTokenContract.methods
                .setApprovalForAll(saleGovernanceTokenAddress,!saleStatus)
                .send({from:account});
            
            if(response.status){
                setSaleStatus(!saleStatus);
            }
        } catch(error){
            console.error(error);
        }
    }

    const navigate = useNavigate();

    const onClickRoom = async () => {
        try{
            if(!account) return;

            const balanceLength = await mintGovernanceTokenContract.methods
                .balanceOf(account)
                .call();

            if(balanceLength==="0"){
                alert("You cannot enter the room because you don't have NFTs for this room.");
                return;
            }

            alert("You can enter the room because you have NFTs for this room.");
            navigate("/screen_token_gating");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        if (!account) return;
        
        getIsApprovedForAll();
        getGovernanceTokens();
    }, [account]);
    
    useEffect(() => { 
        console.log(governanceCardArray)
    }, [governanceCardArray]);

    return (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Sale Status : {saleStatus ? 'True' : 'False'}</span>
            <button
              style={{ fontSize: '12px', marginLeft: '8px', color: saleStatus ? 'red' : 'blue' }}
              onClick={onClickApproveToggle}
            >
              {saleStatus ? 'Cancel' : 'Approve'}
            </button>
          </div>
          <button style={{ fontSize: '14px', color: 'green', marginTop: '8px' }} onClick={onClickRoom}>
            Room
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '16px' }}>
            {governanceCardArray &&
              governanceCardArray.map((v, i) => {
                return (
                  <MyGovernanceCard
                    key={i}
                    GNT_Id={v.GNT_Id}
                    GNT_name={v.GNT_name}
                    GNT_Initial_Price={v.GNT_Initial_Price}
                    GNT_Sale_Price={v.GNT_Sale_Price}
                    GNT_Address={v.GNT_Address}
                    saleStatus={saleStatus}
                    account={account}
                  />
                );
              })}
          </div>
        </>
      );
    };
export default ScreenMyGovernance;