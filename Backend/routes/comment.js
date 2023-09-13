const express = require('express');
const router = express.Router();
const swaggerAnnotations = require('../swagger-annotations');
const comment = require('../models/comment');

// add a new product to the wishlist 
router.post('/add', async (req, res) => {
  try {
    const { productID, useremail, commentText } = req.body;

    // Create a new comment instance
    const newComment = new comment({
      productID,
      useremail,
      commentText,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    res.json({ success: true, comment: savedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Failed to add the comment: ${error}` });
  }
});

// Get all comments
router.get('/getAll', async (req, res) => {
  try {
    const allComments = await comment.find();
    res.json({ success: true, comments: allComments });
  } catch (error) {
    res.status(500).json({ success: false, error: `Failed to get all comments: ${error}` });
  }
});

// Get comments by productID
router.get('/getAll/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;

    // Find comments for the specified productID
    const comments = await comment.find({ productID:productID });

    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, error: `Failed to get comments by productID: ${error}` });
  }
});


// Update a comment by its ID
router.put('/update/:commentID', async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const { productID, useremail, commentText } = req.body;

    const updatedComment = await comment.findByIdAndUpdate(
      commentID,
      { productID, useremail, commentText },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    res.json({ success: true, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Failed to update the comment: ${error}` });
  }
});

// Delete a comment by its ID
router.delete('/delete/:commentID', async (req, res) => {
  try {
    const commentID = req.params.commentID;

    const deletedComment = await comment.findByIdAndDelete(commentID);

    if (!deletedComment) {
      return res.status(404).json({ success: false, error: 'Comment not found' });
    }

    res.json({ success: true, comment: deletedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: `Failed to delete the comment: ${error}` });
  }
});

module.exports = router;
