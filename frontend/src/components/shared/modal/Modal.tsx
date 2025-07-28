import { X } from "lucide-react"
import type React from "react"
import type { Dispatch, SetStateAction } from "react"
import { AnimatePresence, motion } from 'motion/react'

interface modalProps {
    children: React.ReactNode
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

function Modal({ children, open, setOpen }: modalProps) {
    return (
        <AnimatePresence mode="sync">
                {open &&
            <motion.div className="h-screen w-screen flex items-center justify-center fixed top-0 right-0" initial={{backgroundColor:'rgba(0,0,0,0)'}} animate={{backgroundColor:'rgba(0,0,0,0.5)'}} exit={{backgroundColor:'rgba(0,0,0,0)'}} transition={{duration:0.5}}>
                    <motion.div className="min-h-1/2 max-h-3/4 min-w-1/4 max-w-3/4 bg-white rounded-2xl relative" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <motion.div whileHover={{ rotate: 90, scale: 1.3 }} className="absolute top-2 right-2" onClick={() => setOpen(prev => !prev)}>
                            <X color="red" />
                        </motion.div>
                        {children}
                    </motion.div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default Modal
