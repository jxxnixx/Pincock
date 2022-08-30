import Toggler from '@components/sidebar/toggler';
import Navigation from '@components/sidebar/navigation';
import { motion, useCycle, Variants } from 'framer-motion';
import { useState } from 'react';

const sidebarVariants: Variants = {
  open: {
    clipPath: `circle(1000px at 40px 92px)`,
    transition: {
      duration: 0.4,
    },
  },
  closed: {
    clipPath: `circle(30px at 40px 92px)`,
    transition: {
      duration: 0.4,
      delay: 0.4,
    },
  },
};

export default function SideBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className='h-screen overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100'>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className='absolute top-5 left-0 bottom-0 w-[300px]'
      >
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          //background
          className='absolute -top-5 -left-2 bottom-0 w-[300px] bg-white'
        />
        <Toggler toggle={() => toggleOpen()} />
        <Navigation />
      </motion.nav>
    </div>
  );
}
