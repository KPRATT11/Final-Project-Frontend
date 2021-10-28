import React, {useState} from 'react';
import ReactModal from 'react-modal';
import CommentSection from './../comments/CommentSection'
import { useParams } from "react-router-dom"
import { useSinglePost, usePosts } from './../../hooks/queryHooks'
import NewCommentForm from './../forms/NewCommentForm'
import EditPostForm from './../forms/EditPostForm'
import formatDate from './../../lib/dateHelp';
import axios from 'axios';
import { ArrowUp, ArrowDown, Trash, Pencil, ChatDots } from "phosphor-react";
import { motion } from "framer-motion"

const FocusedPost = ({postID, setBlank}) => {
    const { comm_id } = useParams()
    const {isLoading: isPostLoading, data: postData, refetch: postRefetch} = useSinglePost(postID)
    const {refetch: postListRefetch} = usePosts(comm_id)

    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    
    if (postID === '') return <h1 className="post-select-info">Select A Post</h1>
    if (isPostLoading) return <h1>Loading</h1> 
    
    const handleOpenReply = () => {
        setIsReplyOpen(true)
    }

    const handleOpenEdit =() => {
        setIsEditOpen(true)
    }

    const submitNewReply = (content) => {
        axios.post('/api/comment', {
            content,
            target_id: postID
        }).then(() => {
            setIsReplyOpen(false)
            postRefetch()

        })
    }

    
    const handleVote = (is_like) => {
        if (postData.hasUserVoted === "false"){
            submitVote(is_like)
        }
        else if(postData.hasUserVoted.is_like === is_like){
            deleteVote(true)
        }
        else if(postData.hasUserVoted.is_like !== is_like){
            deleteVote(false)
            submitVote(is_like)
        }
    }

    const deleteVote = (shouldRefetch) => {
        axios.delete('/api/vote', {
            data: {
                for_post: true,
                target_id: postID
            }
        }).then(() => {
            if (shouldRefetch){
                postRefetch()
            }
        })
    }

    const submitVote = (is_like) => {
        axios.post('/api/vote', {
            is_like,
            for_post: true,
            target_id: postID
        }).then((result, err) => {
            postRefetch()
        })
    }

    const handleDeleteRequest = () => {
        deletePost()
    }

    const deletePost = () => {
        axios.delete(`/api/post?id=${postID}`).then((response) => {
            setBlank()
            postRefetch()
            postListRefetch()
        })
    }

    const handleEditRequest = (title, content) => {
        editPost(title, content)  
    }

    const editPost = (title, content) => {
        axios.patch(`/api/post`, {
            id: postID,
            title,
            content
        }).then(() => {
            setIsEditOpen(false)
            postRefetch()
        })
    }

    return ( 
        <div className="focused-post-container ">
            <motion.div 
            initial={{y:6350, scale: 0}}
            animate={{y: 0, scale: 1}}
            transition={{ type: 'spring', damping: 30, stiffness: 300}}
            className="focused-post round smooth-shadow-small scale-in-top">
                {postData.userOwns && <button
                    className="post-top-function-button"
                    onClick={() => handleOpenEdit()}
                ><Pencil size={22} color="#eeeeec" weight="fill" /></button>}
                {postData.userOwns && <button
                    className="post-top-function-button"
                    onClick={() => handleDeleteRequest()}
                ><Trash size={22} color="#eeeeec" weight="fill" /></button>}

                <p className="post-date">{formatDate(postData.posted_at)}</p>
                <h2 className="post-title">{postData.title}</h2>
                <p className="post-content">{postData.content}</p>
                {postData.logged_in && 
                    <div className={"button-container"}>
                        <button
                            className="vote-button"
                            onClick={() => {handleVote(true)}} 
                            style={{backgroundColor: postData.hasUserVoted.is_like === true ? '#F24236' : '#F8938C'}}
                            ><ArrowUp color="#ffffff" size={34} weight="fill" /></button>
                        <button 
                            className="vote-button"
                            onClick={() => {handleVote(false)}}
                            style={{backgroundColor: postData.hasUserVoted.is_like === false ? '#2E86AB' : '#5EB1D4'}}
                            ><ArrowDown color="#ffffff" size={34} weight="fill" /></button>
                                        <button
                        className="post-function-button"
                        onClick={handleOpenReply}
                        ><ChatDots size={28} color="#eeeeec" weight="fill" /></button>

                    <p
                        className="post-author"
                    >By {postData.author.username}</p>
                    </div>
                }
            </motion.div>

            <div className="comment-section">
                <CommentSection 
                    logged_in={postData.logged_in}
                    refetchPost={postRefetch}
                    replies={postData.replies}/>
            </div>
            <ReactModal
                overlayClassName="modal-overlay"
                className="modal smooth-shadow"
                id={"id"}
                isOpen={isReplyOpen}
                onRequestClose={() => {setIsReplyOpen(false)}}
            >
                <NewCommentForm 
                    submitNewReply={submitNewReply}
                />
            </ReactModal>

            <ReactModal
                overlayClassName="modal-overlay"
                className="modal smooth-shadow"
                isOpen={isEditOpen}
                onRequestClose={() => {setIsEditOpen(false)}}
            >
                <EditPostForm 
                    initialTitle={postData.title}
                    initialContent={postData.content}
                    editPost={handleEditRequest}
                />
            </ReactModal>
        </div>
     );
}
 
export default FocusedPost;