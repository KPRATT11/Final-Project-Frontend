import React from 'react';
import { useParams } from "react-router-dom"
import { usePosts } from './../../hooks/queryHooks'

import PreviewPost from './PreviewPost'


const PreviewPostContainer = (props) => {
    const { comm_id } = useParams()
    const { isLoading: isPostsLoading, data: postsData} = usePosts(comm_id)
    console.log(postsData)

    if (isPostsLoading) return <h1>Loading</h1>

    const previewContent = (content) => {
        if (content.length < 40){
            return content
        }
        return `${content.substring(0, 37)}...`
    }

    const generatePreviews = (previewArray) => {
        return previewArray
        .sort((firstEl, secondEl) => secondEl.score - firstEl.score)
        .map((e,i) => {
            return <PreviewPost 
                handlePostClick={props.handlePostClick}
                place={i}
                key={e.id}
                details={{
                    contentPreview: previewContent(e.content),
                    userOwns: e.userOwns,
                    title: e.title,
                    id: e.id,
                    score: e.score,
                    postedAt: e.posted_at
                }}
            />
        })
    }

    return ( 
        <div className="preview-post-container">
            {generatePreviews(postsData)}
        </div>
     );
}
 
export default PreviewPostContainer;