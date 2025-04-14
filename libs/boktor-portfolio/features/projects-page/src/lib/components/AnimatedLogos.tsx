import { AnimatePresence, motion } from 'motion/react';
export const AnimatedLogos = ({ logosList }: { logosList: React.ReactNode[] }) => {
  return (
    <AnimatePresence>
      {logosList.map((LogoComponent, idx) => {
        return (
          <motion.div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            initial={{ scale: 0, filter: 'blur(8px)' }}
            animate={{ scale: 1, filter: `blur(0px)` }}
            transition={{ delay: 0.1 * idx }}
          >
            {LogoComponent}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
