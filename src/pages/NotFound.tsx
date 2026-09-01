import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md text-center space-y-6">
        <span className="text-5xl font-extrabold text-[#113D30]">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113D30] tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-sm sm:text-base text-[#5C6E67]">
          A página que você procura não existe ou mudou de endereço.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] text-[#FBFAF6] font-bold text-sm tracking-wide px-6 py-3 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao início</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
