import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md text-center space-y-6">
        <span className="text-5xl font-extrabold text-[#245C45]">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221C] tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-sm sm:text-base text-[#687169]">
          A página que você procura não existe ou mudou de endereço.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#245C45] hover:bg-[#1D4A38] text-white font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao início</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
