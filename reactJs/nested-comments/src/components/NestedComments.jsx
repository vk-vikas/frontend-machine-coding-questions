import Comment from "./Comment";
import { useCommentsTree } from "../hooks/useCommentsTree";
import { useState } from "react";

const data = [
  {
    id: 1,
    content: "This is the first comment",
    votes: 5,
    timestamp: "2024-06-16T10:00:00Z",
    replies: [
      {
        id: 2,
        content: "This is a reply to the first comment",
        votes: 3,
        timestamp: "2024-06-16T11:00:00Z",
        replies: [],
      },
      {
        id: 3,
        content: "This is another reply to the first comment",
        votes: 8,
        timestamp: "2024-06-16T12:00:00Z",
        replies: [],
      },
    ],
  },
];

const NestedComments = ({}) => {
  const [rootText, setRootText] = useState("");
  const { comments, addComment, editComment, deleteComment } =
    useCommentsTree(data);

  const handleRootComment = () => {
    addComment(null, rootText);
    setRootText("");
  };

  return (
    <div>
      <div>
        <textarea
          rows={3}
          cols={50}
          placeholder="enter comment"
          value={rootText}
          onChange={(e) => setRootText(e.target.value)}
        />
        <button onClick={handleRootComment}>Add Comment</button>
      </div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onAdd={addComment}
          onEdit={editComment}
          onDelete={deleteComment}
        />
      ))}
    </div>
  );
};

export default NestedComments;
