import { useRef } from 'react';
import type { ContextMenuProps } from './types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Edit3, Copy, FilePlus2, Flag, Trash2 } from 'lucide-react';

const ContextMenu = ({ contextMenu, onClose, actions }: ContextMenuProps) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useClickOutside(menuRef, onClose);

  const menuOptions = [
    {
      label: 'Set as First Page',
      icon: Flag,
      action: actions.setAsFirst,
      color: '#2F72E2',
      className: 'w-4 h-4 fill-current',
      fillColor: true,
    },
    { label: 'Rename', icon: Edit3, action: actions.rename },
    { label: 'Copy', icon: Copy, action: actions.copy },
    { label: 'Duplicate', icon: FilePlus2, action: actions.duplicate },
    {
      label: 'Delete',
      icon: Trash2,
      action: actions.delete,
      withSeparator: true,
      color: '#EF494F',
    },
  ];

  return (
    <ul
      ref={menuRef}
      className='fixed z-[9999] w-[240px] h-[216.5px] rounded-[12px] border border-[#E1E1E1] bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.04),0px_1px_1px_0px_rgba(0,0,0,0.02)]'
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <li className='px-4 py-2 border-b border-gray-200 cursor-default text-[16px] leading-6 tracking-[-0.015em] align-middle font-[BL_Melody]'>
        Settings
      </li>

      {menuOptions.map((option, i) => {
        const Icon = option.icon;
        return (
          <li key={i}>
            {option.withSeparator && (
              <hr className='border-t border-gray-200 my-1 mx-4' />
            )}
            <div
              className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer font-inter text-[14px] leading-[16px] tracking-[-0.015em] text-[#1A1A1A]'
              onClick={() => {
                option.action(contextMenu.pageId);
                onClose();
              }}
            >
              <Icon
                className={option.className ?? ''}
                color={option.color ?? '#9DA4B2'}
                size={16}
                style={{ color: option.fillColor ? option.color : '' }}
              />
              {option.label}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ContextMenu;
