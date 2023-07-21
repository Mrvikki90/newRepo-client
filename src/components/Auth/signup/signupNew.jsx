/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import userSchema from "../../../Schema/FormSchema";
import "./page.css";
import { BASE_URL } from "../../constants/constant";

const SignupNew = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  const HandleAddData = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profileImg", data.profileImg[0]);

    console.log(formData);

    const response = await axios.post(`${BASE_URL}/api/post`, formData);
    reset();
    if (response.status === 200) {
      return toast(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <MDBContainer fluid className="p-3 my-5">
        <ToastContainer />
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </MDBCol>
          <MDBCol col="4" md="6">
            <form onSubmit={handleSubmit(HandleAddData)}>
              <FormControl isInvalid={errors.name}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  {...register("name")}
                />
                <FormErrorMessage mb="2">
                  {errors && errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email Address"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  {...register("email")}
                />
                <FormErrorMessage mb="2">
                  {errors && errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <MDBInput
                  wrapperClass="mb-2"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  {...register("password")}
                />
                <FormErrorMessage mb="2">
                  {errors && errors.password?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.profileImg}>
                <MDBInput
                  wrapperClass="mb-2 mt-2"
                  id="formControlLg"
                  {...register("profileImg")}
                  type="file"
                  placeholder="upload image"
                />
                <FormErrorMessage>
                  {errors && errors.profileImg?.message}
                </FormErrorMessage>
              </FormControl>
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Sign in
              </MDBBtn>

              <p className="small fw-bold mt-2 pt-1 mb-2">
                Already have an account?{" "}
                <a href="/login" className="link-danger">
                  Login
                </a>
              </p>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">OR</p>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: "#3b5998" }}
              >
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Continue with facebook
              </MDBBtn>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default SignupNew;
