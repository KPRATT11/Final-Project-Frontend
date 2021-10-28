import React, {useState} from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import EditCommentForm from './../forms/EditCommentForm'
import formatDate from './../../lib/dateHelp';
import { ArrowUp, ArrowDown, Trash, Pencil } from "phosphor-react";
import { motion } from "framer-motion"

const Comment = ({data, refetchPost, logged_in, place}) => {
    const [isEditOpen, setIsEditOpen] = useState(false)

    const handleVote = (is_like) => {
        if (data.hasUserVoted === "false"){
            submitVote(is_like)
        }
        else if(data.hasUserVoted.is_like === is_like){
            deleteVote(true)
        }
        else if(data.hasUserVoted.is_like !== is_like){
            deleteVote(false)
            submitVote(is_like)
        }
    }

    const deleteVote = (shouldRefetch) => {
        axios.delete('/api/vote', {
            data: {
                for_post: false,
                target_id: data.id
            }
        }).then(() => {
            if (shouldRefetch){
                refetchPost()
            }
        })
    }

    const submitVote = (is_like) => {
        axios.post('/api/vote', {
            is_like,
            for_post: false,
            target_id: data.id
        }).then((result, err) => {
            refetchPost()
        })
    }

    const handleDeleteRequest = () => {
        deleteComment()
    }

    const deleteComment = () => {
        axios.delete(`/api/comment?id=${data.id}`).then((response) => {
            refetchPost()
        })
    }

    const handleEditOpen = () => {
        setIsEditOpen('true')
    }

    const handleEditRequest = (content) => {
        axios.patch(`/api/comment`, {
            id: data.id,
            content
        }).then(() => {
            setIsEditOpen(false)
            refetchPost()
        })
    }

    return ( 
        <motion.div
            initial={{x: 850}}
            animate={{x: 0}}
            transition={{type: 'spring', delay: 0.1 * place, stiffness: 200, mass: 2, damping: 30}}
            className="comment round smooth-shadow-small"
        >   
            <div className="comment-info-container">
                <p className="comment-author">By {data.username}</p>
                <p className="comment-date">{formatDate(data.submitted_at)}</p> 
            </div>
            <p className="comment-content">{data.content}</p>

            <div className="comment-function-buttons">
            {logged_in && 
                <div>
                    <button
                        className={"vote-button-comment"}
                        onClick={() => {handleVote(true)}}
                        style={{backgroundColor: data.hasUserVoted.is_like === true ? '#F24236' : '#F8938C'}}
                    ><ArrowUp color="#ffffff" size={24} weight="fill" /></button>
                    <button
                        className={"vote-button-comment"}
                        onClick={() => {handleVote(false)}}
                        style={{backgroundColor: data.hasUserVoted.is_like === false ? '#2E86AB' : '#5EB1D4'}}
                    ><ArrowDown color="#ffffff" size={24} weight="fill" /></button>
                </div>
            }

                <div>
                {data.userOwns && <button
                    className="post-top-function-button"
                    onClick={() => {handleEditOpen()}}
                ><Pencil size={22} color="#eeeeec" weight="fill" /></button>}

                {data.userOwns && <button
                    className="post-top-function-button"
                    onClick={() => {handleDeleteRequest()}}
                ><Trash size={22} color="#eeeeec" weight="fill" /></button>}
                </div>
            </div>

            <ReactModal
                overlayClassName="modal-overlay"
                className="modal smooth-shadow"
                isOpen={isEditOpen}
                onRequestClose={() => {setIsEditOpen(false)}}
            > 
                <EditCommentForm 
                    handleEdit = {handleEditRequest}
                    initialCommentValue={data.content}
                />
            </ReactModal>

        </motion.div>
     );
}
 
export default Comment;