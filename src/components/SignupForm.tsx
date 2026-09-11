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
  // Passo 2 (opcional)
  perfil?: string
  faixaEtaria?: string
  temas?: string[]
}

const ROLES_OPTIONS = ['Família', 'Professor(a)', 'Gestor(a)', 'Trabalho com educação', 'Outro']

const AGE_RANGES_OPTIONS = ['0–5', '6–10', '11–14', '15–17', '18+']

const TOPICS_OPTIONS = [
  'Boletim (Escola & Gestão)',
  'O Futuro Hoje (IA & Tecnologia)',
  'Mundo Conectado (Internet & Redes)',
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
  const consentEmailId = useId()
  const consentWhatsappId = useId()

  // Form State - Passo 1
  const [nome, setNome] = useState('')
  const [channelEmail, setChannelEmail] = useState(true)
  const [channelWhatsapp, setChannelWhatsapp] = useState(false)
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [consentEmail, setConsentEmail] = useState(true)
  const [consentWhatsapp, setConsentWhatsapp] = useState(false)

  // Form State - Passo 2
  const [perfil, setPerfil] = useState<string>('')
  const [faixaEtaria, setFaixaEtaria] = useState<string>('')
  const [temas, setTemas] = useState<string[]>([])

  // Armazena dados submetidos do Passo 1 para unificar com o Passo 2 caso salvo
  const [savedSignupData, setSavedSignupData] = useState<SignupData | null>(null)

  // UI Flow states
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step2Finished, setStep2Finished] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
        newErrors.email = 'Informe seu endereço de e-mail.'
      }
      if (!consentEmail) {
        newErrors.consentEmail = 'É necessário confirmar o recebimento por e-mail.'
      }
    }

    if (channelWhatsapp) {
      const digits = whatsapp.replace(/\D/g, '')
      if (digits.length < 10) {
        newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD (ex: 11 98765-4321).'
      }
      if (!consentWhatsapp) {
        newErrors.consentWhatsapp = 'É necessário confirmar o recebimento pelo WhatsApp.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitPasso1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasso1()) return

    setIsSubmitting(true)

    const payload: SignupData = {
      nome: nome.trim(),
      canais: {
        email: channelEmail,
        whatsapp: channelWhatsapp,
      },
      email: channelEmail ? email.trim() : '',
      whatsapp: channelWhatsapp ? whatsapp.trim() : '',
      consentEmail: channelEmail && consentEmail,
      consentWhatsapp: channelWhatsapp && consentWhatsapp,
    }

    // Persistência simulada em memória (ou chamada a backend se conectado futuramente)
    setTimeout(() => {
      setSavedSignupData(payload)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 250)
  }

  const handleSavePasso2 = () => {
    const completeData: SignupData = {
      ...(savedSignupData ?? {
        nome: nome.trim(),
        canais: { email: channelEmail, whatsapp: channelWhatsapp },
        email: channelEmail ? email.trim() : '',
        whatsapp: channelWhatsapp ? whatsapp.trim() : '',
        consentEmail: channelEmail && consentEmail,
        consentWhatsapp: channelWhatsapp && consentWhatsapp,
      }),
      perfil: perfil || undefined,
      faixaEtaria: faixaEtaria || undefined,
      temas: temas.length > 0 ? temas : undefined,
    }

    setSavedSignupData(completeData)
    setStep2Finished('Pronto! Seu RADAR vai ficar ainda mais relevante para você.')
  }

  const handleSkipPasso2 = () => {
    setStep2Finished('Tudo certo! Suas preferências ficam para depois.')
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

          {!isSubmitted ? (
            /* PASSO 1 FORM */
            <form onSubmit={handleSubmitPasso1} noValidate className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DC]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C74AC]">
                  PASSO 1 DE 2
                </span>
                <span className="text-xs text-[#5C6E67] font-medium">Cadastro gratuito</span>
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
                  onChange={(e) => setNome(e.target.value)}
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

              {/* Campo E-mail com seleção e consentimento embaixo */}
              <div className="space-y-2">
                <label htmlFor={emailInputId} className="block text-sm font-bold text-[#113D30]">
                  E-mail
                </label>
                <input
                  id={emailInputId}
                  type="email"
                  value={email}
                  disabled={!channelEmail}
                  onChange={(e) => setEmail(e.target.value)}
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

                {/* Checkbox de seleção do canal E-mail embaixo do campo */}
                <div className="pt-1 space-y-1.5">
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
                        setConsentEmail(checked)
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                    />
                    <span className="text-xs text-[#5C6E67] leading-tight">
                      Quero receber as edições por{' '}
                      <strong className="text-[#113D30] font-semibold">E-mail</strong>
                    </span>
                  </label>

                  {/* Consentimento específico exibido quando o canal está selecionado */}
                  {channelEmail && (
                    <label
                      htmlFor={consentEmailId}
                      className="flex items-start gap-2.5 pl-6 pt-0.5 cursor-pointer select-none"
                    >
                      <input
                        id={consentEmailId}
                        type="checkbox"
                        checked={consentEmail}
                        onChange={(e) => setConsentEmail(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                      />
                      <span className="text-[11px] text-[#5C6E67] leading-tight">
                        Concordo em receber a curadoria semanal e comunicados do RADAR por e-mail.
                      </span>
                    </label>
                  )}
                  {errors.consentEmail && (
                    <p className="pl-6 text-xs text-[#B85C3C] font-medium">{errors.consentEmail}</p>
                  )}
                </div>
              </div>

              {/* Campo WhatsApp com seleção e consentimento embaixo */}
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
                    onChange={handlePhoneChange}
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

                {/* Checkbox de seleção do canal WhatsApp embaixo do campo */}
                <div className="pt-1 space-y-1.5">
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
                        setConsentWhatsapp(checked)
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                    />
                    <span className="text-xs text-[#5C6E67] leading-tight">
                      Quero receber as edições por{' '}
                      <strong className="text-[#113D30] font-semibold">WhatsApp</strong>
                    </span>
                  </label>

                  {/* Consentimento específico exibido quando o canal está selecionado */}
                  {channelWhatsapp && (
                    <label
                      htmlFor={consentWhatsappId}
                      className="flex items-start gap-2.5 pl-6 pt-0.5 cursor-pointer select-none"
                    >
                      <input
                        id={consentWhatsappId}
                        type="checkbox"
                        checked={consentWhatsapp}
                        onChange={(e) => setConsentWhatsapp(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded border-[#E7E5DC] text-[#113D30] accent-[#113D30] focus:ring-[#113D30]"
                      />
                      <span className="text-[11px] text-[#5C6E67] leading-tight">
                        Concordo em receber mensagens do RADAR no número informado via WhatsApp.
                      </span>
                    </label>
                  )}
                  {errors.consentWhatsapp && (
                    <p className="pl-6 text-xs text-[#B85C3C] font-medium">
                      {errors.consentWhatsapp}
                    </p>
                  )}
                </div>
              </div>

              {/* Erro de canal geral (caso nenhum canal tenha sido marcado) */}
              {errors.canais && (
                <div className="p-3 bg-[#B85C3C]/10 border border-[#B85C3C]/20 rounded-[10px]">
                  <p className="text-xs text-[#B85C3C] font-medium">{errors.canais}</p>
                </div>
              )}

              {/* Clear support text above CTA button */}
              <div className="pt-2">
                <p className="text-xs text-[#5C6E67] text-center mb-2.5 leading-relaxed">
                  Sem spam, sem pegadinhas. Você pode cancelar ou alterar seus canais a qualquer
                  momento com apenas 1 clique.
                </p>
                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] active:scale-[0.99] text-[#FBFAF6] font-bold text-sm tracking-wide py-3.5 px-6 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#113D30] focus-visible:ring-offset-2 disabled:opacity-60 shadow-sm"
                >
                  <span>{isSubmitting ? 'Enviando...' : 'Entrar no Radar'}</span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </form>
          ) : (
            /* SUCCESS STATE + PASSO 2 OPCIONAL */
            <div className="space-y-8">
              {/* Success Badge & Message */}
              <div className="p-6 bg-[#FBFAF6] border border-[#E7E5DC] rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#113D30] text-[#FBFAF6] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#113D30]">Você está no Radar.</h3>
                </div>
                <p className="text-[#5C6E67] text-sm sm:text-base pl-10">
                  A próxima edição chega pontualmente pelo canal que você escolheu.
                </p>
              </div>

              {/* Step 2 (Optional) */}
              {step2Finished === null ? (
                <div className="pt-2 space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E5DC]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7C74AC]">
                      PASSO 2 (opcional)
                    </span>
                    <span className="text-xs text-[#5C6E67] font-medium">Personalização</span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#113D30] mb-4">
                      Quer deixar seu Radar mais relevante para você?
                    </h4>

                    {/* Você é: */}
                    <div className="space-y-2 mb-5">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                        Você é:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ROLES_OPTIONS.map((role) => {
                          const isSelected = perfil === role
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setPerfil(isSelected ? '' : role)}
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
                    </div>

                    {/* Faixa etária */}
                    <div className="space-y-2 mb-5">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                        Faixa etária dos seus filhos/alunos:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {AGE_RANGES_OPTIONS.map((range) => {
                          const isSelected = faixaEtaria === range
                          return (
                            <button
                              key={range}
                              type="button"
                              onClick={() => setFaixaEtaria(isSelected ? '' : range)}
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
                    </div>

                    {/* Temas que mais interessam */}
                    <div className="space-y-2 mb-6">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
                        Categorias de maior interesse:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS_OPTIONS.map((tema) => {
                          const isSelected = temas.includes(tema)
                          return (
                            <button
                              key={tema}
                              type="button"
                              onClick={() => toggleTema(tema)}
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
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleSavePasso2}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#113D30] hover:bg-[#0C2D23] text-[#FBFAF6] font-bold text-xs sm:text-sm tracking-wide py-3 px-6 rounded-full transition-colors"
                      >
                        <span>Personalizar meu Radar</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleSkipPasso2}
                        className="w-full sm:w-auto text-center text-sm font-medium text-[#5C6E67] hover:text-[#113D30] py-2 px-4 transition-colors"
                      >
                        Agora não
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#FBFAF6] border border-[#E7E5DC] text-sm text-[#113D30] font-medium">
                  {step2Finished}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
