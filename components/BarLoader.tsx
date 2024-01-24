import React from 'react';
import { motion, Variants } from "framer-motion";

const BarLoader: React.FC = () => {
    const variants: Variants = {
        initial: {
            scaleY: 0.5,
            opacity: 0,
        },
        animate: {
            scaleY: 1,
            opacity: 1,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                ease: "circIn",
            },
        },
    };

    return (
        <motion.div
            transition={{
                staggerChildren: 0.25,
            }}
            initial="initial"
            animate="animate"
            className="flex gap-1"
        >
            <motion.div variants={variants} className="h-12 w-2 bg-primary" />
            <motion.div variants={variants} className="h-12 w-2 bg-primary-dark" />
            <motion.div variants={variants} className="h-12 w-2 bg-primary-light" />
            <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
            <motion.div variants={variants} className="h-12 w-2 bg-secondary-dark" />
        </motion.div>
    );
};

export default BarLoader;
