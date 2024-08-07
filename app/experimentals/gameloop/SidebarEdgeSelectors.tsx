import React from 'react';

interface SidebarEdgeSelectorsProps {
  onSelectEdgeType: (edgeType: string) => void;
}

const SidebarEdgeSelectors: React.FC<SidebarEdgeSelectorsProps> = ({ onSelectEdgeType }) => {
  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectEdgeType(event.target.value);
  };

  return (
    <aside className='edge-selector-container'>
      <select onChange={handleSelectionChange}>
        <option value="leads-to">Leads To</option>
        <option value="obtains">Obtains</option>
        <option value="enables">Enables</option>
        <option value="boosters">Boosters</option>
      </select>
    </aside>
  );
};

export { SidebarEdgeSelectors };

