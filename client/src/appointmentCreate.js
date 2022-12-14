import React, { useContext, useState } from "react";

import styled from "styled-components";
import { UserContext } from "./UserContext";
import { AiOutlineForm } from "react-icons/ai";

const AppointmentCreate = ({}) => {
  const {
    userProfile,

    viewMessageSenderProfile,
  } = useContext(UserContext);
  // remember to delete all the white space begining and at the end of each input
  const [disableSummitButton, setDisableSummitButton] = useState(true);
  const [values, setValues] = useState({
    senderId: userProfile._id,
    lawyer: `${userProfile.firstName} ${userProfile.lastName}`,
    lawyerEmail: userProfile.email,
    isConfirmed: false,
    timezone: "GMT-0600 (Mountain Daylight Time)",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value.trim();
    setValues((values) => ({ ...values, [name]: value }));
    // values is just a temperary variable which is holding an object contents inputs

    const timeStartAppointmentString = `${values.date} ${values.start} GMT-0600 (Mountain Daylight Time)`;
    const newDateOfTimeStart = new Date(timeStartAppointmentString);
    const timeStartToNumber = newDateOfTimeStart.getTime();

    if (
      values.date !== undefined &&
      values.start !== undefined &&
      timeStartToNumber < Date.now()
    ) {
      // in some special cases, the start time can be before now time
      alert(
        " WARNING!!You are putting appointment's start time before present time."
      );
    }
    const timeEndAppointmentString = `${values.date} ${values.end} GMT-0600 (Mountain Daylight Time)`;
    const newDateOfTimeEnd = new Date(timeEndAppointmentString);
    const timeEndToNumber = newDateOfTimeEnd.getTime();

    if (
      values.date !== undefined &&
      values.end !== undefined &&
      values.start !== undefined
    ) {
      if (
        timeEndToNumber > Date.now() &&
        timeEndToNumber >= timeStartToNumber
      ) {
        setDisableSummitButton(false);
      } else {
        setDisableSummitButton(true);
        alert(
          `WARNING!! You must put appointment's start time after present time OR The end time must be after the start time.`
        );
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let objectToBePosted = {
      receiverId: viewMessageSenderProfile._id,
      client: `${viewMessageSenderProfile.firstName} ${viewMessageSenderProfile.lastName}`,
      clientEmail: viewMessageSenderProfile.email,
      ...values,
      timeStartAppointment: `${values.date} ${values.start} GMT-0600 (Mountain Daylight Time)`,
      timeEndAppointment: `${values.date} ${values.end} GMT-0600 (Mountain Daylight Time)`,
      timeOfCreateingAppointment: Date.now(),
      timeOfCreateingAppointmentToString: Date(Date.now()).toString(),
    };

    try {
      const posting = await fetch(`/api/add-appointment`, {
        method: "POST",
        body: JSON.stringify(objectToBePosted),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const converToJson = await posting.json();

      if (converToJson.status === 200) {
        alert(
          `THANK YOU! You successfully sent an appointment to
              : ${viewMessageSenderProfile.firstName} ${viewMessageSenderProfile.lastName}
              `
        );
      } else {
        alert(
          `* APPOINTMENT CREATE ERROR ALERT * Sorry! For some reasons, you can not create appointment at this time.`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppointmentCreateDiv>
      {/* conditional rendering those lines cause we have 2 possible cases of sign up */}

      <FormDiv>
        <Form onSubmit={handleSubmit}>
          <AppointmentCreateTitle>
            <AiOutlineForm style={{ marginRight: "10px", fontSize: "30px" }} />
            Create an appointment with {viewMessageSenderProfile.firstName} {""}
            {viewMessageSenderProfile.lastName}
          </AppointmentCreateTitle>

          <HeadLine>Information:</HeadLine>
          <Subject
            placeholder="Subject or Matter (required)"
            type="text"
            name="subject"
            required
            onChange={handleChange}
          />

          <Message
            placeholder="Message (required)"
            type="text"
            name="message"
            required
            onChange={handleChange}
          />
          <small>Date:</small>
          <Input
            placeholder="Date (required)"
            type="date"
            name="date"
            required
            onChange={handleChange}
          />
          <small>Timezone: GMT-0600 (Mountain Daylight Time) </small>
          <small>Start:</small>
          <Input
            placeholder="Start (required)"
            type="time"
            name="start"
            required
            onChange={handleChange}
          />
          <small>End:</small>
          <Input
            placeholder="End (required)"
            type="time"
            name="end"
            required
            onChange={handleChange}
          />

          <Input
            placeholder="Duration/minutes (required)"
            type="number"
            name="duration"
            required
            onChange={handleChange}
          />
          <Input
            placeholder="Hour rate (required)"
            type="number"
            name="hourRate"
            required
            onChange={handleChange}
          />
          <Input
            placeholder="Location (required)"
            type="text"
            name="location"
            required
            onChange={handleChange}
          />

          <SubmitButton
            type="submit"
            value="Send"
            name="confirmButton"
            disabled={disableSummitButton}
            className={disableSummitButton ? "disabled" : ""}
          ></SubmitButton>
        </Form>
      </FormDiv>
    </AppointmentCreateDiv>
  );
};

const HeadLine = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SubmitButton = styled.input`
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: #30b06b;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 405px;
  height: 60px;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    background-color: blue;

    transition: 0.5s ease-in-out;
  }
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const AppointmentCreateTitle = styled.h3`
  font-size: 35px;
  color: black;
  font-family: "IBM Plex Sans", sans-serif;

  font-weight: 800;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgrey;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Message = styled.textarea`
  width: 390px;
  height: 200px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  resize: none;
`;
const Subject = styled.input`
  width: 390px;
  height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;
const Input = styled.input`
  width: 390px;
  height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const FormDiv = styled.div`
  border: solid 2px var(--color-alabama-crimson);
  height: fit-content;
`;
const AppointmentCreateDiv = styled.div``;

export default AppointmentCreate;
