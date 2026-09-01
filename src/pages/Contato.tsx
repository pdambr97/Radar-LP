import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Mail } from 'lucide-react'
import { RADAR_CONSTANTS } from '@/lib/constants'

export default function Contato() {
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!nome.trim()) errs.nome = 'Informe seu nome.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Informe um e-mail válido.'
    }
    if (!mensagem.trim() || mensagem.trim().length < 5) {
      errs.mensagem = 'Escreva uma mensagem.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setEnviado(true)
  }

  return (
    <div className="w-full bg-[#FBFAF6] py-12 sm:py-20">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Header */}
        <header className="pb-8 mb-10 border-b border-[#E7E5DC]">
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC] mb-3">
            FALE COM O RADAR
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#113D30] tracking-tight leading-tight">
            Contato
          </h1>
          <p className="text-base sm:text-lg text-[#5C6E67] mt-3 leading-relaxed">
            Dúvidas, sugestões de pautas ou parcerias? Adoramos conversar.
          </p>
        </header>

        {/* Direct Email Card */}
        <div className="mb-10 p-5 sm:p-6 bg-white border border-[#E7E5DC] rounded-xl flex items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#9388BF]/20 text-[#113D30] flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#7C74AC]" />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#5C6E67]">
              E-mail direto
            </span>
            <a
              href={`mailto:${RADAR_CONSTANTS.CONTACT_EMAIL}`}
              className="text-base sm:text-lg font-bold text-[#113D30] hover:text-[#7C74AC] transition-colors"
            >
              {RADAR_CONSTANTS.CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[#E7E5DC] rounded-2xl p-6 sm:p-10 shadow-sm">
          {!enviado ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#113D30] mb-2">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className={`w-full px-4 py-3 bg-[#FBFAF6] border rounded-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-sm focus:outline-none focus:bg-white focus:border-[#113D30] focus:ring-2 focus:ring-[#113D30]/20 ${
                    errors.nome ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'
                  }`}
                />
                {errors.nome && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.nome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#113D30] mb-2">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className={`w-full px-4 py-3 bg-[#FBFAF6] border rounded-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-sm focus:outline-none focus:bg-white focus:border-[#113D30] focus:ring-2 focus:ring-[#113D30]/20 ${
                    errors.email ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#113D30] mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Como podemos te ajudar?"
                  className={`w-full px-4 py-3 bg-[#FBFAF6] border rounded-[10px] text-[#113D30] placeholder:text-[#5C6E67]/60 text-sm focus:outline-none focus:bg-white focus:border-[#113D30] focus:ring-2 focus:ring-[#113D30]/20 ${
                    errors.mensagem ? 'border-[#B85C3C]' : 'border-[#E7E5DC]'
                  }`}
                />
                {errors.mensagem && (
                  <p className="mt-1.5 text-xs text-[#B85C3C] font-medium">{errors.mensagem}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-[#113D30] hover:bg-[#0C2D23] text-[#FBFAF6] font-bold text-sm tracking-wide py-3.5 px-6 rounded-full transition-colors"
              >
                Enviar mensagem →
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#113D30] text-[#FBFAF6] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#113D30]">
                Mensagem enviada com sucesso!
              </h3>
              <p className="text-[#5C6E67] text-sm">
                Obrigado pelo contato. Responderemos o mais breve possível.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
