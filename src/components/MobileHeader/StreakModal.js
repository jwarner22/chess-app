import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { XIcon } from '../BackButton';
import { ModalBodyH3, ModalBodyP } from '../PostLogin/Views/DailyPuzzle/ModalElements';
import { ModalClose } from '../UI_Kit/Modals/ModalElements';
import { StreakModalWrapper, StreakModalHeader } from './MobileHeaderElements';



const StreakModal = (props) => {
    const {open, handleOpen} = props;
    
    const variants = {
    closed: {opacity: 0, display: 'none'},
    open: {opacity: 1, display: 'flex'},
    exit: {opacity: 0, display: 'none'}
}

  return (
      <AnimatePresence>
        <StreakModalWrapper 
        as={motion.div}
        animate = {open ? "open" : "closed"}
        variants={variants}>
            <StreakModalHeader>
                <ModalClose onClick={handleOpen}>
                    <XIcon />
                </ModalClose>
                <ModalBodyH3>Daily Streak</ModalBodyH3>
                <ModalBodyP>This is your daily streak. Complete your recommended workout to keep the streak going!</ModalBodyP>
            </StreakModalHeader>
        </StreakModalWrapper>
    </AnimatePresence>
  )
}

export default StreakModal;