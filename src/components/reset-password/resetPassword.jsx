import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Perform password reset logic here
    if (newPassword === confirmPassword) {
      // Reset password
      console.log("Password reset successful!");
    } else {
      // Show error message or handle password mismatch
      console.log("Passwords do not match!");
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <form onSubmit={handleResetPassword}>
            <p className="h4 text-center mb-4">Reset Password</p>
            <div className="grey-text">
              <MDBInput
                label="New Password"
                icon="lock"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mb-4"
              />
              <MDBInput
                label="Confirm Password"
                icon="lock"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mb-4"
              />
            </div>
            <div className="text-center mt-4">
              <MDBBtn type="submit" color="primary">
                Reset Password
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ResetPasswordPage;
