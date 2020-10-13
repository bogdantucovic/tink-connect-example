import React from "react";
import { Button } from "reactstrap";
import ReactRouterPropTypes from "react-router-prop-types";
import { Header } from "./Header";
import { FinancialOverview } from "./FinancialOverview";
import { useCallback } from "../hooks/useCallback";

const getHeaderProps = error =>
  error
    ? {
        text: "Something went wrong",
        emoji: "sad"
      }
    : {
        text: "Your bank was successfully connected!",
        emoji: "tada"
      };

export const Callback = ({ location }) => {
  const { loading, error, data } = useCallback(location);
  const message = new URLSearchParams(location).get("message");
  const headerProps = getHeaderProps(error);
  let ssn = '';

  try {
    ssn = data.response.availableIdentityData[0].ssn;
  }catch(err) {

  }

  return (
    <div>
      <Header {...headerProps} />
      <div>SSN is {ssn}</div>
      <p style={{ fontSize: "18px", paddingTop: "40px" }}>{message}</p>
      <Button style={{ margin: "30px" }} href="/">
        Take me back
      </Button>
    </div>
  );
};

Callback.propTypes = {
  location: ReactRouterPropTypes.location.isRequired
};

export default Callback;
