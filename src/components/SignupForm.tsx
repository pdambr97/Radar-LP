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
  'Educação',
  'Dinheiro',
  'IA e tecnologia',
  'Carreira',
  'Internet e segurança',
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
        newErrors.email = 'Informe um endereço de e-mail válido.'
      }
      if (!consentEmail) {
        newErrors.consentEmail = 'É necessário concordar para receber por e-mail.'
      }
    }

    if (channelWhatsapp) {
      const digits = whatsapp.replace(/\D/g, '')
      if (digits.length < 10) {
        newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD (ex: 11 98765-4321).'
      }
      if (!consentWhatsapp) {
        newErrors.consentWhatsapp = 'É necessário concordar para receber pelo WhatsApp.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitPasso1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePasso1()) return

    setIsSubmitting(true)

    // Simulated submission in memory (or persist if backend is present)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Log for verification
      // console.log('RADAR subscription created:', { nome, email, whatsapp, channelEmail, channelWhatsapp })
    }, 250)
  }

  const handleSavePasso2 = () => {
    // Save optional preferences
    setStep2Finished('Pronto! Seu RADAR vai ficar ainda mais relevante para você.')
    // console.log('RADAR preferences updated:', { perfil, faixaEtaria, temas })
  }

  const handleSkipPasso2 = () => {
    setStep2Finished('Tudo certo! Suas preferências ficam para depois.')
  }

  return (
    <section id="cadastro" className="scroll-mt-24 py-16 sm:py-24">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E2E5DF] rounded-2xl p-6 sm:p-10 shadow-none">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17221C] tracking-tight">
              Entre no RADAR.
            </h2>
            <p className="text-[#687169] text-base sm:text-lg mt-1 font-normal">
              Receba gratuitamente a próxima edição.
            </p>
          </div>

          {!isSubmitted ? (
            /* PASSO 1 FORM */
            <form onSubmit={handleSubmitPasso1} noValidate className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E5DF]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#687169]">
                  PASSO 1
                </span>
                <span className="text-xs text-[#687169] font-medium">1 de 2</span>
              </div>

              {/* Campo Nome */}
              <div>
                <label
                  htmlFor={nameInputId}
                  className="block text-sm font-bold text-[#17221C] mb-2"
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
                  className={`w-full px-4 py-3 bg-[#FAFAF7] border rounded-[10px] text-[#17221C] placeholder:text-[#687169]/60 text-[0.9375rem] transition-colors focus:outline-none focus:bg-white focus:border-[#245C45] focus:ring-2 focus:ring-[#245C45]/20 ${
                    errors.nome ? 'border-[#B85C3C]' : 'border-[#E2E5DF]'
                  }`}
                />
                {errors.nome && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.nome}</p>
                )}
              </div>

              {/* Pergunta Canais */}
              <div>
                <span className="block text-sm font-bold text-[#17221C] mb-2">
                  Como você quer receber?
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {/* Option E-mail */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !channelEmail
                      setChannelEmail(next)
                      if (next) setConsentEmail(true)
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-[10px] border text-sm font-medium transition-colors ${
                      channelEmail
                        ? 'bg-[#245C45] text-white border-[#245C45]'
                        : 'bg-[#FAFAF7] text-[#17221C] border-[#E2E5DF] hover:border-[#687169]'
                    }`}
                  >
                    <span>E-mail</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        channelEmail ? 'bg-white text-[#245C45]' : 'border border-[#687169]/50'
                      }`}
                    >
                      {channelEmail && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Option WhatsApp */}
                  <button
                    type="button"
                    onClick={() => {
                      const next = !channelWhatsapp
                      setChannelWhatsapp(next)
                      if (next) setConsentWhatsapp(true)
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-[10px] border text-sm font-medium transition-colors ${
                      channelWhatsapp
                        ? 'bg-[#245C45] text-white border-[#245C45]'
                        : 'bg-[#FAFAF7] text-[#17221C] border-[#E2E5DF] hover:border-[#687169]'
                    }`}
                  >
                    <span>WhatsApp</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        channelWhatsapp ? 'bg-white text-[#245C45]' : 'border border-[#687169]/50'
                      }`}
                    >
                      {channelWhatsapp && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                </div>
                {errors.canais && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.canais}</p>
                )}
              </div>

              {/* Conditional Email Field */}
              {channelEmail && (
                <div className="space-y-2 pt-1">
                  <label htmlFor={emailInputId} className="block text-sm font-bold text-[#17221C]">
                    E-mail
                  </label>
                  <input
                    id={emailInputId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-[#FAFAF7] border rounded-[10px] text-[#17221C] placeholder:text-[#687169]/60 text-[0.9375rem] transition-colors focus:outline-none focus:bg-white focus:border-[#245C45] focus:ring-2 focus:ring-[#245C45]/20 ${
                      errors.email ? 'border-[#B85C3C]' : 'border-[#E2E5DF]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-[#B85C3C] font-medium">{errors.email}</p>
                  )}

                  {/* Consent for E-mail */}
                  <label
                    htmlFor={consentEmailId}
                    className="flex items-start gap-2.5 pt-1 cursor-pointer select-none"
                  >
                    <input
                      id={consentEmailId}
                      type="checkbox"
                      checked={consentEmail}
                      onChange={(e) => setConsentEmail(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#E2E5DF] text-[#245C45] accent-[#245C45] focus:ring-[#245C45]"
                    />
                    <span className="text-xs text-[#687169] leading-tight">
                      Quero receber a newsletter por e-mail.
                    </span>
                  </label>
                  {errors.consentEmail && (
                    <p className="text-xs text-[#B85C3C] font-medium">{errors.consentEmail}</p>
                  )}
                </div>
              )}

              {/* Conditional WhatsApp Field */}
              {channelWhatsapp && (
                <div className="space-y-2 pt-1">
                  <label htmlFor={phoneInputId} className="block text-sm font-bold text-[#17221C]">
                    WhatsApp
                  </label>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3.5 py-3 rounded-l-[10px] border border-r-0 border-[#E2E5DF] bg-[#FAFAF7] text-[#687169] text-sm font-medium">
                      +55
                    </span>
                    <input
                      id={phoneInputId}
                      type="tel"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 98765-4321"
                      autoComplete="tel-national"
                      className={`w-full px-4 py-3 bg-[#FAFAF7] border rounded-r-[10px] text-[#17221C] placeholder:text-[#687169]/60 text-[0.9375rem] transition-colors focus:outline-none focus:bg-white focus:border-[#245C45] focus:ring-2 focus:ring-[#245C45]/20 ${
                        errors.whatsapp ? 'border-[#B85C3C]' : 'border-[#E2E5DF]'
                      }`}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-xs text-[#B85C3C] font-medium">{errors.whatsapp}</p>
                  )}

                  {/* Consent for WhatsApp */}
                  <label
                    htmlFor={consentWhatsappId}
                    className="flex items-start gap-2.5 pt-1 cursor-pointer select-none"
                  >
                    <input
                      id={consentWhatsappId}
                      type="checkbox"
                      checked={consentWhatsapp}
                      onChange={(e) => setConsentWhatsapp(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#E2E5DF] text-[#245C45] accent-[#245C45] focus:ring-[#245C45]"
                    />
                    <span className="text-xs text-[#687169] leading-tight">
                      Quero receber a newsletter por WhatsApp.
                    </span>
                  </label>
                  {errors.consentWhatsapp && (
                    <p className="text-xs text-[#B85C3C] font-medium">{errors.consentWhatsapp}</p>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#245C45] hover:bg-[#1D4A38] active:scale-[0.99] text-white font-bold text-sm uppercase tracking-wider py-3.5 px-6 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245C45] focus-visible:ring-offset-2 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'ENVIANDO...' : 'ENTRAR NO RADAR →'}</span>
              </button>
            </form>
          ) : (
            /* SUCCESS STATE + PASSO 2 OPCIONAL */
            <div className="space-y-8">
              {/* Success Badge & Message */}
              <div className="p-6 bg-[#FAFAF7] border border-[#E2E5DF] rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#245C45] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#245C45]">Você está no RADAR.</h3>
                </div>
                <p className="text-[#687169] text-sm sm:text-base pl-10">
                  A próxima edição chega pelo canal que você escolheu.
                </p>
              </div>

              {/* Step 2 (Optional) */}
              {step2Finished === null ? (
                <div className="pt-2 space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E5DF]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#687169]">
                      PASSO 2 (opcional)
                    </span>
                    <span className="text-xs text-[#687169] font-medium">2 de 2</span>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#17221C] mb-4">
                      Quer deixar seu RADAR mais relevante para você?
                    </h4>

                    {/* Você é: */}
                    <div className="space-y-2 mb-5">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#687169]">
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
                                  ? 'bg-[#245C45] text-white border-[#245C45]'
                                  : 'bg-[#FAFAF7] text-[#17221C] border-[#E2E5DF] hover:border-[#687169]'
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
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#687169]">
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
                                  ? 'bg-[#245C45] text-white border-[#245C45]'
                                  : 'bg-[#FAFAF7] text-[#17221C] border-[#E2E5DF] hover:border-[#687169]'
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
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#687169]">
                        Temas que mais interessam:
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
                                  ? 'bg-[#245C45] text-white border-[#245C45]'
                                  : 'bg-[#FAFAF7] text-[#17221C] border-[#E2E5DF] hover:border-[#687169]'
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#245C45] hover:bg-[#1D4A38] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-6 rounded-full transition-colors"
                      >
                        <span>PERSONALIZAR MEU RADAR</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleSkipPasso2}
                        className="w-full sm:w-auto text-center text-sm font-medium text-[#687169] hover:text-[#245C45] py-2 px-4 transition-colors"
                      >
                        Agora não
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#FAFAF7] border border-[#E2E5DF] text-sm text-[#245C45] font-medium">
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
