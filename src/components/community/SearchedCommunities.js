import React, {useState} from 'react';
import { useSearchedCommunities } from './../../hooks/queryHooks'
import CommunityPreview from './CommunityPreview'
import { MagnifyingGlass } from "phosphor-react";

const SearchedCommunities = () => {
    const [currentSearchField, setCurrentSearchField] = useState('')
    const [searchParam, setSearchParam] = useState('') //set this to the current search feild on actual search

    const {isLoading: isSearchCommLoading, isError: isSearchCommError, data: searchCommData} = useSearchedCommunities(searchParam)
    
    if (isSearchCommLoading) return <h1>Loading</h1>
    if (isSearchCommError) return <h1>Error Loading Communities</h1>

    const handleSearchChange = (e) => {
        setCurrentSearchField(e.target.value)
    }

    const submitSearch = () => {
        if (currentSearchField.length > 2){
            setSearchParam(currentSearchField)
        }
    }

    const renderCommunities = () => {
        return searchCommData.map(comm => {
            return(
            <CommunityPreview 
                key={comm.id}
                commData={comm}
            />
            )
        })
    }

    return ( 
        <div>
            <input 
                className="comm-search-bar"
                onChange={handleSearchChange}
                value={currentSearchField}
                type="text" />
            <button
                className="comm-search-button"
                onClick={submitSearch}
            ><MagnifyingGlass size={28} color="#ffffff" weight="bold" /></button>
            <div className="comm-container">
                {renderCommunities()}
            </div>
        </div>
     );
}
 
export default SearchedCommunities;