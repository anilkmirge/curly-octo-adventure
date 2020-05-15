import React from 'react';

const CommentsList = ({ comments }) => (
    <>
    <h3>Comments:</h3>
    {comments.map((comment, i) => (
        <div className="comment" key={i}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.text}</p>
        </div>
    ))}
    </>
);

export default CommentsList;
