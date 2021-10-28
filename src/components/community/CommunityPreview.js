import React from 'react';
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CommunityPreview = ({commData, place}) => {
    const previewContent = (content) => {
        if (content.length < 40){
            return content
        }
        return `${content.substring(0, 37)}...`
    }

    return ( 
        <Link 
        style={{textDecoration: 'none'}}
        to={`/community/${commData.id}`}>
            <motion.div 
                initial={{scale: 0}}
                animate={{scale: 1.0}}
                transition={{duration: 0.1}}
                className="comm-preview smooth-shadow-small round">
                <h2>{commData.title}</h2>
                <p>{previewContent(commData.sidebar)}</p>
                <p className="comm-preview-followers">{commData.followers} Followers</p>
            </motion.div>
        </Link>
     );
}
 
export default CommunityPreview;