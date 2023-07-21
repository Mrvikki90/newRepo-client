import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, useLocation } from "react-router-dom";
import { AES, enc } from "crypto-js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const encryptedData = new URLSearchParams(location.search).get("data");

  useEffect(() => {
    const decryptEmail = (encryptedEmail) => {
      // Replace "my_super_key" with your actual decryption key
      const decryptedBytes = AES.decrypt(encryptedEmail, "my_super_key");
      const originalEmail = decryptedBytes.toString(enc.Utf8);
      return originalEmail;
    };

    if (encryptedData) {
      const decryptedEmail = decryptEmail(encryptedData);
      const emailParts = decryptedEmail.split("|");
      const decryptedEmailSlice = emailParts[0];
      setEmail(decryptedEmailSlice);
    }
  }, [encryptedData]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Perform password reset logic here
    try {
      if (newPassword === confirmPassword) {
        const response = await axios.post(
          "https://socket-chat-app-3v3p.onrender.com/api/reset-password",
          {
            email: email,
            newpass: newPassword,
            confirmpass: confirmPassword,
          }
        );

        if (response.status === 200) {
          toast("Password updated", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } else {
        return toast("New password and Confirm Password do not match", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      return navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default ResetPasswordPage;
