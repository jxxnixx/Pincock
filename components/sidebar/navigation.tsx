import { motion } from 'framer-motion';
import Item from './items';

const navigationVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = () => {
  return (
    <motion.ul variants={navigationVariants}>
      {[...Array(5)].map((_, i) => (
        <Item key={i} />
      ))}
    </motion.ul>
  );
};

export default Navigation;
