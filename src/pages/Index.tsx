import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sparkles, Globe, Compass } from 'lucide-react'
import { RadarMark } from '@/components/RadarMark'
import { SignupForm } from '@/components/SignupForm'

export default function Index() {
  const scrollToCadastro = () => {
    const el = document.getElementById('cadastro')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full bg-[#FBFAF6]">
      {/* 1. HERO + CTA */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E7E5DC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (Main text) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tag above headline */}
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-[2px] bg-[#113D30]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC]">
                  NEWSLETTER SEMANAL • GRATUITA
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-[#113D30] tracking-tight leading-[1.12]">
                <span>As gerações estão mudando</span>
                <br />
                <span className="relative inline-block mt-1 sm:mt-2">
                  <span className="relative z-10">Acompanhe as transformações do futuro</span>
                  {/* Subtle soft lavender underline bar for contrast */}
                  <span
                    className="absolute inset-x-0 bottom-1 sm:bottom-2 h-3.5 sm:h-4.5 bg-[#9388BF]/25 -z-0 rounded-sm"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-xl text-[#5C6E67] font-normal leading-relaxed max-w-xl">
                Toda semana, uma seleção simples e essencial com o que está moldando a educação,
                tecnologia, comportamento e o futuro da próxima geração.
              </p>

              {/* Support line */}
              <p className="text-xs sm:text-sm font-medium text-[#7C74AC] tracking-normal">
                Gratuito. 5 minutos por semana. Por e-mail ou WhatsApp.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToCadastro}
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#113D30] hover:bg-[#0C2D23] active:scale-[0.98] text-[#FBFAF6] font-bold text-sm sm:text-[0.95rem] tracking-wide px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] focus-visible:ring-offset-2 shadow-sm"
                >
                  <span>Quero receber o Radar</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column (Minimalist Abstract Radar Mark with official leaves) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative p-4 sm:p-8 rounded-full bg-[#FBFAF6]">
                <RadarMark size={280} className="w-56 h-56 sm:w-72 sm:h-72" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRÉVIA DA EDIÇÃO (NESTA SEMANA NO RADAR) - PAUTAS REAIS DA EDIÇÃO #001 */}
      <section className="py-14 sm:py-20 border-b border-[#E7E5DC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC]">
              NESTA SEMANA NO RADAR
            </span>
            <span className="flex-grow h-[1px] bg-[#E7E5DC]" aria-hidden="true" />
          </div>

          {/* Three Content Blocks with real edition #001 topics */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E7E5DC]">
            {/* Card 1 - O Futuro Hoje */}
            <div className="py-6 md:py-0 md:pr-8 first:pt-0 last:pb-0 group">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#9388BF]/15 text-[#113D30] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#7C74AC]" />
                <span>O Futuro Hoje</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#113D30] leading-snug group-hover:text-[#7C74AC] transition-colors">
                O estudo chinês que revela a pegadinha da IA nas tarefas de casa
              </h3>
            </div>

            {/* Card 2 - Mundo Conectado */}
            <div className="py-6 md:py-0 md:px-8 group">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#7C74AC]/15 text-[#113D30] text-xs font-bold uppercase tracking-wider mb-3">
                <Globe className="w-3.5 h-3.5 text-[#7C74AC]" />
                <span>Mundo Conectado</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#113D30] leading-snug group-hover:text-[#7C74AC] transition-colors">
                O acordo bilionário da Meta
              </h3>
            </div>

            {/* Card 3 - Boletim */}
            <div className="py-6 md:py-0 md:pl-8 group">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#113D30]/10 text-[#113D30] text-xs font-bold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#113D30]" />
                <span>Boletim</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#113D30] leading-snug group-hover:text-[#7C74AC] transition-colors">
                Por que a mensalidade da escola particular vai subir de novo em 2026
              </h3>
            </div>
          </div>

          {/* Link to Edition #001 */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[#E7E5DC]">
            <Link
              to="/edicao/001"
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#113D30] hover:text-[#7C74AC] transition-colors"
            >
              <span>LER A EDIÇÃO COMPLETA #001</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. O QUE VALE MANTER NO RADAR (4 CATEGORIAS OFICIAIS - SEM NÚMEROS, ETIQUETAS COLORIDAS) */}
      <section id="categorias" className="scroll-mt-24 py-16 sm:py-24 border-b border-[#E7E5DC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC] block mb-2">
              CURADORIA SEMANAL
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#113D30] tracking-tight">
              O que vale manter no radar.
            </h2>
          </div>

          {/* 4 Official Categories without numbering, soft colored category pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-[#E7E5DC] sm:border-y sm:border-[#E7E5DC]">
            {/* 1. Boletim */}
            <div className="py-8 sm:py-10 sm:pr-6 lg:pr-8 sm:border-r border-[#E7E5DC] flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#113D30]/10 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[#113D30]" />
                    Boletim
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#113D30] mb-2">Boletim</h3>
                <p className="text-sm sm:text-[0.9375rem] text-[#5C6E67] leading-relaxed">
                  Escola, gestão escolar, políticas educacionais. Decisões que nascem da
                  instituição.
                </p>
              </div>
            </div>

            {/* 2. O Futuro Hoje */}
            <div className="py-8 sm:py-10 sm:px-6 lg:px-8 lg:border-r border-[#E7E5DC] flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9388BF]/20 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#7C74AC]" />
                    O Futuro Hoje
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#113D30] mb-2">
                  O Futuro Hoje
                </h3>
                <p className="text-sm sm:text-[0.9375rem] text-[#5C6E67] leading-relaxed">
                  Tecnologia, inteligência artificial, inovação. Tudo que ainda está se formando.
                </p>
              </div>
            </div>

            {/* 3. Mundo Conectado */}
            <div className="py-8 sm:py-10 sm:pr-6 lg:px-8 sm:border-r border-[#E7E5DC] flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C74AC]/20 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-[#7C74AC]" />
                    Mundo Conectado
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#113D30] mb-2">
                  Mundo Conectado
                </h3>
                <p className="text-sm sm:text-[0.9375rem] text-[#5C6E67] leading-relaxed">
                  Internet, redes sociais, plataformas, segurança digital. Como a próxima geração
                  vive online.
                </p>
              </div>
            </div>

            {/* 4. Plano de Voo (Dinheiro + Carreira unificados) */}
            <div className="py-8 sm:py-10 sm:pl-6 lg:pl-8 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9388BF]/30 text-[#113D30] text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-[#7C74AC]" />
                    Plano de Voo
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#113D30] mb-2">Plano de Voo</h3>
                <p className="text-sm sm:text-[0.9375rem] text-[#5C6E67] leading-relaxed">
                  Planejamento financeiro, decisões de futuro, faculdade, carreira, oportunidades.
                  Decisões que a família precisa tomar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARA QUEM É */}
      <section className="py-16 sm:py-24 border-b border-[#E7E5DC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#113D30] tracking-tight mb-6">
              Para quem ajuda a preparar a próxima geração.
            </h2>

            {/* Audience chips with subtle lavender dot separators */}
            <div className="my-6">
              {/* Desktop version (single row) */}
              <div className="hidden sm:flex flex-wrap items-center gap-3 text-lg sm:text-xl font-bold text-[#113D30]">
                <span>Famílias</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#9388BF] inline-block"
                  aria-hidden="true"
                />
                <span>Professores</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#9388BF] inline-block"
                  aria-hidden="true"
                />
                <span>Educadores</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#9388BF] inline-block"
                  aria-hidden="true"
                />
                <span>Gestores escolares</span>
              </div>

              {/* Mobile version (2x2 grid) */}
              <div className="grid grid-cols-2 gap-3 sm:hidden text-left">
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E7E5DC] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#9388BF] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#113D30]">Famílias</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E7E5DC] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#9388BF] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#113D30]">Professores</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E7E5DC] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#9388BF] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#113D30]">Educadores</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E7E5DC] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#9388BF] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#113D30]">Gestores escolares</span>
                </div>
              </div>
            </div>

            {/* Supportive text */}
            <p className="text-base sm:text-lg text-[#5C6E67] leading-relaxed pt-2">
              Não importa se a conversa acontece em casa ou na escola. O Radar existe para ajudar
              quem precisa entender hoje as mudanças que vão impactar a próxima geração amanhã.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FORMULÁRIO (CADASTRO) */}
      <SignupForm />

      {/* 6. CTA FINAL (Background Verde escuro #113D30 com botão lavanda suave ou warm white) */}
      <section className="bg-[#113D30] text-[#FBFAF6] py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9388BF] block">
              SEMPRE ÀS SEXTAS-FEIRAS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FBFAF6] leading-tight">
              O futuro já está acontecendo.
            </h2>
            <p className="text-base sm:text-xl text-[#FBFAF6]/80 font-normal leading-relaxed">
              Uma vez por semana, descubra o que realmente vale acompanhar.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToCadastro}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#9388BF] hover:bg-[#7C74AC] active:scale-[0.98] text-[#FBFAF6] font-bold text-sm sm:text-base tracking-wide px-8 sm:px-10 py-4 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9388BF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#113D30]"
              >
                <span>Quero receber o Radar</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
