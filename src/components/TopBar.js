import React, { useState } from 'react'
import { useCurrentUser } from './../hooks/queryHooks'
import { Link } from "react-router-dom"
import ReactModal from 'react-modal';
import axios from 'axios'
import NewCommunityForm from './forms/NewCommunityForm'
import { useSubscribedCommunities} from './../hooks/queryHooks'
import { House } from "phosphor-react";

const TopBar = () => {
    const {isLoading: isUserLoading, data: userData} = useCurrentUser()
    const [isNewCommunityOpen, setIsNewCommunityOpen] = useState(false)
    const {refetch: refetchSubbedComms} = useSubscribedCommunities()
    if (isUserLoading){
        return <p>Loading...</p>
    }
    console.log(userData)

    const handleNewCommunityOpen = () => {
        setIsNewCommunityOpen(true)
    }

    const handleSubmitNewCommunityRequest = (title, sidebar) => {
        submitCommunity(title, sidebar)
    }

    const submitCommunity = (title, sidebar) => {
        axios.post('/api/community', {
            title,
            sidebar
        }).then(() => {
            setIsNewCommunityOpen(false)
            refetchSubbedComms()
        })
    }

    const renderLogButtons = () => {
        if (userData.logged_in) {
            return <a className="log-button" href="/logout">logout</a>
        }else {
            return <a className="log-button" href="/login">login/signup</a>
        }
    }

    return ( 
        <div className="bg-primary f-width top-bar">
            <button
                className="top-bar-button round smooth-shadow-subtle"
                onClick={handleNewCommunityOpen}
            >New Community</button>
            <Link to="/"><House className="top-bar-home" size={78} weight="fill" color="#ffffff"/></Link>
            <div>
                <p
                    className="top-bar-user"
                >{userData.logged_in ? `Hello ${userData.username}` : 'You are not signed in yet'}</p>
                {renderLogButtons()}
            </div>
            <ReactModal
                overlayClassName="modal-overlay"
                className="modal smooth-shadow"
                onRequestClose={() => {setIsNewCommunityOpen(false)}}
                isOpen={isNewCommunityOpen}
            >
                <NewCommunityForm 
                    submitCommunity={handleSubmitNewCommunityRequest}
                />
            </ReactModal>
        </div>
     );
}
 
export default TopBar;