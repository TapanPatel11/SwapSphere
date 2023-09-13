<div className="row m-0">
<div className="col-lg-12 custom-color max-height p-0 d-flex align-items-center">
  <div className="container-fluid m-0 p-4">
    <div className="d-flex flex-column align-items-center justify-content-center">
      <p className="fs-1 font">User Profile Page</p>
    </div>
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="user-profile">
        <div className="profile-picture ratio ratio-1x1">
          <img src={profilePicture} alt="Profile" />
          {isEditMode && (
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
          )}
        </div>

        <div className="profile-info">

          <div className="profile-field row">
            <label className="col-lg-5">First Name:</label>
            {isEditMode ? (
              <input
                type="text"
                name="firstName"
                className="col-lg-7"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            ) : (
              <span className="col-lg-7">{firstName}</span>
            )}
          </div>
          
          <div className="profile-field row">
            <label className="col-lg-5">Last Name:</label>
            {isEditMode ? (
              <input
                type="text"
                name="lastName"
                className="col-lg-7"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <span className="col-lg-7">{lastName}</span>
            )}
          </div>
          <div className="profile-field row">
            <label className="col-lg-5">Email:</label>
            <span className="col-lg-7">{email}</span>
          </div>
          <div className="profile-field row">
            <label className="col-lg-5">Password:</label>
            {isEditMode ? (
              <input
                name="password"
                className="col-lg-7"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <span className="col-lg-7"> ************ </span>
            )}
          </div>
          <div className="profile-field row">
            <label className="col-lg-5">Mobile:</label>
            {isEditMode ? (
              <input
                type="tel"
                name="mobile"
                className="col-lg-7"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            ) : (
              <span className="col-lg-7">{mobile}</span>
            )}
          </div>
        </div>
        <div className="edit-button">
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