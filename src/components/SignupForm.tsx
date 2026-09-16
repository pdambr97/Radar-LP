import { useState, useId } from 'react'
import { Check, ArrowRight } from 'lucide-react'

export interface SignupData {
  nome: string
  canais: {
    email: boolean
    whatsapp: boolean
  }
  email: string
  whatsapp: string
  consentEmail: boolean
  consentWhatsapp: boolean
  // Passo 2 (obrigatório para finalizar cadastro)
  perfil: string
  faixaEtaria: string
  temas: string[]
}

const ROLES_OPTIONS = ['Família', 'Professor(a)', 'Gestor(a)', 'Trabalho com educação', 'Outro']

const AGE_RANGES_OPTIONS = ['0–5', '6–10', '11–14', '15–17', '18+']

const TOPICS_OPTIONS = [
  'Boletim (Educação)',
  'O Futuro Hoje (IA & Tecnologia)',
  'Mundo Conectado (Redes Sociais)',
  'Plano de Voo (Finanças & Futuro)',
]

// Mask phone to Brazilian format: (11) 98765-4321
function formatBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  if (digits.length <= 2) {
    return `(${digits}`
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}

export function SignupForm() {
  const nameInputId = useId()
  const emailInputId = useId()
  const phoneInputId = useId()
  const channelEmailId = useId()
  const channelWhatsappId = useId()

  // Form State - Passo 1
  const [nome, setNome] = useState('')
  // Ambos os canais previamente selecionados (por default)
  const [channelEmail, setChannelEmail] = useState(true)
  const [channelWhatsapp, setChannelWhatsapp] = useState(true)
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  // Form State - Passo 2
  const [step, setStep] = useState<1 | 2>(1)
  const [perfil, setPerfil] = useState<string>('')
  const [faixaEtaria, setFaixaEtaria] = useState<string>('')
  const [temas, setTemas] = useState<string[]>([])

  // Armazena dados da submissão final
  const [savedSignupData, setSavedSignupData] = useState<SignupData | null>(null)

  // UI Flow states
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string>('')

  // Phone input helper
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBrazilianPhone(e.target.value)
    setWhatsapp(formatted)
  }

  // Toggle topics in Step 2
  const toggleTema = (tema: string) => {
    setTemas((prev) => (prev.includes(tema) ? prev.filter((t) => t !== tema) : [...prev, tema]))
  }

  const validatePasso1 = () => {
    const newErrors: Record<string, string> = {}

    if (!nome.trim() || nome.trim().length < 2) {
      newErrors.nome = 'Por favor, informe seu nome.'
    }

    if (!channelEmail && !channelWhatsapp) {
      newErrors.canais = 'Escolha pelo menos um canal (E-mail ou WhatsApp).'
    }

    if (channelEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email.trim() || !emailRegex.test(email.trim())) {
        newErrors.email = 'Informe um endereço de e-mail válido.'
      }
    }

    if (channelWhatsapp) {
      const digits = whatsapp.replace(/\D/g, '')
      if (digits.length < 10) {
        newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD (ex: 11 98765-4321).'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasso2 = () => {
    const newErrors: Record<string, string> = {}

    if (!perfil) {
      newErrors.perfil = 'Selecione quem você é para continuar.'
    }

    if (!faixaEtaria) {
      newErrors.faixaEtaria = 'Selecione a faixa etária dos seus filhos ou alunos.'
    }

    if (temas.length === 0) {
      newErrors.temas = 'Selecione pelo menos um tema de interesse.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasso1()) return
    setErrors({})
    setStep(2)
  }

  const handleBackToStep1 = () => {
    setErrors({})
    setStep(1)
  }

  const handleSubmitFinal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasso2()) return

    setIsSubmitting(true)
    setSubmitError('')

    const payload: SignupData = {
      nome: nome.trim(),
      canais: {
        email: channelEmail,
        whatsapp: channelWhatsapp,
      },
      email: channelEmail ? email.trim() : '',
      whatsapp: channelWhatsapp ? whatsapp.trim() : '',
      consentEmail: channelEmail,
      consentWhatsapp: channelWhatsapp,
      perfil,
      faixaEtaria,
      temas,
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: payload.nome,
          email: payload.email,
          whatsapp: payload.whatsapp,
        }),
      })

      if (!response.ok) {
        throw new Error('Falha ao concluir o cadastro. Tente novamente em instantes.')
      }

      setSavedSignupData(payload)
      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Falha ao concluir o cadastro. Tente novamente.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cadastro" className="scroll-mt-24 py-16 sm:py-24">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E7E5DC] rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113D30] tracking-tight">
              Entre no Radar.
            </h2>
            <p className="text-[#5C6E67] text-base sm:text-lg mt-1 font-normal">
              Receba gratuitamente a próxima edição direto no seu e-mail ou WhatsApp.
            </p>
          </div>

          {isSubmitted ? (
            /* SUCESSO - CADASTRO COMPLETO */
            <div className="space-y-6">
              <div className="p-6 bg-[#FBFAF6] border border-[#E7E5DC] rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#113D30] text-[#FBFAF6] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#113D30]">Você está no Radar.</h3>
                </div>
                <p className="text-[#5C6E67] text-sm sm:text-base pl-10 leading-relaxed">
                  {savedSignupData?.nome ? `${savedSignupData.nome}, seu` : 'Seu'} cadastro foi
                  realizado com sucesso! A próxima edição chega pontualmente pelo
                  {savedSignupData?.canais.email && savedSignupData?.canais.whatsapp
                    ? ' e-mail e WhatsApp'
                    : savedSignupData?.canais.whatsapp
                      ? ' WhatsApp'
                      : ' e-mail'}{' '}
                  com curadoria alinhada ao seu perfil.
                </p>
              </div>

              {/* Resumo da personalização cadastrada */}
              <div className="p-5 bg-white border border-[#E7E5DC] rounded-xl space-y-3 text-xs sm:text-sm text-[#5C6E67]">
                <p className="font-bold text-[#113D30] text-xs uppercase tracking-wider">
                  Suas preferências registradas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {savedSignupData?.perfil && (
                    <span className="px-3 py-1 bg-[#113D30]/10 text-[#113D30] font-medium rounded-full">
                      Perfil: {savedSignupData.perfil}
                    </span>
                  )}
                  {savedSignupData?.faixaEtaria && (
                    <span className="px-3 py-1 bg-[#7C74AC]/15 text-[#113D30] font-medium rounded-full">
                      Idades: {savedSignupData.faixaEtaria}
                    </span>
                  )}
                </div>
                {savedSignupData?.temas && savedSignupData.temas.length > 0 && (
                  <div className="pt-1">
                    <span className="font-semibold text-[#113D30]">Temas: </span>
                    <span>{savedSignupData.temas.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ) : step === 1 ? (
            /* PASSO 1 FORM */
            <form onSubmit={handleNextStep} noValidate className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DC]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C74AC]">
                  PASSO 1 DE 2
                </span>
                <span className="text-xs text-[#5C6E67] font-medium">Dados de contato</span>
              </div>

              {/* Campo Nome */}
              <div>
                <label
                  htmlFor={nameInputId}
                  className="block text-sm font-bold text-[#113D30] mb-2"
                >
                  Nome
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value)
                    if (errors.nome) setErrors((prev) => ({ ...prev, nome: '' }))
                  }}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  className={`w-full px-4 py-3 bg-[#FBFAF6] border rounded-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-[0.9375rem] transition-colors focus:outline-none focus:bg-white focus:border-[#113D30] focus:ring-2 focus:ring-[#113D30]/20 ${
                    errors.nome ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'
                  }`}
                />
                {errors.nome && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.nome}</p>
                )}
              </div>

              {/* Campo E-mail com seleção (previamente selecionado) e texto informativo simples (sem segunda caixa de seleção) */}
              <div className="space-y-2">
                <label htmlFor={emailInputId} className="block text-sm font-bold text-[#113D30]">
                  E-mail
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  value={email}
                  disabled={!channelEmail}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                  }}
                  placeholder={
                    channelEmail ? 'seu.email@exemplo.com' : 'Marque a opção abaixo para ativar'
                  }
                  autoComplete="email"
                  className={`w-full px-4 py-3 rounded-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-[0.9375rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#113D30]/20 ${
                    channelEmail
                      ? 'bg-[#FBFAF6] focus:bg-white border focus:border-[#113D30]'
                      : 'bg-[#F2EFE9]/60 text-[#5C6E67] border border-[#E7E5DC] cursor-not-allowed opacity-75'
                  } ${errors.email ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'}`}
                />
                {errors.email && (
                  <p className="text-xs text-[#B85C3C] font-medium">{errors.email}</p>
                )}

                {/* Checkbox ÚNICO de seleção do canal E-mail embaixo do campo */}
                <div className="pt-1 space-y-1">
                  <label
                    htmlFor={channelEmailId}
                    className="flex items-start gap-2.5 cursor-pointer select-none"
                  >
                    <input
                      id={channelEmailId}
                      type="checkbox"
                      checked={channelEmail}
                      onChange={(e) => {
                        const checked = e.target.checked
                        setChannelEmail(checked)
                        if (errors.canais) setErrors((prev) => ({ ...prev, canais: '' }))
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                    />
                    <span className="text-xs text-[#5C6E67] leading-tight">
                      Quero receber as edições por{' '}
                      <strong className="text-[#113D30] font-semibold">E-mail</strong>
                    </span>
                  </label>

                  {/* Texto informativo simples de consentimento quando o canal está ativo (sem segunda caixa de seleção) */}
                  {channelEmail && (
                    <p className="pl-6 text-[11px] text-[#5C6E67] leading-tight">
                      Você receberá a curadoria semanal e comunicados do RADAR por e-mail.
                    </p>
                  )}
                </div>
              </div>

              {/* Campo WhatsApp com seleção (previamente selecionado) e texto informativo simples (sem segunda caixa de seleção) */}
              <div className="space-y-2">
                <label htmlFor={phoneInputId} className="block text-sm font-bold text-[#113D30]">
                  WhatsApp
                </label>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-3.5 py-3 rounded-l-[10px] border border-r-0 text-sm font-medium transition-colors ${
                      channelWhatsapp
                        ? 'border-[#E7E5DC] bg-[#FBFAF6] text-[#5C6E67]'
                        : 'border-[#E7E5DC] bg-[#F2EFE9]/60 text-[#5C6E67]/70'
                    }`}
                  >
                    +55
                  </span>
                  <input
                    id={phoneInputId}
                    type="tel"
                    value={whatsapp}
                    disabled={!channelWhatsapp}
                    onChange={(e) => {
                      handlePhoneChange(e)
                      if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }))
                    }}
                    placeholder={
                      channelWhatsapp ? '(11) 98765-4321' : 'Marque a opção abaixo para ativar'
                    }
                    autoComplete="tel-national"
                    className={`w-full px-4 py-3 rounded-r-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-[0.9375rem] transition-colors focus:outline-none focus:ring-2 focus:ring-[#113D30]/20 ${
                      channelWhatsapp
                        ? 'bg-[#FBFAF6] focus:bg-white border focus:border-[#113D30]'
                        : 'bg-[#F2EFE9]/60 text-[#5C6E67] border border-[#E7E5DC] cursor-not-allowed opacity-75'
                    } ${errors.whatsapp ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'}`}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-xs text-[#B85C3C] font-medium">{errors.whatsapp}</p>
                )}

                {/* Checkbox ÚNICO de seleção do canal WhatsApp embaixo do campo */}
                <div className="pt-1 space-y-1">
                  <label
                    htmlFor={channelWhatsappId}
                    className="flex items-start gap-2.5 cursor-pointer select-none"
                  >
                    <input
                      id={channelWhatsappId}
                      type="checkbox"
                      checked={channelWhatsapp}
                      onChange={(e) => {
                        const checked = e.target.checked
                        setChannelWhatsapp(checked)
                        if (errors.canais) setErrors((prev) => ({ ...prev, canais: '' }))
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                    />
                    <span className="text-xs text-[#5C6E67] leading-tight">
                      Quero receber as edições por{' '}
                      <strong className="text-[#113D30] font-semibold">WhatsApp</strong>
                    </span>
                  </label>

                  {/* Texto informativo simples de consentimento quando o canal está ativo (sem segunda caixa de seleção) */}
                  {channelWhatsapp && (
                    <p className="pl-6 text-[11px] text-[#5C6E67] leading-tight">
                      Você receberá as mensagens semanais do RADAR no número informado via WhatsApp.
                    </p>
                  )}
                </div>
              </div>

              {/* Erro de canal geral (caso o usuário desmarque ambos os canais) */}
              {errors.canais && (
                <div className="p-3 bg-[#B85C3C]/10 border border-[#B85C3C]/20 rounded-[10px]">
                  <p className="text-xs text-[#B85C3C] font-medium">{errors.canais}</p>
                </div>
              )}

              {/* Texto de suporte e botão de avançar para o Passo 2 */}
              <div className="pt-2">
                <p className="text-xs text-[#5C6E67] text-center mb-2.5 leading-relaxed">
                  Sem spam, sem pegadinhas. Você pode cancelar ou alterar seus canais a qualquer
                  momento com apenas 1 clique.
                </p>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] active:scale-[0.99] text-[#FBFAF6] font-bold text-sm tracking-wide py-3.5 px-6 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] focus-visible:ring-offset-2 shadow-sm"
                >
                  <span>Entrar no Radar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-[#5C6E67] text-center mt-2">
                  Próxima etapa: personalização das suas edições (Passo 2)
                </p>
              </div>
            </form>
          ) : (
            /* PASSO 2 FORM - OBRIGATÓRIO PARA CONCLUIR O CADASTRO */
            <form onSubmit={handleSubmitFinal} noValidate className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DC]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C74AC]">
                  PASSO 2 DE 2
                </span>
                <span className="text-xs text-[#5C6E67] font-medium">
                  Personalização obrigatória
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#113D30] mb-1">
                  Personalize seu Radar
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6E67] mb-5">
                  Preencha os campos abaixo para calibrar a curadoria antes de concluir seu
                  cadastro.
                </p>

                {/* Você é: */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                      Você é: <span className="text-[#B85C3C]">*</span>
                    </span>
                    {perfil && (
                      <span className="text-[11px] text-[#113D30] font-medium">
                        Selecionado: {perfil}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ROLES_OPTIONS.map((role) => {
                      const isSelected = perfil === role
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setPerfil(role)
                            if (errors.perfil) setErrors((prev) => ({ ...prev, perfil: '' }))
                          }}
                          className={`text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full border transition-colors ${
                            isSelected
                              ? 'bg-[#113D30] text-[#FBFAF6] border-[#113D30]'
                              : 'bg-[#FBFAF6] text-[#113D30] border-[#E7E5DC] hover:border-[#7C74AC]'
                          }`}
                        >
                          {role}
                        </button>
                      )
                    })}
                  </div>
                  {errors.perfil && (
                    <p className="text-xs text-[#B85C3C] font-medium mt-1">{errors.perfil}</p>
                  )}
                </div>

                {/* Faixa etária */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                      Faixa etária dos seus filhos/alunos: <span className="text-[#B85C3C]">*</span>
                    </span>
                    {faixaEtaria && (
                      <span className="text-[11px] text-[#113D30] font-medium">
                        Selecionado: {faixaEtaria} anos
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {AGE_RANGES_OPTIONS.map((range) => {
                      const isSelected = faixaEtaria === range
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => {
                            setFaixaEtaria(range)
                            if (errors.faixaEtaria)
                              setErrors((prev) => ({ ...prev, faixaEtaria: '' }))
                          }}
                          className={`text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full border transition-colors ${
                            isSelected
                              ? 'bg-[#113D30] text-[#FBFAF6] border-[#113D30]'
                              : 'bg-[#FBFAF6] text-[#113D30] border-[#E7E5DC] hover:border-[#7C74AC]'
                          }`}
                        >
                          {range}
                        </button>
                      )
                    })}
                  </div>
                  {errors.faixaEtaria && (
                    <p className="text-xs text-[#B85C3C] font-medium mt-1">{errors.faixaEtaria}</p>
                  )}
                </div>

                {/* Temas que mais interessam */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                      Temas que mais interessam: <span className="text-[#B85C3C]">*</span>
                    </span>
                    {temas.length > 0 && (
                      <span className="text-[11px] text-[#113D30] font-medium">
                        {temas.length} {temas.length === 1 ? 'tema' : 'temas'}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS_OPTIONS.map((tema) => {
                      const isSelected = temas.includes(tema)
                      return (
                        <button
                          key={tema}
                          type="button"
                          onClick={() => {
                            toggleTema(tema)
                            if (errors.temas) setErrors((prev) => ({ ...prev, temas: '' }))
                          }}
                          className={`text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full border transition-colors ${
                            isSelected
                              ? 'bg-[#113D30] text-[#FBFAF6] border-[#113D30]'
                              : 'bg-[#FBFAF6] text-[#113D30] border-[#E7E5DC] hover:border-[#7C74AC]'
                          }`}
                        >
                          {tema}
                        </button>
                      )
                    })}
                  </div>
                  {errors.temas && (
                    <p className="text-xs text-[#B85C3C] font-medium mt-1">{errors.temas}</p>
                  )}
                </div>

                {/* Erro de submissão (falha ao chamar o backend) */}
                {submitError && (
                  <div className="p-3 bg-[#B85C3C]/10 border border-[#B85C3C]/20 rounded-[10px] mb-3">
                    <p className="text-xs text-[#B85C3C] font-medium">{submitError}</p>
                  </div>
                )}

                {/* Action buttons (Botão final "Personalizar e Concluir Cadastro" / "Entrar no Radar" e link/botão para voltar ao Passo 1) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] active:scale-[0.99] text-[#FBFAF6] font-bold text-sm tracking-wide py-3.5 px-6 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] focus-visible:ring-offset-2 disabled:opacity-60 shadow-sm"
                  >
                    <span>
                      {isSubmitting ? 'Finalizando cadastro...' : 'Personalizar meu Radar e Entrar'}
                    </span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleBackToStep1}
                    className="w-full sm:w-auto text-center text-xs sm:text-sm font-medium text-[#5C6E67] hover:text-[#113D30] py-2 px-4 transition-colors"
                  >
                    Voltar aos dados de contato
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
