import { getCategoryColor } from '../data/offices'
import {
  Building2,
  Scale,
  Gavel,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'

const iconMap = {
  Executive: Building2,
  Legislative: Scale,
  Judiciary: Gavel,
  Constitutional: ShieldCheck,
}

export default function CategoryCard({ category, name, description, office, onClick }) {
  const colors = getCategoryColor(category)
  const Icon = iconMap[category] || Building2
  const displayName = name || office?.name_bn || ''
  const desc = description || office?.description_bn || office?.responsibilities || ''

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border-2 border-l-4 ${colors.bg} ${colors.text} hover:shadow-md transition-all duration-200 group cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${colors.icon} text-white`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg font-bn">
              {displayName}
            </h3>
            {desc && (
              <p className="text-sm mt-1 opacity-75 font-bn">
                {desc.slice(0, 80)}{desc.length > 80 ? '...' : ''}
              </p>
            )}
          </div>
        </div>
        <ChevronRight
          size={20}
          className="opacity-40 group-hover:opacity-100 transition-opacity mt-2 flex-shrink-0"
        />
      </div>
    </button>
  )
}
