import { useState } from 'react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Header from './components/Header'
import OfficeTreeViewer from './components/OfficeTreeViewer'
import OfficeDashboard from './components/OfficeDashboard'
import CategoryCard from './components/CategoryCard'
import { buildCategoryTree, getCategoryColor } from './data/offices'

const SLUG_CATEGORY = {
  executive: 'Executive',
  legislative: 'Legislative',
  judiciary: 'Judiciary',
  constitutional: 'Constitutional',
}

const PORTAL_CARDS = [
  { slug: 'executive', category: 'Executive' },
  { slug: 'legislative', category: 'Legislative' },
  { slug: 'judiciary', category: 'Judiciary' },
  { slug: 'constitutional', category: 'Constitutional' },
]

function HomePage({ onEnterBranch }) {
  const { t } = useLanguage()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 border border-green-200 rounded-2xl">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-800 font-bold text-xl font-bn">
            বাংলাদেশের প্রশাসনিক কাঠামো
          </span>
        </div>
        <p className="text-gray-500 mt-3 text-sm font-bn">
          {t.clickToExplore}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PORTAL_CARDS.map((card) => (
          <CategoryCard
            key={card.slug}
            category={card.category}
            name={t.branches[card.category]}
            description={t.branchDescriptions[card.category]}
            onClick={() => onEnterBranch(card.slug)}
          />
        ))}
      </div>
    </div>
  )
}

function BranchPage({ slug, onBack, onOfficeClick }) {
  const { t } = useLanguage()
  const category = SLUG_CATEGORY[slug]
  const tree = buildCategoryTree(category)
  const colors = getCategoryColor(category)
  const branchName = t.branches[category]
  const branchDesc = t.branchDescriptions[category]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-green-600 hover:text-green-700 mb-6 font-medium text-sm font-bn"
      >
        &larr; {t.home}
      </button>

      <div className={`p-5 rounded-xl border-l-4 ${colors.bg} mb-6`}>
        <h1 className={`text-2xl font-bold ${colors.text} font-bn`}>
          {branchName}
        </h1>
        <p className="text-sm mt-1 text-gray-600 font-bn">
          {branchDesc}
        </p>
      </div>

      <OfficeTreeViewer
        key={slug}
        rootNodes={tree}
        onSelectOffice={onOfficeClick}
      />
    </div>
  )
}

function AppContent() {
  const [selectedOfficeId, setSelectedOfficeId] = useState(null)
  const [currentSlug, setCurrentSlug] = useState(null)

  const handleOfficeClick = (officeId) => {
    setSelectedOfficeId(officeId)
  }

  const handleEnterBranch = (slug) => {
    setCurrentSlug(slug)
  }

  const handleBack = () => {
    setCurrentSlug(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      {!currentSlug ? (
        <HomePage onEnterBranch={handleEnterBranch} />
      ) : (
        <BranchPage
          slug={currentSlug}
          onBack={handleBack}
          onOfficeClick={handleOfficeClick}
        />
      )}

      {selectedOfficeId && (
        <OfficeDashboard
          officeId={selectedOfficeId}
          onClose={() => setSelectedOfficeId(null)}
          onNavigate={handleOfficeClick}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
