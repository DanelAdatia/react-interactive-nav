import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import ContextMenu from './ContextMenu';
import type { ContextMenuData, Page } from './types';
import { CircleCheck, FileText, Info, Layers2, Phone } from 'lucide-react';

const NavigationBuilder = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<(Page & { icon: JSX.Element })[]>([
    {
      id: crypto.randomUUID(),
      name: 'Info',
      icon: <Info className='w-4 h-4 mr-2' />,
    },
    {
      id: crypto.randomUUID(),
      name: 'Details',
      icon: <FileText className='w-4 h-4 mr-2' />,
    },
    {
      id: crypto.randomUUID(),
      name: 'Contact',
      icon: <Phone className='w-4 h-4 mr-2' />,
    },
    {
      id: crypto.randomUUID(),
      name: 'Ending',
      icon: <CircleCheck className='w-4 h-4 mr-2' />,
    },
  ]);

  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);

  const handleDragStart = (id: string) => setDraggingId(id);

  const handleDrop = (index: number) => {
    if (!draggingId) return;
    const draggedItem = pages.find((p) => p.id === draggingId);
    if (!draggedItem) return;
    const filtered = pages.filter((p) => p.id !== draggingId);
    const reordered = [
      ...filtered.slice(0, index),
      draggedItem,
      ...filtered.slice(index),
    ];
    setPages(reordered);
    setDraggingId(null);
  };

  const addPageAt = (index: number) => {
    const newPage = {
      id: crypto.randomUUID(),
      name: `Page ${pages.length + 1}`,
      icon: <Layers2 className='w-4 h-4 mr-2' />,
    };
    setPages([...pages.slice(0, index), newPage, ...pages.slice(index)]);
  };
  const menuActions = {
    setAsFirst: (id: string) => {
      const index = pages.findIndex((p) => p.id === id);
      if (index > -1) {
        const updated = [...pages];
        const [moved] = updated.splice(index, 1);
        updated.unshift(moved);
        setPages(updated);
      }
    },
    rename: (id: string) => {
      const newName = prompt('Enter new name:');
      if (newName) {
        setPages(pages.map((p) => (p.id === id ? { ...p, name: newName } : p)));
      }
    },
    copy: (id: string) => {
      const page = pages.find((p) => p.id === id);
      if (page) navigator.clipboard.writeText(page.name);
    },
    duplicate: (id: string) => {
      const page = pages.find((p) => p.id === id);
      if (page) {
        const newPage = {
          ...page,
          id: crypto.randomUUID(),
          name: `${page.name} Copy`,
        };
        const index = pages.findIndex((p) => p.id === id);
        const updated = [...pages];
        updated.splice(index + 1, 0, newPage);
        setPages(updated);
      }
    },
    delete: (id: string) => {
      setPages(pages.filter((p) => p.id !== id));
    },
  };
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const matchedPage = pages.find((p) =>
      path.includes(p.name.toLowerCase().replace(/\s+/g, ''))
    );
    if (matchedPage) {
      setActivePageId(matchedPage.id);
    }
    const serializablePages = pages.map(({ id, name }) => ({ id, name }));
    localStorage.setItem('pages', JSON.stringify(serializablePages));
  }, [pages]);

  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] z-50'>
      <NavigationBar
        pages={pages}
        activePageId={activePageId}
        onPageClick={(id) => {
          const page = pages.find((p) => p.id === id);
          if (page) {
            setActivePageId(id);
            navigate(`/page/${page.name.toLowerCase().replace(/\s+/g, '')}`);
          }
        }}
        onAdd={addPageAt}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onContextMenu={(e, id) => {
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          setContextMenu({
            x: rect.left - 70,
            y: -220,
            pageId: id,
          });
        }}
        contextMenu={contextMenu}
      />
      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          onClose={() => setContextMenu(null)}
          actions={menuActions}
        />
      )}
    </div>
  );
};

export default NavigationBuilder;
