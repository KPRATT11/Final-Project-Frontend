import React, { useState } from 'react'

const NewCommunityForm = (props) => {
    const [title, setTitle] = useState('')
    const [sideBar, setSideBar] = useState('')

    const handleNewCommunitySubmit = () => {
        if (title.length < 10 && title.length > 5 && sideBar.length > 8){
            props.submitCommunity(title, sideBar)
        }
    }

    const handleSideBarChange = (e) => {
        setSideBar(e.target.value)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    return ( 
        <div className="form">
            <h1>Create a new Community</h1>
            <h2>Community Name</h2>
            <input 
                className="form-input"
                onChange={handleTitleChange}
                type="text"
                value={title}
                />

            <h2>Community Description</h2>
            <textArea
                cols={48}
                rows={8}
                className="form-input"
                onChange={handleSideBarChange}
                value={sideBar}
            >
                {sideBar}
            </textArea>
            <button
                className="submit"
                onClick={handleNewCommunitySubmit}
            >Submit Community</button>
        </div>
     );
}
 
export default NewCommunityForm;