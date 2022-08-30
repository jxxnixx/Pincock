import Toggler from '@components/sidebar/toggler';
import Navigation from '@components/sidebar/navigation';
import { motion, useCycle, Variants } from 'framer-motion';
import { useState } from 'react';

const sidebarVariants: Variants = {
  open: {
    clipPath: `circle(1000px at 40px 40px)`,
    transition: {
      duration: 0.4,
    },
  },
  closed: {
    clipPath: `circle(30px at 40px 40px)`,
    transition: {
      duration: 0.4,
      delay: 0.4,
    },
  },
};

export default function Practice2() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
      <motion.div className="background" variants={sidebarVariants} />
      <Toggler toggle={() => toggleOpen()} />
      <Navigation />
    </motion.nav>
  );
}
