import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddButtonProps {
  onClick: () => void;
}

export default function AddButton({ onClick }: AddButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className='relative w-10 h-6 flex items-center justify-center cursor-pointer'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div className='w-full border-t border-dotted border-indigo-300' />

      {hovered && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className='absolute z-10 bg-white rounded-full p-1 border-[0.5px] border-[#E1E1E1] shadow-[0px_1px_3px_0px_#0000000A,0px_1px_1px_0px_#00000005] transition duration-200'
        >
          <Plus className='w-4 h-4 stroke-[1.5] text-black' />
        </motion.div>
      )}
    </div>
  );
}
