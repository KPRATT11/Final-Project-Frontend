import React, { useState} from 'react';
import { useParams} from "react-router-dom"
import {useSingleCommunity, usePosts } from "./../../hooks/queryHooks"
import ReactModal from 'react-modal';
import PreviewPostContainer from "./../posts/PreviewPostContainer"
import FocusedPost from "./../posts/FocusedPost"
import NewPostForm from "./../forms/NewPostForm"
import axios from "axios"
import "./communityBar.css"

const CommunityView = () => {
    const { comm_id } = useParams()
    const {isLoading: isCommunityLoading, isError: isCommunityError, data: communityData, refetch: communityRefetch} = useSingleCommunity(comm_id)
    
    console.log(communityData)

    const {refetch: postsRefetch} = usePosts(comm_id)

    const [focusedPost, setFocusedPost] = useState('')
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

    if (isCommunityLoading) return <h1>Community Loading</h1>
    if (isCommunityError) return <h1>Error Loading Community</h1>

    const handlePostClick = (targetPostID) => {
        setFocusedPost(targetPostID)
    }

    const handleOpenCreateNewPost = () => {
        setIsCreatePostOpen(true)
    }

    const submitNewPost = (title, content) => {
        axios.post('/api/post', {
            title: title,
            content: content,
            community: comm_id
        }).then((response) => {
            postsRefetch()
        })
        setIsCreatePostOpen(false)
    }

    const setBlankFocusedPost = () => {
        setFocusedPost('')
    }

    const handleFollowChangeRequest = () => {
        if (communityData.user_following){
            deleteFollowing()
        }else{
            createNewFollow()
        }
    }

    const createNewFollow = () => {
        axios.post(`/api/follow?target_id=${comm_id}`).then(() => {
            communityRefetch()
        })
    }

    const deleteFollowing = () => {
        axios.delete(`/api/follow?target_id=${comm_id}`).then(() => {
            communityRefetch()
        })
    }

    const getCommButtonClassName= () => {
        if (!communityData.user_following){
            return `comm-button smooth-shadow-subtle round`
        }else {
            return `comm-button smooth-shadow-subtle round comm-button-subtle`
        }
    }

    return (
        <div>
            <div className="comm-header f-width bg-comm">
                {communityData.logged_in ? 
                    <button
                        className={getCommButtonClassName()}
                        onClick={handleFollowChangeRequest}
                    >{communityData.user_following ? 'Unfollow' : 'Follow'}</button> :
                    <p></p>
                }
                <h1
                    className="comm-title"
                >{communityData.title}</h1>

                {communityData.logged_in && 
                    <button
                        className="comm-button smooth-shadow-subtle round"
                        onClick={handleOpenCreateNewPost}
                    >Create Post</button>
                }
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr"
            }}>
                <PreviewPostContainer handlePostClick={handlePostClick} />
                <FocusedPost
                    key={focusedPost} 
                    setBlank={setBlankFocusedPost}
                    postID={focusedPost}/>
            </div>
            <ReactModal
                overlayClassName="modal-overlay"
                className="modal smooth-shadow"
                isOpen={isCreatePostOpen}
                onRequestClose={() => {setIsCreatePostOpen(false)}}
            >
                <NewPostForm 
                    submitPost={submitNewPost} 
                />    
            </ReactModal>
        </div> 

     );
}
 
export default CommunityView;