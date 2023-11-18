import { AnimatePresence, motion } from 'framer-motion';
import Fact from '@/components/Fact';

export default function Facts({ facts }) {
  return (
    <section className="py-12">
      <AnimatePresence>
        {facts.map((fact, index) => (
          <motion.div
            key={fact.id}
            layout
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-white max-w-5xl my-8 mx-auto text-md font-mono"
          >
            <Fact fact={fact} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
}
