import React from 'react'
import { XIcon } from '../../BackButton'
import { ModalClose, ModalHeader, ModalWrapper } from './ModalElements'
import {motion, AnimatePresence} from 'framer-motion'


const Modal = (props) => {

    const {children, isOpen, toggle} = props


    const dropIn = {
        hidden: { 
            y: "-100vh",
            opcatiy: 0
        },
        visible: {
            y: 0,
            opactiy: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 25, 
                stiffness: 500,
            }
        },
        exit: {
            y: '100vh',
            opactiy: 0,
        }
    }

return (<>

<AnimatePresence 
    initial={false}
    exitBeforeEnter={true}
    onExitComplete={() => null}
    >
    {isOpen && (
    <ModalWrapper 
    as={motion.div} 
    initial={{opactiy: 0 }}
    animate={{opactiy: 1 }}
    exit={{opacity: 0 }}
    onClick={toggle}
    >
        <ModalHeader as={motion.div} 
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
        onClick={(e) => e.stopPropagation()} 
        >
            <ModalClose onClick={toggle}>
                <XIcon />
            </ModalClose>
            {children}
        </ModalHeader>
    </ModalWrapper>
    )}
    </AnimatePresence>
    </>
  )
}

export default Modal