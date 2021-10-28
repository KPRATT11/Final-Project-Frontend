import React, { useState } from 'react'

const NewPostForm = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handlePostSubmit = () => {
        if (title.length > 8 && content.length > 8){
            props.submitPost(title, content)
        }
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    return ( 
        <div className="form">
            <h1>New Post</h1>
            <h2>Title</h2>
            <input 
                className="form-input"
                type="text" 
                value={title}
                onChange={handleTitleChange}    
            />
            <h2>Content</h2>
            <textArea
                cols={48}
                rows={8}
                className="form-input"
                value={content}
                onChange={handleContentChange}
            ></textArea>
            <button
                className="submit"
                onClick={handlePostSubmit}
            >POST</button>
        </div>
     );
}
 
export default NewPostForm;