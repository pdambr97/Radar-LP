import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, Globe, Compass } from 'lucide-react'
import { RadarMark } from '@/components/RadarMark'

export default function Sobre() {
  const navigate = useNavigate()

  const handleSubscribe = () => {
    navigate('/#cadastro')
  }

  return (
    <div className="w-full bg-[#FBFAF6] py-12 sm:py-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#5C6E67] hover:text-[#113D30] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o início</span>
          </button>
        </div>

        {/* Page Title */}
        <header className="pb-8 mb-12 border-b border-[#E7E5DC]">
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC] mb-3">
            SOBRE O RADAR DA GERAÇÃO
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#113D30] tracking-tight leading-tight">
            Uma seleção simples para quem ajuda a preparar a próxima geração.
          </h1>
        </header>

        {/* Content */}
        <div className="space-y-10 text-base sm:text-lg text-[#5C6E67] leading-relaxed">
          <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
            <div className="flex-1 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#113D30]">O que é o Radar?</h2>
              <p>
                O Radar da Geração é uma publicação semanal gratuita criada para tornar acessíveis e
                descomplicadas as conversas sobre educação, tecnologia, comportamento e decisões de
                futuro.
              </p>
              <p>
                Em um cenário de excesso de informação, novidades diárias sobre inteligência
                artificial e transformações sociais aceleradas, nós filtramos o ruído para entregar
                apenas o que realmente vale acompanhar.
              </p>
            </div>
            <div className="flex-shrink-0">
              <RadarMark size={160} />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-[#E7E5DC]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#113D30]">
              As 4 categorias oficiais do Radar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#E7E5DC] rounded-xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#113D30]/10 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  Boletim
                </span>
                <p className="text-sm text-[#5C6E67]">
                  Escola, gestão escolar, políticas educacionais. Decisões que nascem da
                  instituição.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5DC] rounded-xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9388BF]/20 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C74AC]" />
                  O Futuro Hoje
                </span>
                <p className="text-sm text-[#5C6E67]">
                  Tecnologia, inteligência artificial, inovação. Tudo que ainda está se formando.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5DC] rounded-xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C74AC]/20 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                  <Globe className="w-3.5 h-3.5 text-[#7C74AC]" />
                  Mundo Conectado
                </span>
                <p className="text-sm text-[#5C6E67]">
                  Internet, redes sociais, plataformas, segurança digital. Como a próxima geração
                  vive online.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5DC] rounded-xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9388BF]/30 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-[#7C74AC]" />
                  Plano de Voo
                </span>
                <p className="text-sm text-[#5C6E67]">
                  Planejamento financeiro, decisões de futuro, faculdade, carreira, oportunidades.
                  Decisões que a família precisa tomar.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E7E5DC]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#113D30]">Nosso compromisso</h2>
            <p>
              Sem termos complicados, sem alarmismo e sem perda de tempo. Cada edição leva cerca de{' '}
              <strong>5 minutos de leitura</strong> e chega gratuitamente pelo canal de sua
              preferência: e-mail ou WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 p-8 sm:p-10 bg-white border border-[#E7E5DC] rounded-2xl text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#113D30]">
            Junte-se a famílias e educadores
          </h3>
          <p className="text-sm sm:text-base text-[#5C6E67] max-w-md mx-auto">
            Receba a próxima edição gratuita na sua caixa de entrada ou no WhatsApp.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubscribe}
              className="inline-flex items-center justify-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] text-[#FBFAF6] font-bold text-sm tracking-wide px-8 py-3.5 rounded-full transition-colors"
            >
              <span>Quero receber o Radar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
