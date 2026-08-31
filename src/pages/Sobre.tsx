import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { RadarMark } from '@/components/RadarMark'

export default function Sobre() {
  const navigate = useNavigate()

  const handleSubscribe = () => {
    navigate('/#cadastro')
  }

  return (
    <div className="w-full bg-[#FAFAF7] py-12 sm:py-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#687169] hover:text-[#245C45] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o início</span>
          </button>
        </div>

        {/* Page Title */}
        <header className="pb-8 mb-12 border-b border-[#E2E5DF]">
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#245C45] mb-3">
            SOBRE O RADAR
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17221C] tracking-tight leading-tight">
            Uma seleção simples para quem ajuda a preparar a próxima geração.
          </h1>
        </header>

        {/* Content */}
        <div className="space-y-10 text-base sm:text-lg text-[#687169] leading-relaxed">
          <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
            <div className="flex-1 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#17221C]">O que é o RADAR?</h2>
              <p>
                O RADAR é uma publicação semanal gratuita criada para tornar acessíveis e
                descomplicadas as conversas sobre educação, tecnologia, dinheiro e carreira.
              </p>
              <p>
                Em um cenário com excesso de informação, novidades diárias sobre inteligência
                artificial e mudanças rápidas na sociedade, nós filtramos o ruído para entregar
                apenas o que realmente vale acompanhar.
              </p>
            </div>
            <div className="flex-shrink-0">
              <RadarMark size={160} />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E2E5DF]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221C]">
              O que você recebe toda semana
            </h2>
            <ul className="space-y-3 list-none pl-0">
              <li className="flex items-start gap-3">
                <span className="text-[#245C45] font-bold">01</span>
                <span>
                  <strong className="text-[#17221C]">Educação:</strong> o que está mudando na forma
                  de ensinar e aprender.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#245C45] font-bold">02</span>
                <span>
                  <strong className="text-[#17221C]">Tecnologia:</strong> inteligência artificial,
                  segurança digital e redes sociais.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#245C45] font-bold">03</span>
                <span>
                  <strong className="text-[#17221C]">Dinheiro:</strong> hábitos financeiros e
                  escolhas que afetam o futuro dos jovens.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#245C45] font-bold">04</span>
                <span>
                  <strong className="text-[#17221C]">Carreira:</strong> as novas habilidades
                  exigidas e o mundo do trabalho.
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E2E5DF]">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221C]">Nosso compromisso</h2>
            <p>
              Sem termos complicados, sem alarmismo e sem perda de tempo. Cada edição leva cerca de{' '}
              <strong>5 minutos de leitura</strong> e chega gratuitamente pelo canal de sua
              preferência: e-mail ou WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 p-8 sm:p-10 bg-white border border-[#E2E5DF] rounded-2xl text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#17221C]">
            Junte-se a famílias e educadores
          </h3>
          <p className="text-sm sm:text-base text-[#687169] max-w-md mx-auto">
            Receba a próxima edição gratuita na sua caixa de entrada ou no WhatsApp.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubscribe}
              className="inline-flex items-center justify-center gap-2 bg-[#245C45] hover:bg-[#1D4A38] text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
            >
              <span>QUERO RECEBER O RADAR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
