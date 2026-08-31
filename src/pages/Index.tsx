import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Sparkles, Coins, Briefcase } from 'lucide-react'
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
    <div className="w-full bg-[#FAFAF7]">
      {/* 1. HERO + CTA */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E2E5DF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (Main text) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tag above headline */}
              <div className="inline-flex items-center gap-2.5">
                <span className="w-6 h-[1.5px] bg-[#245C45]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#245C45]">
                  NEWSLETTER SEMANAL • GRATUITA
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#17221C] tracking-tight leading-[1.12]">
                <span>O futuro está mudando.</span>
                <br />
                <span className="relative inline-block mt-1 sm:mt-2">
                  <span className="relative z-10">A gente te ajuda a acompanhar.</span>
                  {/* Subtle highlighter bar behind the phrase in acid-lime #DDF36A */}
                  <span
                    className="absolute inset-x-0 bottom-1 sm:bottom-2 h-3.5 sm:h-4.5 bg-[#DDF36A] -z-0 rounded-sm"
                    aria-hidden="true"
                  />
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-xl text-[#687169] font-normal leading-relaxed max-w-xl">
                Toda semana, uma seleção simples das notícias e tendências em educação, tecnologia,
                dinheiro e carreira que estão moldando a próxima geração.
              </p>

              {/* Support line */}
              <p className="text-xs sm:text-sm font-medium text-[#687169] tracking-normal">
                Gratuito. 5 minutos por semana. Por e-mail ou WhatsApp.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={scrollToCadastro}
                  className="group inline-flex items-center justify-center gap-2.5 bg-[#245C45] hover:bg-[#1D4A38] active:scale-[0.98] text-white font-bold text-sm sm:text-[0.9375rem] uppercase tracking-wider px-7 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C45] focus-visible:ring-offset-2"
                >
                  <span>QUERO RECEBER O RADAR</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column (Minimalist Abstract Radar Mark) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative p-6 sm:p-10 rounded-full bg-[#FAFAF7]">
                <RadarMark size={280} className="w-56 h-56 sm:w-72 sm:h-72" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROVA DO CONTEÚDO (NESTA SEMANA NO RADAR) - placed right below hero */}
      <section className="py-14 sm:py-20 border-b border-[#E2E5DF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#245C45]">
              NESTA SEMANA NO RADAR
            </span>
            <span className="flex-grow h-[1px] bg-[#E2E5DF]" aria-hidden="true" />
          </div>

          {/* Three Content Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E5DF]">
            {/* Block 1 */}
            <div className="py-6 md:py-0 md:pr-8 first:pt-0 last:pb-0">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2.5">
                IA + EDUCAÇÃO
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#17221C] leading-snug">
                IA já faz parte da rotina escolar. E agora?
              </h3>
            </div>

            {/* Block 2 */}
            <div className="py-6 md:py-0 md:px-8">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2.5">
                TECNOLOGIA
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#17221C] leading-snug">
                Meta muda as regras para adolescentes. O que pode mudar?
              </h3>
            </div>

            {/* Block 3 */}
            <div className="py-6 md:py-0 md:pl-8">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2.5">
                CARREIRA
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#17221C] leading-snug">
                O que a IA pode fazer com o primeiro emprego?
              </h3>
            </div>
          </div>

          {/* Link to Edition #001 */}
          <div className="mt-10 sm:mt-12 pt-6 border-t border-[#E2E5DF]/60">
            <Link
              to="/edicao/001"
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#245C45] hover:text-[#1D4A38] transition-colors"
            >
              <span>VER A EDIÇÃO #001</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. O QUE VALE MANTER NO RADAR (4 CATEGORIAS) */}
      <section id="categorias" className="scroll-mt-24 py-16 sm:py-24 border-b border-[#E2E5DF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17221C] tracking-tight mb-12 sm:mb-16">
            O que vale manter no radar.
          </h2>

          {/* 4 Columns separated by light lines (not big cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-[#E2E5DF] sm:border-y sm:border-[#E2E5DF]">
            {/* 01 EDUCAÇÃO */}
            <div className="py-8 sm:py-10 sm:pr-6 lg:pr-8 sm:border-r border-[#E2E5DF]">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-5 h-5 text-[#245C45] stroke-[1.75]" aria-hidden="true" />
                <span className="text-3xl font-extrabold text-[#E2E5DF] select-none">01</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2">
                EDUCAÇÃO
              </h3>
              <p className="text-sm sm:text-[0.9375rem] text-[#687169] leading-relaxed">
                O que está mudando na forma de aprender.
              </p>
            </div>

            {/* 02 TECNOLOGIA */}
            <div className="py-8 sm:py-10 sm:px-6 lg:px-8 lg:border-r border-[#E2E5DF]">
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="w-5 h-5 text-[#245C45] stroke-[1.75]" aria-hidden="true" />
                <span className="text-3xl font-extrabold text-[#E2E5DF] select-none">02</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2">
                TECNOLOGIA
              </h3>
              <p className="text-sm sm:text-[0.9375rem] text-[#687169] leading-relaxed">
                IA, redes sociais e o mundo digital.
              </p>
            </div>

            {/* 03 DINHEIRO */}
            <div className="py-8 sm:py-10 sm:pr-6 lg:px-8 sm:border-r border-[#E2E5DF]">
              <div className="flex items-center justify-between mb-4">
                <Coins className="w-5 h-5 text-[#245C45] stroke-[1.75]" aria-hidden="true" />
                <span className="text-3xl font-extrabold text-[#E2E5DF] select-none">03</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2">
                DINHEIRO
              </h3>
              <p className="text-sm sm:text-[0.9375rem] text-[#687169] leading-relaxed">
                Mudanças que afetam escolhas e oportunidades.
              </p>
            </div>

            {/* 04 CARREIRA */}
            <div className="py-8 sm:py-10 sm:pl-6 lg:pl-8">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-5 h-5 text-[#245C45] stroke-[1.75]" aria-hidden="true" />
                <span className="text-3xl font-extrabold text-[#E2E5DF] select-none">04</span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#245C45] mb-2">
                CARREIRA
              </h3>
              <p className="text-sm sm:text-[0.9375rem] text-[#687169] leading-relaxed">
                O trabalho e as habilidades da próxima geração.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARA QUEM É */}
      <section className="py-16 sm:py-24 border-b border-[#E2E5DF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#17221C] tracking-tight mb-6">
              Para quem ajuda a preparar a próxima geração.
            </h2>

            {/* Audience chips / line with dot separators */}
            <div className="my-6">
              {/* Desktop version (single row) */}
              <div className="hidden sm:flex flex-wrap items-center gap-3 text-lg sm:text-xl font-bold text-[#245C45]">
                <span>Famílias</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#DDF36A] inline-block"
                  aria-hidden="true"
                />
                <span>Professores</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#DDF36A] inline-block"
                  aria-hidden="true"
                />
                <span>Educadores</span>
                <span
                  className="w-2 h-2 rounded-full bg-[#DDF36A] inline-block"
                  aria-hidden="true"
                />
                <span>Gestores escolares</span>
              </div>

              {/* Mobile version (2x2 grid) */}
              <div className="grid grid-cols-2 gap-3 sm:hidden text-left">
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E2E5DF] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#DDF36A] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#245C45]">Famílias</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E2E5DF] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#DDF36A] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#245C45]">Professores</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E2E5DF] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#DDF36A] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#245C45]">Educadores</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white border border-[#E2E5DF] rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#DDF36A] flex-shrink-0" />
                  <span className="text-sm font-bold text-[#245C45]">Gestores escolares</span>
                </div>
              </div>
            </div>

            {/* Supportive text */}
            <p className="text-base sm:text-lg text-[#687169] leading-relaxed pt-2">
              Não importa se a conversa acontece em casa ou na escola. O RADAR existe para ajudar
              quem precisa entender hoje as mudanças que vão impactar a próxima geração amanhã.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FORMULÁRIO (CADASTRO) */}
      <SignupForm />

      {/* 6. CTA FINAL (Background Verde #245C45 com botão #DDF36A) */}
      <section className="bg-[#245C45] text-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              O futuro já está acontecendo.
            </h2>
            <p className="text-base sm:text-xl text-white/85 font-normal leading-relaxed">
              Uma vez por semana, descubra o que realmente vale acompanhar.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToCadastro}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#DDF36A] hover:bg-[#d6ec5f] active:scale-[0.98] text-[#17221C] font-bold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-10 py-4 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DDF36A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#245C45]"
              >
                <span>QUERO RECEBER O RADAR</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
