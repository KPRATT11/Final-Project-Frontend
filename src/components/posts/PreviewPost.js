import React from 'react';
import formatDate from './../../lib/dateHelp';
import { CrownSimple } from "phosphor-react";
import { motion } from "framer-motion"

const PreviewPost = ({details, handlePostClick, place}) => {
    return ( 
        <motion.div 
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{delay: 0.1 * place, duration: 0.1, stiffness: 500}}
        className="preview-post round smooth-shadow-subtle"
        onClick={() => {handlePostClick(details.id)}}>
            <p
                className="preview-post-owns"
            >{details.userOwns && <CrownSimple size={28} color="#ffd900" weight="fill" />}</p>
            <h2>{details.title}</h2>
            <p>{details.contentPreview}</p>
            <p>{formatDate(details.postedAt)}</p>
        </motion.div>
     );
}
 
export default PreviewPost;