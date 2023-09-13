// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const UserListings = () => {
    const [myUserListingsItems, setMyUserListingsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const { useremail, name } = location.state;

    useEffect(() => {
        // Run the token verification logic when the component is loaded
        if (
            localStorage.getItem("authToken") === "" ||
            localStorage.getItem("role") !== "user"
        ) {
            navigate("/user/login");
        }
        const authTokenData = {
            token: localStorage.getItem("authToken"),
        };
        axios
            .post("http://localhost:8080/user/checkTokens", authTokenData)
            .then((response) => {
                const tokenstatus = response.data.status;
                console.log(tokenstatus);
                if (tokenstatus != "true") {
                    navigate("/user/login");
                }
            })
            .catch((error) => {
                console.log(error);
            });




        fetch("http://localhost:8080/product/products/getAll/" + useremail)
            .then((response) => response.json())
            .then((data) => {
                setMyUserListingsItems(data.products);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    const navigate = useNavigate();
    const handleCreateListing = () => {
        navigate("/CreateListing");
    };

    return (
        <div>
            <Navbar />
            <div className="p-4" style={{ marginTop: "70px" }}>
                <h1 className="text-2xl font-bold mb-4">Listings of {name}</h1>
                {isLoading ? (
                    <p>Loading your listings...</p>
                ) : (
                    <>
                        {myUserListingsItems && myUserListingsItems.length > 0 ? (
                            <div className="grid grid-cols-3 gap-4">
                                {myUserListingsItems.map((item) => (
                                    <div key={item._id} className="bg-white border rounded p-4">
                                        <Card product={item} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center mt-8">
                                <p className="mb-4 text-lg">
                                    You haven't added any listings yet.
                                </p>
                                <button
                                    onClick={handleCreateListing}
                                    className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 focus:outline-none"
                                >
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    Create your first listing now!
                                </button>
                            </div>
                        )}
                    </>
                )}
                <ToastContainer />
            </div>
            <Footer />
        </div>
    );
};

export default UserListings;
