import type { JSX } from 'react';

export interface Page {
  id: string;
  name: string;
  icon: JSX.Element;
}

export interface ContextMenuData {
  x: number;
  y: number;
  pageId: string;
}

export interface Props {
  pages: Page[];
  activePageId: string | null;
  onPageClick: (id: string) => void;
  onAdd: (index: number) => void;
  onDrop: (index: number) => void;
  onDragStart: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, id: string) => void;
  contextMenu?: ContextMenuData | null;
}

export interface ContextMenuProps {
  contextMenu: ContextMenuData;
  onClose: () => void;
  actions: {
    setAsFirst: (id: string) => void;
    rename: (id: string) => void;
    copy: (id: string) => void;
    duplicate: (id: string) => void;
    delete: (id: string) => void;
  };
}
