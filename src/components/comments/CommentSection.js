import React from 'react';
import Comment from './Comment'

const CommentSection = (props) => {
    const generateComments = (data) => {
        return data
        .sort((a, b) => b.score - a.score)
        .map((e, i) => {
            return <Comment 
                place={i}
                key={e.id}
                logged_in={props.logged_in}
                refetchPost={props.refetchPost}
                data={e}/>
        })
    }

    return ( 
        <div style={{
            width: "90%",
            margin: "auto"
        }}>
            {generateComments(props.replies)}
        </div>
     );
}
 
export default CommentSection;