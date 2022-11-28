import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonBlock from './SkeletonBlock';
import 'react-loading-skeleton/dist/skeleton.css';

const Skeletons = ({ hasLoadedOne }) => {
  return (
    <AnimatePresence>
      {!hasLoadedOne && (
        <motion.div
          key='skeletons'
          style={skeletonsStyles}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
          <SkeletonBlock />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const skeletonsStyles: React.CSSProperties = {
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  marginTop: '15px',
};

export default Skeletons;
