import { SelectionCard, SelectionCardProps } from '@boktor-apps/shared/ui/cards';
import { motion } from 'motion/react';

type AnimatedSelectionCardProps = SelectionCardProps & { delay?: number };

export const AnimatedSelectionCard = ({ ...props }: AnimatedSelectionCardProps) => {
  return (
    <motion.div
      initial={{ transform: `scale(.75)`, opacity: 0 }}
      animate={{ transform: `scale(1)`, opacity: 1 }}
      exit={{
        transform: `scale(.75)`,
        opacity: 0,
        transition: { type: 'tween', delay: 0.1, duration: 0.1 },
      }}
      transition={{ type: 'spring', delay: props.delay, damping: 8, stiffness: 150, duration: 0.4 }}
    >
      <SelectionCard {...props} />
    </motion.div>
  );
};
