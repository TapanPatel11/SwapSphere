import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "../UserProfile/UserProfile.css";
const UserProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    const headersData = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    axios
      .get(
        "https://swapsphere-backend.onrender.com/user/getUserDetailwithToken",
        headersData
      )
      .then((response) => {
        const userData = response.data;
        setProfilePicture(userData.userProfilePhoto);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword(userData.password);
        setMobile(userData.mobile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const setEditableState = () => {
    setIsEditMode((isEditMode) => !isEditMode);
    console.log(isEditMode);
  };

  const saveProfile = async () => {
    const formDataToSend = {
      token: localStorage.getItem("authToken"),
      profilePicture: profilePicture,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobile: mobile,
    };

    try {
      await axios.post(
        "https://swapsphere-backend.onrender.com/user/setUserDetailwithToken",
        formDataToSend
      );
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div class="container-fluid box p-0 m-0 max-height ">
      <div class="row m-0 login-theme-color">
        <div className="col-lg-5 d-lg-flex justify-content-center align-items-center  p-0">
          <div className=" d-flex flex-column align-items-center ms-lg-5 mt-md-3">
            <div className="thumbnail-container mb-3">
              <img src={profilePicture} alt="" className="thumbnail-image" />
            </div>
            {isEditMode && (
              <div className="mb-3">
                <button>
                  <label htmlFor="imageInput">Choose Image</label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        <div class="col-lg-7  max-height p-0 d-flex align-items-center ">
          <div class="container-fluid m-0 p-lg-4 p-md-0 ">
            <div className=" text-white flex-responsive d-flex flex-column align-items-center justify-content-center">
              <p class="me-lg-5 fs-1 font">User Profile Page</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center  me-lg-5">
              <div class=" m-3 w-75 ">
                <label for="email " class=" mb-1 text-white   ">
                  First Name:
                </label>

                {isEditMode ? (
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                ) : (
                  <div>{firstName}</div>
                )}
              </div>

              <div class=" m-3 w-75 ">
                <label for="email " class=" mb-1 text-white   ">
                  Last Name:
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                ) : (
                  <div>{lastName}</div>
                )}
              </div>

              <div class=" m-3 w-75 ">
                <label for="email " class=" mb-1 text-white   ">
                  Email:
                </label>
                <div>{email}</div>
              </div>

              <div class=" m-3 w-75 ">
                <label for="password " class=" mb-1 text-white   ">
                  Password:
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                ) : (
                  <div>{password}</div>
                )}
              </div>

              <div class=" m-3 w-75 ">
                <label for="email " class=" mb-1 text-white   ">
                  Mobile:
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                ) : (
                  <div>{mobile}</div>
                )}
              </div>
              <div className="btn btn-light mr-5  mx-1">
                {isEditMode ? (
                  <button
                    onClick={() => {
                      setEditableState();
                      saveProfile();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button onClick={setEditableState}>Edit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
