import { useState } from 'react'
import { getCategoryColor } from '../data/offices'
import { ChevronDown, ChevronRight, Building2, Landmark } from 'lucide-react'

export default function OfficeTreeNode({ node, onSelect, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const isCategoryRoot = node.id.startsWith('cat-')
  const isRoot = node.id === 'bd'
  const colors = getCategoryColor(node.category)

  const handleToggle = (e) => {
    e.stopPropagation()
    setExpanded((prev) => !prev)
  }

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors cursor-pointer
          ${isRoot ? 'bg-green-600 text-white font-bold text-lg' : ''}
          ${isCategoryRoot ? `${colors.light} font-semibold` : ''}
          ${!isRoot && !isCategoryRoot ? 'hover:bg-gray-50' : ''}
        `}
        style={{ paddingLeft: `${12 + depth * 24}px` }}
        onClick={() => onSelect(node.id)}
      >
        <button
          onClick={handleToggle}
          className={`p-0.5 rounded transition-colors ${
            hasChildren ? 'opacity-60 hover:opacity-100' : 'opacity-20'
          }`}
          disabled={!hasChildren}
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          ) : (
            <span className="w-4 inline-block" />
          )}
        </button>

        {isRoot ? (
          <Landmark size={20} />
        ) : (
          <Building2 size={16} className="text-gray-400 flex-shrink-0" />
        )}

        <span className="flex-1 truncate font-bn">
          {node.name_bn}
        </span>

        {hasChildren && (
          <span className="text-xs text-gray-400 flex-shrink-0">
            {node.children.length}
          </span>
        )}
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <OfficeTreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
