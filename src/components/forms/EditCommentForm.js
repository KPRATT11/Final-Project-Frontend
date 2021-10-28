import React, { useState } from 'react'

const EditCommentForm = (props) => {
    const [commentValue, setCommentValue] = useState(props.initialCommentValue)


    const handleCommentChange = (e) => {
        setCommentValue(e.target.value)
    }

    const handleCommentSubmit = () => {
        if (commentValue.length > 8){
            props.handleEdit(commentValue)
        }
    }

    return ( 
        <div className="form">
            <textArea 
                cols={48}
                rows={8}
                className="form-input"
                onChange={handleCommentChange}
                value={commentValue}
            >
                {commentValue}
            </textArea>
            <button
                className="submit"
                onClick={() => handleCommentSubmit()}
            >EDIT</button>
        </div>
     );
}
 
export default EditCommentForm;