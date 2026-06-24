import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  findOfficeById,
  getChildOffices,
  getParentOffice,
  getCategoryColor,
} from '../data/offices'
import { buildPositionTree, getPositionsByOfficeId } from '../data/positions'
import {
  X,
  ChevronRight,
  ChevronDown,
  Building2,
  User,
  Info,
  Globe,
  Mail,
  Phone,
  BookOpen,
  Goal,
  Award,
  ArrowLeft,
} from 'lucide-react'

function InfoRow({ label, value, icon: Icon }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-1">
      {Icon && <Icon size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />}
      <span className="text-xs font-semibold text-gray-500 min-w-24 flex-shrink-0 font-bn">{label}</span>
      <span className="text-sm text-gray-800 font-bn">{value}</span>
    </div>
  )
}

function PositionTreeNode({ node, depth = 0, onSelect }) {
  const [expanded, setExpanded] = useState(depth < 1)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
        style={{ paddingLeft: `${12 + depth * 20}px` }}
        onClick={() => onSelect(node)}
      >
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p) }}
          className={`p-0.5 rounded ${hasChildren ? 'opacity-60 hover:opacity-100' : 'opacity-20 cursor-default'}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {hasChildren ? (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-3.5 inline-block" />
          )}
        </button>
        <User size={14} className="text-gray-400 flex-shrink-0" />
        <span className="text-sm flex-1 truncate font-bn group-hover:text-blue-700 transition-colors">
          {node.designation_bn}
        </span>
        {node.pay_grade_bn && node.pay_grade_bn !== 'N/A' && (
          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full flex-shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            {node.pay_grade_bn}
          </span>
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <PositionTreeNode key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

function PositionDetail({ position, office, onBack }) {
  const { t } = useLanguage()

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 mb-4 transition-colors font-bn"
      >
        <ArrowLeft size={14} />
        {t.backToOrganogram}
      </button>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
          <h3 className="text-lg font-bold text-gray-900 font-bn">{position.designation_bn}</h3>
          {position.pay_grade_bn && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
              {position.pay_grade_bn}
            </span>
          )}
          <p className="text-xs text-gray-500 mt-1 font-bn">{office.name_bn}</p>
        </div>

        <div className="p-4 space-y-3 divide-y divide-gray-100">
          {position.equivalent_rank_bn && (
            <InfoRow label={t.equivalentRank} value={position.equivalent_rank_bn} icon={Award} />
          )}
          {position.official_salutation_bn && (
            <InfoRow label={t.officialSalutation} value={position.official_salutation_bn} icon={User} />
          )}
          {position.appointing_authority_bn && (
            <InfoRow label={t.appointingAuthority} value={position.appointing_authority_bn} icon={BookOpen} />
          )}
          {position.public_service_usecase_bn && (
            <InfoRow label={t.publicServiceUsecase} value={position.public_service_usecase_bn} icon={Goal} />
          )}
          {position.career_progression_bn && (
            <InfoRow label={t.careerProgression} value={position.career_progression_bn} icon={ChevronRight} />
          )}
          {position.qualifications_bn && (
            <InfoRow label={t.qualifications} value={position.qualifications_bn} icon={BookOpen} />
          )}
          {position.appointment_process_bn && (
            <InfoRow label={t.appointmentProcess} value={position.appointment_process_bn} icon={BookOpen} />
          )}
          {position.responsibilities_bn && (
            <div className="pt-3">
              <span className="text-xs font-semibold text-gray-500 font-bn">{t.responsibilities}</span>
              <p className="text-sm text-gray-800 mt-1 leading-relaxed font-bn">{position.responsibilities_bn}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OfficeDashboard({ officeId, onClose, onNavigate }) {
  const { t } = useLanguage()
  const [tab, setTab] = useState('details')
  const [selectedPosition, setSelectedPosition] = useState(null)
  const office = findOfficeById(officeId)

  if (!office) return null

  const colors = getCategoryColor(office.category)
  const parentOffice = getParentOffice(officeId)
  const childOffices = getChildOffices(officeId)
  const positionTree = buildPositionTree(officeId)
  const catLabel = t.branches[office.category] || office.category
  const desc = office.description_bn || office.responsibilities || ''
  const contact = office.contact_info || {}

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col">
        <div className={`p-6 border-b flex-shrink-0 ${colors.light}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                {catLabel}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-2 font-bn">
                {office.name_bn}
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-black/5 transition-colors flex-shrink-0">
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex border-b flex-shrink-0">
          <button
            onClick={() => setTab('details')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors font-bn ${
              tab === 'details'
                ? 'text-green-700 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Info size={16} className="inline mr-1 -mt-0.5" />
            {t.details}
          </button>
          <button
            onClick={() => setTab('organogram')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors font-bn ${
              tab === 'organogram'
                ? 'text-green-700 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={16} className="inline mr-1 -mt-0.5" />
            {t.organogram}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {tab === 'details' && (
            <>
              {/* বিবরণ */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1 font-bn">{t.responsibilities}</h3>
                <p className="text-gray-800 leading-relaxed font-bn">{desc}</p>
              </div>

              {/* তথ্য সারি */}
              <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                {office.office_type_bn && (
                  <InfoRow label={t.officeType} value={office.office_type_bn} />
                )}
                {office.jurisdiction_bn && (
                  <InfoRow label={t.jurisdiction} value={office.jurisdiction_bn} />
                )}
                {office.governing_law_bn && (
                  <InfoRow label={t.governingLaw} value={office.governing_law_bn} />
                )}
                {office.target_audience_bn && (
                  <InfoRow label={t.targetAudience} value={office.target_audience_bn} />
                )}
              </div>

              {/* যোগাযোগ */}
              {(contact.website || contact.email || contact.phone) && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-bn">{t.contact}</h3>
                  <div className="space-y-2">
                    {contact.website && (
                      <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline font-bn">
                        <Globe size={14} /> {contact.website}
                      </a>
                    )}
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-bn">
                        <Mail size={14} className="text-gray-400" /> {contact.email}
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-bn">
                        <Phone size={14} className="text-gray-400" /> {contact.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* উর্ধ্বতন অফিস */}
              {parentOffice && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-bn">{t.parentOffice}</h3>
                  <button
                    onClick={() => { onNavigate(parentOffice.id); setTab('details') }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors w-full text-left border border-gray-200"
                  >
                    <Building2 size={16} className="text-gray-400" />
                    <span className="font-medium text-sm font-bn">{parentOffice.name_bn}</span>
                  </button>
                </div>
              )}

              {/* অধীনস্থ অফিস */}
              {childOffices.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-bn">{t.childOffices} ({childOffices.length})</h3>
                  <div className="space-y-1.5">
                    {childOffices.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => { onNavigate(child.id); setTab('details') }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full text-left border border-gray-100"
                      >
                        <Building2 size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-sm flex-1 font-bn">{child.name_bn}</span>
                        <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {tab === 'organogram' && (
            <div>
              {selectedPosition ? (
                <PositionDetail
                  position={selectedPosition}
                  office={office}
                  onBack={() => setSelectedPosition(null)}
                />
              ) : (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 font-bn">{t.positionHierarchy}</h3>
                  {positionTree.length === 0 ? (
                    <p className="text-sm text-gray-400 font-bn">{t.noPositions}</p>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                      {positionTree.map((pos) => (
                        <PositionTreeNode key={pos.id} node={pos} depth={0} onSelect={setSelectedPosition} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium text-sm font-bn"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}
