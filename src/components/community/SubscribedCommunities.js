import React from 'react';
import { useSubscribedCommunities } from './../../hooks/queryHooks'
import CommunityPreview from './CommunityPreview'
const SubscribedCommunities = () => {
    const {isLoading: isSubCommLoading, isError: isSubCommError, data: subCommData} = useSubscribedCommunities()

    console.log(subCommData)

    if (isSubCommLoading) return <h1>Loading</h1>
    if (isSubCommError) return <h1>Error Loading Communities</h1>

    const renderCommunities = () => {
        if (subCommData.logged_in){
            return subCommData.communities.map(comm => {
                return(
                <CommunityPreview 
                    key={comm.id}
                    commData={comm}
                />
                )
            })
        }
        else {
            return <h1>
                Log in to see your subscribed Communities
            </h1>
        }
    }

    return ( 
        <div className="comm-container">
            {renderCommunities()}
        </div>
    );
}
 
export default SubscribedCommunities;