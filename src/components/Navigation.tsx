import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RADAR_CONSTANTS } from '@/lib/constants'
import { RadarLogo } from '@/components/RadarLogo'

interface HeaderProps {
  onSubscribeClick?: () => void
}

export function Header({ onSubscribeClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleReceberClick = () => {
    if (onSubscribeClick) {
      onSubscribeClick()
      return
    }

    if (location.pathname === '/') {
      const el = document.getElementById('cadastro')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/#cadastro')
      setTimeout(() => {
        const el = document.getElementById('cadastro')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const handleOQueRecebeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById('categorias')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-150 bg-[#FBFAF6]/95 backdrop-blur-sm ${
        scrolled ? 'border-b border-[#E7E5DC]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Block with official logo */}
        <Link
          to="/"
          className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] rounded-sm py-1"
          aria-label="radar DA GERAÇÃO - Página inicial"
        >
          <RadarLogo size="md" />
        </Link>

        {/* Right Nav + CTA */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[0.9375rem] font-medium text-[#5C6E67]">
            <Link
              to="/#categorias"
              onClick={handleOQueRecebeClick}
              className="hover:text-[#113D30] transition-colors duration-150 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] rounded"
            >
              O que você recebe
            </Link>
            <Link
              to="/edicao/001"
              className="hover:text-[#113D30] transition-colors duration-150 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] rounded"
            >
              Última edição
            </Link>
            <Link
              to="/sobre"
              className="hover:text-[#113D30] transition-colors duration-150 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] rounded"
            >
              Sobre
            </Link>
          </nav>

          {/* Subscribe CTA Button */}
          <button
            type="button"
            onClick={handleReceberClick}
            className="inline-flex items-center justify-center bg-[#113D30] hover:bg-[#0C2D23] active:scale-[0.98] text-[#FBFAF6] font-bold text-xs sm:text-[0.875rem] tracking-wide px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-150 shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] focus-visible:ring-offset-2"
          >
            Receber o Radar
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-[#FBFAF6] border-t border-[#E7E5DC] pt-14 pb-12 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#E7E5DC]">
          {/* Brand & description */}
          <div className="max-w-md">
            <Link
              to="/"
              className="inline-block mb-4"
              aria-label="radar DA GERAÇÃO - Página inicial"
            >
              <RadarLogo size="md" />
            </Link>
            <p className="text-[#5C6E67] text-sm sm:text-[0.9375rem] leading-relaxed">
              Boletim, O Futuro Hoje, Mundo Conectado e Plano de Voo para entender o futuro da
              próxima geração.
            </p>
          </div>

          {/* Links list */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-[0.9375rem] font-medium text-[#5C6E67]">
            <Link
              to="/edicao/001"
              className="hover:text-[#113D30] transition-colors duration-150 py-1"
            >
              Última edição
            </Link>
            <Link to="/sobre" className="hover:text-[#113D30] transition-colors duration-150 py-1">
              Sobre
            </Link>
            <a
              href={RADAR_CONSTANTS.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#113D30] transition-colors duration-150 py-1"
            >
              Instagram
            </a>
            <a
              href={RADAR_CONSTANTS.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#113D30] transition-colors duration-150 py-1"
            >
              LinkedIn
            </a>
            <Link
              to="/privacidade"
              className="hover:text-[#113D30] transition-colors duration-150 py-1"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/contato"
              className="hover:text-[#113D30] transition-colors duration-150 py-1"
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[0.8125rem] text-[#5C6E67]">
          <p>© {RADAR_CONSTANTS.YEAR} radar DA GERAÇÃO</p>
          <p className="text-[#5C6E67]/80">
            Publicação semanal gratuita para famílias, professores e gestores.
          </p>
        </div>
      </div>
    </footer>
  )
}
