//author: Raj Patel <rj540530@dal.ca>

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Product.css";
import { ToastContainer, toast } from "react-toastify";
import Share from "../components/Share";
import { Favorite, Edit, Delete, Send, Save } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  Avatar,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useWishlist from "./useWishlist";

const Product = () => {
  const navigate = useNavigate();
  const { addToWishlist, wishlistLoading } = useWishlist();

  const location = useLocation();
  const { email, productID } = location.state;
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);

  const loggedInUser = localStorage.getItem("email");
  const [commentText, setCommentText] = useState("");
  const backendURL = "http://localhost:8080"; //'https://swapsphere-backend.onrender.com'
  const [comments, setComments] = useState([]);
  const [showShareButtons, setShowShareButtons] = useState(false);
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
          navigate("/user/login"); // Assuming you have a login route defined
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //fetch all comments
    fetch(`${backendURL}/comment/getAll/${productID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const sortedComments = data.comments.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setComments(sortedComments);
          console.log(data.comments);
        } else {
          toast.error("An error occurred while fetching the comments.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching the comments.");
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/product/product/" + productID)
      .then((response) => {
        console.log("response", response.data);
        setProduct(response.data);
        // setTimeout(() => {}, 1000);
        // console.log("product", product);
        setImages(response.data.fileUpload);
        // console.log(images[0]);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .post("http://localhost:8080/user/get", {
        email: email,
      })
      .then((response) => {
        console.log("user", response);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const images = [product_image, product_image1, product_image2];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleCommentSubmit = () => {
    fetch(`${backendURL}/comment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: productID,
        useremail: loggedInUser,
        commentText: commentText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Comment submitted successfully.");
          setCommentText("");
          fetch(`${backendURL}/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort(
                  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                setComments(sortedComments);
              } else {
                toast.error("An error occurred while fetching the comments.");
              }
            })
            .catch((error) => {
              toast.error("An error occurred while fetching the comments.");
              console.log(error);
            });
        } else {
          toast.error("An error occurred while submitting the comment.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while submitting the comment.");
        console.log(error);
      });
  };

  // Function to handle edit comment
  const handleEditComment = (commentId, newCommentText) => {
    fetch(`${backendURL}/comment/update/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentText: newCommentText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Comment updated successfully.");
          fetch(`${backendURL}/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort(
                  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                setComments(sortedComments);
              } else {
                toast.error("An error occurred while fetching the comments.");
              }
            })
            .catch((error) => {
              toast.error("An error occurred while fetching the comments.");
              console.log(error);
            });
        } else {
          toast.error("An error occurred while updating the comment.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while updating the comment.");
        console.log(error);
      });
  };

  // Function to handle delete comment
  const handleDeleteComment = (commentId) => {
    fetch(`${backendURL}/comment/delete/${commentId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Comment deleted successfully.");
          fetch(`${backendURL}/comment/getAll/${productID}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                const sortedComments = data.comments.sort(
                  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                setComments(sortedComments);
              } else {
                toast.error("An error occurred while fetching the comments.");
              }
            })
            .catch((error) => {
              toast.error("An error occurred while fetching the comments.");
              console.log(error);
            });
        } else {
          toast.error("An error occurred while deleting the comment.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the comment.");
        console.log(error);
      });
  };

  // New state to track the edited comment and its id
  const [editedCommentId, setEditedCommentId] = useState("");
  const [editedCommentText, setEditedCommentText] = useState("");

  // Function to toggle the edit mode for a comment
  const toggleEditMode = (commentId, commentText) => {
    if (commentId === editedCommentId) {
      // Save the edited comment when the user clicks on the icon again
      handleEditComment(commentId, editedCommentText);
      setEditedCommentId("");
      setEditedCommentText("");
    } else {
      // Set the comment text to be edited when the user clicks on the "Edit" icon
      setEditedCommentId(commentId);
      setEditedCommentText(commentText);
    }
  };

  const handleReportUser = () => {
    console.log("userId", user._id);
    axios
      .get(`http://localhost:8080/report/user/${user._id}`)
      .then((response) => {
        toast.success("User reported successfully.");
        // Refresh the user details after reporting
        setUser(response.data);
        fetchData();
      })
      .catch((error) => {
        toast.error("An error occurred while reporting the user.");
        console.error(error);
      });
  };

  const handleclickUserListings = () => {
    console.log("user email" + user.email)
    navigate("/userListings", {
      state: { useremail: user.email, name: user.firstName + " " + user.lastName }
    });
  };

  const handleReportProduct = () => {
    console.log("productId", product._id);
    axios
      .get(`http://localhost:8080/report/product/${product._id}`)
      .then((response) => {
        toast.success("Product reported successfully.");
        // Refresh the product details after reporting
        setUser(response.data);
        fetchData();
      })
      .catch((error) => {
        toast.error("An error occurred while reporting the product.");
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      {/* Product Details */}
      <div className="p-4 mt-5">
        <div className="flex flex-wrap">
          <div className="w-1/2">
            <div className="flex flex-col">
              <div className="w-full">
                <img
                  className="w-25 h-25"
                // src={product.fileUpload}
                // alt={product.productName}
                />
                <img
                  src={images[selectedImage]}
                  alt="Selected"
                  className={`selected-image`}
                />
              </div>
              <div className="w-full flex flex-wrap mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-1/4 cursor-pointer p-1 ${index === selectedImage ? " border-2 border-blue-500" : ""
                      }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-40 h-40"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4">
              {product.noOfTimesProductReported > 0 &&
                product.noOfTimesProductReported < 5 && (
                  <p className="text-orange-500 text-base">
                    Alert: This product was reported{" "}
                    {product.noOfTimesProductReported} times.
                  </p>
                )}
              {product.noOfTimesProductReported >= 5 && (
                <p className="text-red-500 text-base">
                  Warning: This product was reported{" "}
                  {product.noOfTimesProductReported} times.
                </p>
              )}
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">{"$" + product.price}</p>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="text-gray-500">Condition: {product.condition}</p>
              <div className="mt-4">
                <button
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => addToWishlist(product)}
                // variant="contained"
                // startIcon={<AddShoppingCart />}
                // color="primary"
                >
                  Add to Wishlist
                </button>
                {/* <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                  Share
                </button> */}
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleReportProduct}
                >
                  Report Product
                </button>
              </div>
              <div className="flex items-center mt-4">
                <button
                  className="bg-black hover:bg-gray-100 text-white mr-2 px-4 py-2 border border-gray-400 rounded shadow"
                  onClick={() => setShowShareButtons(!showShareButtons)}
                >
                  Share
                </button>
                {showShareButtons && (
                  <Share showShareButtons={showShareButtons} />
                )}
              </div>
            </div>
            <div className="p-4">
              {user.noOfTimesUserReported > 0 &&
                user.noOfTimesUserReported < 5 && (
                  <p className="text-orange-500 text-base">
                    Alert: This user was reported {user.noOfTimesUserReported}{" "}
                    times.
                  </p>
                )}
              {user.noOfTimesUserReported >= 5 && (
                <p className="text-red-500 text-base">
                  Warning: This user was reported {user.noOfTimesUserReported}{" "}
                  times.
                </p>
              )}
              <h2 className="text-xl font-semibold">
                {user.firstName + " " + user.lastName}
              </h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.mobile}</p>
              <div className="mt-4">
                <button
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleclickUserListings}
                >
                  User Listings
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleReportUser}
                >
                  Report User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {START OF COMMENT FEATURE} */}
      <Divider className="my-4" />
      <Box sx={{ mt: 4, maxWidth: 600, margin: "0 auto", mb: 7 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left", // Left align the comments horizontally
            mb: 2,
            textAlign: "left", // Left align the comment text
          }}
        >
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          {comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left", // Left align the comments horizontally
                mb: 2,
                textAlign: "left", // Left align the comment text
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <Favorite />
              </Avatar>
              {editedCommentId === comment._id ? (
                // Show an editable text field when the comment is in edit mode
                <TextField
                  multiline
                  fullWidth
                  value={editedCommentText}
                  onChange={(event) => setEditedCommentText(event.target.value)}
                />
              ) : (
                // Show the comment text when not in edit mode
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  {comment.commentText}
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                Posted by: {comment.useremail}, Date:{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
              {comment.useremail === loggedInUser && (
                <div>
                  {editedCommentId === comment._id ? (
                    // Show save button when editing the comment
                    <IconButton
                      color="primary"
                      onClick={() =>
                        toggleEditMode(comment._id, comment.commentText)
                      }
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    // Show edit button when not in edit mode
                    <IconButton
                      color="black"
                      onClick={() =>
                        toggleEditMode(comment._id, comment.commentText)
                      }
                    >
                      <Edit />
                    </IconButton>
                  )}
                  {!editedCommentId && ( // Hide delete button when editing the comment
                    <IconButton
                      color="error"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this comment?"
                          )
                        ) {
                          handleDeleteComment(comment._id);
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </div>
              )}
              <Divider sx={{ mt: 1, mb: 2 }} />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            label="Write a comment"
            variant="outlined"
            multiline
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            sx={{ flex: 1, mr: 1 }}
          />
          <IconButton color="primary" onClick={handleCommentSubmit}>
            <Send />
          </IconButton>
        </Box>
      </Box>
      {/* {END OF COMMENT FEATURE} */}

      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
};

export default Product;
