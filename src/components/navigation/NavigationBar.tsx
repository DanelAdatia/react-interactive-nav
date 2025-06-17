import PageCard from '../ui/PageCard';
import AddButton from '../ui/AddButton';
import type { Props } from './types';

const NavigationBar = ({
  pages,
  activePageId,
  onPageClick,
  onAdd,
  onDrop,
  onDragStart,
  onContextMenu,
  contextMenu,
}: Props) => {
  return (
    <div className='overflow-x-auto scrollbar-hide'>
      <div className='flex gap-2 mb-2 p-4 w-max mx-auto bg-white rounded-2xl shadow-md'>
        {pages.map((page, index) => (
          <div
            key={page.id}
            className='flex items-center gap-2'
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
          >
            {index === 0 && <AddButton onClick={() => onAdd(0)} />}
            <div
              draggable
              onDragStart={() => onDragStart(page.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu(e, page.id);
              }}
            >
              <PageCard
                icon={page.icon}
                name={page.name}
                active={page.id === activePageId}
                onClick={() => onPageClick(page.id)}
                onContextMenu={onContextMenu}
                id={page.id}
                selected={
                  !activePageId || page.id !== activePageId
                    ? contextMenu?.pageId === page.id
                    : false
                }
              />
            </div>
            <AddButton onClick={() => onAdd(index + 1)} />
          </div>
        ))}
        <PageCard
          id='add'
          name='Add Page'
          isAddPage
          onClick={() => onAdd(pages.length)}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
