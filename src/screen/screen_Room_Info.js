import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ScreenRoomInfo = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const { state } = useLocation();
  console.log(state.name);

  const navi = useNavigate();

  function handleClick(text) {
    navi(`${text}`);
  }

  function handleClick_chat() {
    navi(`/screen_chat`, {
      state: {
        id: state.id,
        com_name: state.com_name,
        com_category: state.com_category,
        com_info: state.com_info,
        com_total_investment: state.com_total_investment,
        com_now_investment: state.com_now_investment,
        com_ticket_price: state.com_ticket_price,
        com_ticket_max: state.com_ticket_max,
        com_member: state.com_member,
        com_profileImg: state.com_profileImg,
      },
    });
  }

  function NumberFormat({ number }) {
    return <span>{number.toLocaleString()}</span>;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#E5F2F2",
          minHeight: "100vh",
          borderTop: "1px solid #00A29D",
        }}
      >
        <div
          style={{
            paddingLeft: `${windowWidth > 1700 ? "500px" : "50px"}`,
            paddingRight: `${windowWidth > 1700 ? "500px" : "10px"}`,
          }}
        >
          <h3
            style={{
              margin: "0",
              paddingTop: "50px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            커뮤니티 소개
          </h3>
          <div
            className
            style={{
              width: "1000px",
              height: "1000px",
              backgroundColor: "white",
              border: "3px solid #00A29D",
              padding: "30px",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                height: "auto",
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <img
                src={state.com_profileImg}
                alt="Animal"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <div style={{ marginLeft: "25px" }}>
                <h4
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {state.com_name}
                </h4>
                <div
                  style={{
                    width: "100px",
                    height: "auto",
                    padding: "5px",
                    borderRadius: "15px",
                    backgroundColor: "#00A29D",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {" "}
                    {state.com_category}
                  </h4>
                </div>
                <div>
                  <h4 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {state.com_info}
                  </h4>
                </div>
              </div>
            </div>

            <div style={{ height: "auto", padding: "20px", marginTop: "30px" }}>
              <h4
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                투자 목표 금액{" "}
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#00A29D",
                    marginRight: "20px",
                  }}
                >
                  {(state.com_now_investment / state.com_total_investment) *
                    100}
                  % 달성
                </h4>
              </h4>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "90%",
                    height: "50px",
                    backgroundColor: "white",
                    borderRadius: "25px",
                    border: "1px solid #00A29D",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width:
                      (state.com_now_investment / state.com_total_investment) *
                        90 +
                      "%",
                    height: "50px",
                    background: `linear-gradient(to right, #00A29D, #FFFFFF)`,
                    borderRadius: "25px",
                    border: "1px solid #00A29D",
                  }}
                ></div>
              </div>

              <div
                style={{
                  position: "relative",
                  color: "#00A29D",
                  fontWeight: "bold",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 55,
                    left: "85%",
                  }}
                >
                  <h4>
                    <NumberFormat number={state.com_total_investment} />원
                  </h4>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 55,
                    left:
                      (state.com_now_investment / state.com_total_investment) *
                        80 +
                      "%",
                  }}
                >
                  <h4>
                    <NumberFormat number={state.com_now_investment} />원
                  </h4>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "130px",
              }}
            >
              <div style={{ marginRight: "50px" }}>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  티켓 구매하기
                </h4>
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      src="../image/ticketgrey.png"
                      alt="ticketgrey"
                      style={{
                        width: "175px",
                        height: "175px",
                        marginBottom: "15px",
                      }}
                    />
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "5px",
                        width: "175px",
                        height: "30px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        backgroundColor: "#E5F2F2",
                        borderRadius: "15px",
                        textAlign: "center",
                        color: "#00A29D",
                      }}
                    >
                      <h4>현재 보유한 티켓 수 OO매</h4>
                    </div>
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    <h4
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                        textAlign: "center",
                      }}
                    >
                      <NumberFormat number={state.com_ticket_price} />원
                    </h4>
                    <button
                      onClick={() => handleClick()}
                      style={{
                        width: "160px",
                        height: "40px",
                        fontSize: "15px",
                        backgroundColor: "#00A29D",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        marginTop: "20px",
                      }}
                    >
                      구매하기
                    </button>
                    <h4
                      style={{
                        color: "grey",
                        fontSize: "13px",
                        marginTop: "5px",
                        textAlign: "center",
                      }}
                    >
                      * 최대 {state.com_ticket_max}매까지 구매 가능
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  관심있는 회사
                </h4>
                <div style={{ display: "flex" }}>
                  <img
                    src="../image/startup1.png"
                    alt="Startup1"
                    style={{ width: "154px", height: "185px" }}
                  />
                  <img
                    src="../image/startup2.png"
                    alt="Startup2"
                    style={{ width: "154px", height: "185px" }}
                  />
                  <img
                    src="../image/startup3.png"
                    alt="Startup3"
                    style={{ width: "154px", height: "185px" }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              <div
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  width: "110px",
                  height: "30px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  backgroundColor: "#E5F2F2",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4>{state.com_member}명 참여중</h4>
              </div>
            </div>

            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => handleClick_chat()}
                style={{
                  width: "700px",
                  height: "60px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  backgroundColor: "#00A29D",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                커뮤니티 참여하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenRoomInfo;
