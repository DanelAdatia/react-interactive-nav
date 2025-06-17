import { motion } from 'framer-motion';
import { EllipsisVertical, Plus } from 'lucide-react';
import type { JSX } from 'react';
import React from 'react';

interface PageCardProps {
  id: string;
  name: string;
  active?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent, id: string) => void;
  icon?: JSX.Element;
  isAddPage?: boolean;
}

export default function PageCard({
  id,
  name,
  active = false,
  selected = false,
  onClick,
  onContextMenu,
  icon,
  isAddPage = false,
}: PageCardProps) {
  const styledIcon = icon
    ? {
        ...icon.props,
        className: `${icon.props.className || ''} w-4 h-4`,
        color: active || selected ? '#F59D0E' : '#8C93A1',
      }
    : {};

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`
        px-[10px] py-[4px] rounded-[8px] cursor-pointer border w-fit
        text-[14px] leading-[20px] text-center tracking-[-0.015em] font-inter font-medium
        ${
          !isAddPage
            ? active
              ? 'bg-[#FFFFFF] border-[#E1E1E1] text-[#1A1A1A] hover:bg-[#9DA4B259] hover:text-[#677289]'
              : selected
              ? 'bg-[#FFFFFF] border-[#E1E1E1] text-[#1A1A1A] hover:bg-[#9DA4B259] hover:text-[#677289]'
              : 'bg-[#9DA4B226] border-transparent text-[#1A1A1A] hover:bg-[#9DA4B259] hover:text-[#677289]'
            : ''
        } 
      `}
      style={{
        boxShadow: '0px 1px 3px 0px #0000000A, 0px 1px 1px 0px #00000005',
      }}
    >
      <div className='flex items-center gap-1'>
        {isAddPage ? (
          <>
            <Plus className='w-4 h-4' />
            <span>Add Page</span>
          </>
        ) : (
          <>
            {icon && icon.type && React.cloneElement(icon, styledIcon)}
            <span>{name}</span>
            {active && onContextMenu && (
              <EllipsisVertical
                className='w-4 h-4 ml-2 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  onContextMenu(e, id);
                }}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
