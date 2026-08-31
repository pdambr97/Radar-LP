import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Edicao001() {
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

        {/* Header da Edição */}
        <header className="pb-8 mb-12 border-b border-[#E2E5DF]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#245C45]">
              EDIÇÃO #001
            </span>
            <span className="text-xs text-[#687169]">•</span>
            <span className="text-xs font-medium text-[#687169]">Março de 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17221C] tracking-tight leading-tight">
            Nesta semana no Radar
          </h1>
          <p className="text-base sm:text-lg text-[#687169] mt-3 leading-relaxed">
            Toda semana, uma nova edição. Gratuita, por e-mail ou WhatsApp.
          </p>
        </header>

        {/* Artigos da Edição */}
        <div className="space-y-12">
          {/* Artigo 1: IA + Educação */}
          <article className="space-y-3 pb-10 border-b border-[#E2E5DF]">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45]">
              IA + EDUCAÇÃO
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221C] leading-snug">
              IA já faz parte da rotina escolar. E agora?
            </h2>
            <div className="text-sm sm:text-base text-[#687169] leading-relaxed space-y-3 pt-1">
              <p>
                Ferramentas de inteligência artificial deixaram de ser novidade para se tornarem
                auxiliares diários de estudo e pesquisa entre estudantes de todas as idades. A
                discussão agora não é proibir o acesso, mas ensinar pensamento crítico, checagem de
                fontes e uso ético.
              </p>
              <p>
                Escolas que integram a IA no processo pedagógico com regras claras reduzem a
                ansiedade de professores e preparam alunos para um mundo onde saber fazer as
                perguntas certas vale mais do que apenas decorar respostas prontas.
              </p>
            </div>
          </article>

          {/* Artigo 2: Tecnologia */}
          <article className="space-y-3 pb-10 border-b border-[#E2E5DF]">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45]">
              TECNOLOGIA
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221C] leading-snug">
              Meta muda as regras para adolescentes. O que pode mudar?
            </h2>
            <div className="text-sm sm:text-base text-[#687169] leading-relaxed space-y-3 pt-1">
              <p>
                As principais redes sociais estão implementando contas de proteção automática para
                menores de idade, restringindo mensagens diretas de desconhecidos e ativando
                lembretes de pausa no uso noturno.
              </p>
              <p>
                Para pais e educadores, a mudança traz mais tranquilidade, mas reforça que a
                supervisão próxima e o diálogo aberto continuam sendo o filtro mais seguro para a
                saúde digital de crianças e jovens.
              </p>
            </div>
          </article>

          {/* Artigo 3: Carreira */}
          <article className="space-y-3 pb-10 border-b border-[#E2E5DF]">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45]">
              CARREIRA
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17221C] leading-snug">
              O que a IA pode fazer com o primeiro emprego?
            </h2>
            <div className="text-sm sm:text-base text-[#687169] leading-relaxed space-y-3 pt-1">
              <p>
                Vagas de estágio e cargos de entrada estão mudando rápido de perfil: tarefas
                repetitivas de digitação e formatação foram absorvidas por sistemas automatizados.
              </p>
              <p>
                Em compensação, habilidades humanas como comunicação clara, resolução colaborativa
                de problemas e capacidade de aprender novas ferramentas em ritmo contínuo se
                tornaram o verdadeiro diferencial para quem está ingressando no mercado de trabalho.
              </p>
            </div>
          </article>
        </div>

        {/* Compact subscribe CTA at bottom */}
        <div className="mt-14 p-8 sm:p-10 bg-white border border-[#E2E5DF] rounded-2xl text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#17221C]">Gostou do conteúdo?</h3>
          <p className="text-sm sm:text-base text-[#687169] max-w-md mx-auto">
            Receba toda semana o resumo das tendências que moldam a próxima geração diretamente no
            seu e-mail ou WhatsApp.
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
