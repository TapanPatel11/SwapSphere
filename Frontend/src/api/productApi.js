const getProductDetails = async (productID) => {
    try {
      const response = await fetch(`http://localhost:8080/product/product/${productID}`);
      const data = await response.json();
      if (data.error) {
        throw new Error('An error occurred while fetching the product.');
      } else {
        return data;
      }
    } catch (error) {
      throw new Error('An error occurred while fetching the product.');
    }
  };
  
  const getCommentsForProduct = async (productID) => {
    try {
      const response = await fetch(`http://localhost:8080/comment/getAll/${productID}`);
      const data = await response.json();
      if (data.success) {
        const sortedComments = data.comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        return sortedComments;
      } else {
        throw new Error('An error occurred while fetching the comments.');
      }
    } catch (error) {
      throw new Error('An error occurred while fetching the comments.');
    }
  };
  
  const addComment = async (productID, useremail, commentText) => {
    try {
      const response = await fetch('http://localhost:8080/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: productID,
          useremail: useremail,
          commentText: commentText,
        }),
      });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        throw new Error('An error occurred while submitting the comment.');
      }
    } catch (error) {
      throw new Error('An error occurred while submitting the comment.');
    }
  };
  
  const editComment = async (commentId, newCommentText) => {
    try {
      const response = await fetch(`http://localhost:8080/comment/update/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentText: newCommentText,
        }),
      });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        throw new Error('An error occurred while updating the comment.');
      }
    } catch (error) {
      throw new Error('An error occurred while updating the comment.');
    }
  };
  
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:8080/comment/delete/${commentId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        return true;
      } else {
        throw new Error('An error occurred while deleting the comment.');
      }
    } catch (error) {
      throw new Error('An error occurred while deleting the comment.');
    }
  };
  
  export { getProductDetails, getCommentsForProduct, addComment, editComment, deleteComment };

  