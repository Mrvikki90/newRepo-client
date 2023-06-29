import React from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="nav">
        <div className="nav__blocks" onClick={handleLogout}>
          <img
            src="https://logowik.com/content/uploads/images/chat8883.jpg"
            alt="logo"
          ></img>
        </div>
        <div className="nav__blocks"></div>
        <div className="nav__blocks"></div>
      </div>
    </>
  );
};

export default NavBar;
