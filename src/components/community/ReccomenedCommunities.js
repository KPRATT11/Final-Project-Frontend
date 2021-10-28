import React from 'react';
import { useReccomendedCommunities } from './../../hooks/queryHooks'
import CommunityPreview from './CommunityPreview'

const ReccomendedCommunities = () => {

    const {isLoading: isRecCommLoading, isError: isRecCommError, data: recCommData} = useReccomendedCommunities()

    if (isRecCommLoading) return <h1>Loading</h1>
    if (isRecCommError) return <h1>Error Loading Communities</h1>

    const renderCommunities = () => {
        return recCommData.map((comm, i) => {
            return(
            <CommunityPreview 
                place={i}
                key={comm.id}
                commData={comm}
            />
            )
        })
    }

    return ( 
        <div className="comm-container">
            {renderCommunities()}
        </div>
    );
}
 
export default ReccomendedCommunities;