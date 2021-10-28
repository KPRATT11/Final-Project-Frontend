import React, { useState } from 'react'

const EditPostForm = (props) => {
    const [title, setTitle] = useState(props.initialTitle)
    const [content, setContent] = useState(props.initialContent)

    const handlePostEdit = () => {
        if (title.length > 8 && content.length > 8){
            props.editPost(title, content)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    return ( 
        <div>
            <input
                onChange={handleTitleChange} 
                value={title} 
                type="text" />
            <textArea
                onChange={handleContentChange}
                value={content}
            >
                {content}
            </textArea>
            <button
                onClick={handlePostEdit}
            >EDIT</button>
        </div>
     );
}
 
export default EditPostForm;