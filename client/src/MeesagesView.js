import React, { useContext, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";
const MessagesView = () => {
  const {
    emailToFetchUser,
    userProfile,
    sucessfullyVerification,
    userInDatabase,
    setUserInDatabase,
    allMessagesReveived,
    setAllMessagesReveived,
  } = useContext(UserContext);

  console.log("userProfile", userProfile);
  useEffect(() => {
    if (sucessfullyVerification && emailToFetchUser) {
      console.log("work to get the message", userProfile._id);
      fetch(`/api/get-all-messages-by-receiverId/${userProfile._id}`)
        .then((res) => {
          console.log("res.json", res);
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setAllMessagesReveived(data.data);
            console.log("AllMessagesReveived", data);
          } else {
          }
        })
        // a post method here to check if the email registered is existing
        // show the alert if the email is already use

        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [sucessfullyVerification]);
  return (
    <MessagesViewDiv>
      {allMessagesReveived.map((message, index) => {
        return (
          <Message key={index}>
            <h1>
              Message(s) from {message.firstName} {""} {message.lastName}
            </h1>
            <p>Sender ID {message._id}</p>
            <p>Subject: {message.subject}</p>
            <p>Content: {message.message}</p>
          </Message>
        );
      })}
      <InformationDiv></InformationDiv>
    </MessagesViewDiv>
  );
};
const Message = styled.div``;
const InformationDiv = styled.div``;

const MessagesViewDiv = styled.div``;

export default MessagesView;
