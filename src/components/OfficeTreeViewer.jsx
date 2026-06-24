import { useLanguage } from '../context/LanguageContext'
import OfficeTreeNode from './OfficeTreeNode'
import { buildOfficeTree } from '../data/offices'

export default function OfficeTreeViewer({ onSelectOffice, rootNodes }) {
  const { t } = useLanguage()
  const tree = rootNodes || buildOfficeTree()

  if (!tree || tree.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="font-bn">{t.noData}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-1">
        {tree.map((node) => (
          <OfficeTreeNode
            key={node.id}
            node={node}
            onSelect={onSelectOffice}
            depth={0}
          />
        ))}
      </div>
    </div>
  )
}
