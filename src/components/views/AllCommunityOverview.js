import React, { useState } from 'react';
import SubscribedCommunities from './../community/SubscribedCommunities'
import ReccomendedCommunities from './../community/ReccomenedCommunities'
import SearchedCommunities from './../community/SearchedCommunities'
import NewCommunityForm from './../forms/NewCommunityForm'
import ReactModal from 'react-modal';
import axios from 'axios'
import { useSubscribedCommunities, useCurrentUser } from './../../hooks/queryHooks'

const AllCommunityOverview = () => {
    const {isLoading: isUserLoading, isError: isUserError, data: userData} = useCurrentUser()
    const {refetch: refetchSubbedComms} = useSubscribedCommunities()
    const [tab, setTab] = useState('sub')
    const [isNewCommunityOpen, setIsNewCommunityOpen] = useState(false)

    const renderSection = () => {
        switch (tab) {
            case 'sub':
                return <SubscribedCommunities />
            case 'rec':
                return <ReccomendedCommunities />
            case 'src':
                return <SearchedCommunities />
            default: return <h1>Error</h1>
        }
    }

    const handleTabSwitch = (targetTab) => {
        setTab(targetTab)
    }

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

    return ( 
        <div>

            <div className="tab-container">
                <button
                    className="tab"
                    onClick={() => {handleTabSwitch('sub')}}
                    disabled={tab === 'sub'}
                >Subbed</button>
                <button
                    className="tab"
                    onClick={() => {handleTabSwitch('rec')}}
                    disabled={tab === 'rec'}
                >Recommended</button>
                <button
                    className="tab"
                    onClick={() => {handleTabSwitch('src')}}
                    disabled={tab === 'src'}
                >Search</button>
            </div>
            {renderSection()}

            <ReactModal
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
 
export default AllCommunityOverview;