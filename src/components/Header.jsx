import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-bn">
          {t.appTitle}
        </h1>
        <p className="text-green-100 mt-1 text-sm md:text-base font-bn">
          {t.appSubtitle}
        </p>
      </div>
      <div className="h-1 bg-gradient-to-r from-green-400 via-white/30 to-green-400" />
    </header>
  )
}
