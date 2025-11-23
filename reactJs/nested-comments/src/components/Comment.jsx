import React from "react";
import { useState } from "react";

const Comment = ({ comment, onAdd, onEdit, onDelete }) => {
  const [replyText, setReplyText] = useState("");
  const [editText, setEditText] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsReplying = () => setIsReplying(!isReplying);
  const toggleIsEditing = () => setIsEditing(!isEditing);

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onAdd(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  const handleEditSubmit = () => {
    if (!editText.trim()) return;
    onEdit(comment.id, editText);
    setIsEditing(false);
  };

  const handleDelete = () => onDelete(comment.id);

  return (
    <div className="comment">
      {/* view mode */}
      {!isEditing && (
        <>
          <div>
            <p>{comment.content}</p>
            <p>{new Date(comment.timestamp).toLocaleString()}</p>
            <p>{comment.votes}</p>
          </div>
          <div className="comment-actions">
            <button onClick={toggleIsReplying}>reply</button>
            <button onClick={toggleIsEditing}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </div>
        </>
      )}
      {/* edit mode */}
      {isEditing && (
        <>
          <div>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ marginRight: 8 }}
            />

            <button onClick={handleEditSubmit}>Save</button>
            <button onClick={toggleIsEditing}>Cancel</button>
          </div>
        </>
      )}
      {/* reply mode */}
      {isReplying && !isEditing && (
        <>
          <div>
            <div>
              <textarea
                rows={3}
                cols={50}
                placeholder="enter comment"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReplySubmit}>Add Comment</button>
            </div>
          </div>
        </>
      )}
      {comment.replies &&
        comment.replies.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default Comment;
