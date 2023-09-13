import React, { useState } from 'react';
import { IconButton, TextField, Avatar, Typography, Box, Divider } from '@mui/material';
import { Edit, Delete, Save, Favorite } from '@mui/icons-material';

const Comment = ({ comment, loggedInUser, editedCommentId, editedCommentText, toggleEditMode, handleEditComment, handleDeleteComment }) => {
  const [editedText, setEditedText] = useState(editedCommentText);

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <Favorite />
        </Avatar>
        {editedCommentId === comment._id ? (
          <TextField
            multiline
            fullWidth
            value={editedText}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            {comment.commentText}
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Posted by: {comment.useremail}, Date: {new Date(comment.createdAt).toLocaleString()}
        </Typography>
        {comment.useremail === loggedInUser && (
          <div>
            {editedCommentId === comment._id ? (
              <IconButton color="primary" onClick={() => handleEditComment(comment._id, editedText)}>
                <Save />
              </IconButton>
            ) : (
              <IconButton color="black" onClick={() => toggleEditMode(comment._id, comment.commentText)}>
                <Edit />
              </IconButton>
            )}
            {!editedCommentId && (
              <IconButton color="error" onClick={() => handleDeleteComment(comment._id)}>
                <Delete />
              </IconButton>
            )}
          </div>
        )}
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Box>
    </React.Fragment>
  );
};

export default Comment;
