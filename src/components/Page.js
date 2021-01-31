import React from 'react';
import { motion } from 'framer-motion';
import './Page.css';

const Page = (props) => {
	return (
			<motion.div 
				className='Page'
				initial={{ opacity : 0 }}
				animate={{ opacity : 1 }}
				transition={{ type : 'tween' }}
			>
				{props.children}
			</motion.div>
		);
}

export default Page;