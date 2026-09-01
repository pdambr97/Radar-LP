import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, Globe } from 'lucide-react'

export default function Edicao001() {
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

        {/* Header da Edição */}
        <header className="pb-8 mb-12 border-b border-[#E7E5DC]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC]">
              EDIÇÃO #001
            </span>
            <span className="text-xs text-[#5C6E67]">•</span>
            <span className="text-xs font-medium text-[#5C6E67]">Março de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#113D30] tracking-tight leading-tight">
            Nesta semana no Radar
          </h1>
          <p className="text-base sm:text-lg text-[#5C6E67] mt-3 leading-relaxed">
            Toda semana, uma nova edição. Gratuita, por e-mail ou WhatsApp.
          </p>
        </header>

        {/* Artigos da Edição #001 */}
        <div className="space-y-12">
          {/* Artigo 1: O Futuro Hoje */}
          <article className="space-y-3 pb-10 border-b border-[#E7E5DC]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#9388BF]/15 text-[#113D30] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#7C74AC]" />
              <span>O Futuro Hoje</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#113D30] leading-snug">
              O estudo chinês que revela a pegadinha da IA nas tarefas de casa
            </h2>
            <div className="text-sm sm:text-base text-[#5C6E67] leading-relaxed space-y-3 pt-1">
              <p>
                Pesquisadores acompanharam centenas de estudantes do ensino fundamental e médio que
                utilizaram chatbots de IA generativa para resolver lições de matemática e redação. O
                resultado revelou um paradoxo: embora as notas imediatas tenham aumentado, a
                retenção dos conceitos caiu significativamente nas avaliações presenciais seguintes.
              </p>
              <p>
                O estudo aponta que o atalho cognitivo oferecido pela resposta pronta diminui o
                esforço de reflexão necessário para a fixação do aprendizado. O desafio para pais e
                escolas não é proibir as ferramentas, mas mudar a natureza das perguntas para exigir
                síntese crítica e raciocínio próprio.
              </p>
            </div>
          </article>

          {/* Artigo 2: Mundo Conectado */}
          <article className="space-y-3 pb-10 border-b border-[#E7E5DC]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#7C74AC]/15 text-[#113D30] text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-[#7C74AC]" />
              <span>Mundo Conectado</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#113D30] leading-snug">
              O acordo bilionário da Meta
            </h2>
            <div className="text-sm sm:text-base text-[#5C6E67] leading-relaxed space-y-3 pt-1">
              <p>
                A Meta firmou um acordo histórico para encerrar processos e disputas regulatórias
                envolvendo o impacto de algoritmos no bem-estar psicológico de adolescentes. Como
                parte do compromisso, a companhia acelera a implementação de contas com proteção
                automática para menores de 18 anos.
              </p>
              <p>
                Entre as novas regras obrigatórias estão bloqueios automáticos de mensagens de
                estranhos, filtros mais rigorosos para conteúdos de risco e pausas compulsórias no
                feed durante a madrugada. Para famílias, a medida traz novas ferramentas de controle
                parental, mas especialistas reforçam a necessidade de diálogo contínuo em casa.
              </p>
            </div>
          </article>

          {/* Artigo 3: Boletim */}
          <article className="space-y-3 pb-10 border-b border-[#E7E5DC]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#113D30]/10 text-[#113D30] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#113D30]" />
              <span>Boletim</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#113D30] leading-snug">
              Por que a mensalidade da escola particular vai subir de novo em 2026
            </h2>
            <div className="text-sm sm:text-base text-[#5C6E67] leading-relaxed space-y-3 pt-1">
              <p>
                O reajuste das mensalidades escolares no próximo ciclo deve ficar acima da inflação
                média medida pelo IPCA. As instituições justificam a alta com a necessidade de
                investimentos contínuos em segurança digital, novos currículos voltados a
                tecnologias emergentes e a valorização do corpo docente qualificado.
              </p>
              <p>
                Para o planejamento familiar, o cenário exige antecedência na renegociação de
                descontos, bolsas por desempenho e uma análise criteriosa do custo-benefício
                pedagógico oferecido pela escola.
              </p>
            </div>
          </article>
        </div>

        {/* Compact subscribe CTA at bottom */}
        <div className="mt-14 p-8 sm:p-10 bg-white border border-[#E7E5DC] rounded-2xl text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#113D30]">Gostou do conteúdo?</h3>
          <p className="text-sm sm:text-base text-[#5C6E67] max-w-md mx-auto">
            Receba toda semana o resumo das tendências que moldam a próxima geração diretamente no
            seu e-mail ou WhatsApp.
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
