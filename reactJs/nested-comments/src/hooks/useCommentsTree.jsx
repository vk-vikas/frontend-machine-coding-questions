import { useState } from "react";

export const useCommentsTree = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  const addComment = (parentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    const addRecursively = (items) =>
      items.map((item) =>
        item.id === parentId
          ? { ...item, replies: [...item.replies, newComment] }
          : { ...item, replies: addRecursively(item.replies) }
      );

    setComments((prev) =>
      parentId ? addRecursively(prev) : [newComment, ...prev]
    );
  };

  const editComment = (id, newText) => {
    const editRecursively = (items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, content: newText }
          : { ...item, replies: editRecursively(item.replies) }
      );

    setComments((prev) => editRecursively(prev));
  };

  const deleteComment = (id) => {
    const deleteRecursively = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          replies: deleteRecursively(item.replies),
        }));

    setComments((prev) => deleteRecursively(prev));
  };

  return { comments, addComment, editComment, deleteComment };
};
