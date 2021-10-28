import React, { useState } from 'react'

const NewCommentForm = (props) => {
    const [content, setContent] = useState('')

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleCommentSubmit = () => {
        if (content.length > 8){
            props.submitNewReply(content)
        }
    }

    return ( 
        <div className="form">
            <h1>Reply</h1>
            <h2>Content</h2>
            <textArea
                cols={48}
                rows={8}
                className="form-input"
                onChange={handleContentChange}
                value={content}
            ></textArea>
            <button
                className="submit"
               onClick={handleCommentSubmit} 
            >REPLY</button>
        </div>
     );
}
 
export default NewCommentForm;