import React, { useState } from 'react';

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        const response = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({
                comment: { postedBy: name, text: commentText },
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const body = await response.json();
        setArticleInfo(body);
        setName('');
        setCommentText('');
    }
    
    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Comment:
                <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)} />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;