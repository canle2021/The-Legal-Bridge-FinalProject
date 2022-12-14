import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import HomePage from "./HomePage";
import Footer from "./Footer";
import SignUpPage from "./SignUp";
import SpecificLawyer from "./SpecificLawyer";
import ClientProfile from "./ClientProfile";
import LawyerProfile from "./LawyerProfile";

import AppointmentConfirmed from "./AppointemtnConfirmed";
import MessageSenderProfile from "./MessageSenderProfile";
import ListOfSendersForNewMessages from "./ListOfSendersForNewMessages";
import ListOfSendersForNewAppointment from "./ListOfSendersForNewAppointment";
import UpComingAppointments from "./LawyerAppointmentTools/UpComingAppointments";
import NotConfirmedUpcomingAppointments from "./LawyerAppointmentTools/NotConfirmedUpcomingAppointments";
import OnGoingAppointments from "./LawyerAppointmentTools/OnGoingAppointments";
import PassedAppointments from "./LawyerAppointmentTools/PassedAppointments";
import ClientUpComingAppointments from "./ClientAppointmentTools/ClientUpComingAppointments";
import ClientNotConfirmedAppointments from "./ClientAppointmentTools/ClientNotConfirmedAppointments";
import ClientPassedAppointments from "./ClientAppointmentTools/ClientPassedAppointments";
import EditUsername from "./ProfleUpdateTools/EditUsername";
import EditName from "./ProfleUpdateTools/EditName";
import EditEmail from "./ProfleUpdateTools/EditEmail";
import EditPhoneNumber from "./ProfleUpdateTools/EditPhoneNumber";
import EditPracticeAreas from "./ProfleUpdateTools/EditPracticeAreas";
import EditEducation from "./ProfleUpdateTools/EditEducation";
import EditExperience from "./ProfleUpdateTools/EditExperience";
import EditCredentials from "./ProfleUpdateTools/EditCredentials";
import EditLanguages from "./ProfleUpdateTools/EditLanguages";
import EditAddress from "./ProfleUpdateTools/EditAddress";
import EditQuote from "./ProfleUpdateTools/EditQuote";
import EditPicture from "./ProfleUpdateTools/EditPicture";
import ClientOnGoingAppointments from "./ClientAppointmentTools/ClientOnGoingAppointments";
import AppointmentConfirmErrorPage from "./AppointmentConfirmErrorPage";
import ErrorPage from "./ErrorPage";
function App() {
  return (
    <Router>
      <SizeContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route exact path="/lawyer/:_id" element={<SpecificLawyer />} />

          <Route exact path="/signUp" element={<SignUpPage />} />
          <Route path="/clientProfile" element={<ClientProfile />} />
          <Route path="/lawyerProfile" element={<LawyerProfile />} />
          <Route
            path="/message-sender-profile/:_id"
            element={<MessageSenderProfile />}
          />
          <Route
            path="/new-message-senderIds-list"
            element={<ListOfSendersForNewMessages />}
          />
          <Route
            path="/new-appointments-senderIds-list"
            element={<ListOfSendersForNewAppointment />}
          />

          <Route
            path="/upcoming-appointments"
            element={<UpComingAppointments />}
          />
          <Route
            path="/ongoing-appointments"
            element={<OnGoingAppointments />}
          />
          <Route path="/passed-appointments" element={<PassedAppointments />} />
          <Route
            path="/not-confimed-upcoming-appointments"
            element={<NotConfirmedUpcomingAppointments />}
          />
          <Route
            path="/AppointmentConfirmed"
            element={<AppointmentConfirmed />}
          />
          <Route
            path="/client-upcoming-appointments"
            element={<ClientUpComingAppointments />}
          />
          <Route
            path="/client-not-confirmed-appointments"
            element={<ClientNotConfirmedAppointments />}
          />
          <Route
            path="/client-passed-appointments"
            element={<ClientPassedAppointments />}
          />
          <Route
            path="/client-ongoing-appointments"
            element={<ClientOnGoingAppointments />}
          />
          <Route path="/edit-username" element={<EditUsername />} />
          <Route path="/edit-name" element={<EditName />} />
          <Route path="/edit-email" element={<EditEmail />} />
          <Route path="/edit-phone-number" element={<EditPhoneNumber />} />
          <Route path="/edit-practice-areas" element={<EditPracticeAreas />} />
          <Route path="/edit-education" element={<EditEducation />} />
          <Route path="/edit-experience" element={<EditExperience />} />
          <Route path="/edit-credentials" element={<EditCredentials />} />
          <Route path="/edit-languages" element={<EditLanguages />} />
          <Route path="/edit-address" element={<EditAddress />} />
          <Route path="/edit-quote" element={<EditQuote />} />
          <Route path="/edit-picture" element={<EditPicture />} />
          <Route
            path="/appointment-confirm-error"
            element={<AppointmentConfirmErrorPage />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </SizeContainer>
    </Router>
  );
}

const SizeContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
