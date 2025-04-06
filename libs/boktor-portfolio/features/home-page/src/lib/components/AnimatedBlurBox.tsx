import { HTMLMotionProps, motion } from 'motion/react';

export const AnimatedBlurBox = ({ children, ...rest }: { children: React.ReactNode } & HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        height: 'fit-content',
        ...rest.style,
      }}
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4 } }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
