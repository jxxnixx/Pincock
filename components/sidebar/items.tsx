import { motion, Variants } from 'framer-motion';

const ItemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const Item = () => {
  return (
    <motion.li variants={ItemVariants}>
      {/* icon-placeholder, text-placeholder */}
      <span className='h-[45px] w-[45px] rounded-full' />
      <span className='h-8 flex-1 rounded-l' />
    </motion.li>
  );
};

export default Item;
