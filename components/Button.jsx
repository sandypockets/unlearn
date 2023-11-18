import { motion } from 'framer-motion';

export default function Button({ children, type = 'button', onClick, className = '', loading }) {
  const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.2 },
  };

  const clickAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  return (
    <motion.button
      className={`${className} px-3 py-2 rounded-lg bg-blue-500`}
      type={type}
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={clickAnimation}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  );
}
