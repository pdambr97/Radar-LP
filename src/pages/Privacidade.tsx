import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { RADAR_CONSTANTS } from '@/lib/constants'

export default function Privacidade() {
  const navigate = useNavigate()

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

        {/* Header */}
        <header className="pb-8 mb-12 border-b border-[#E2E5DF]">
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#245C45] mb-3">
            POLÍTICA DE PRIVACIDADE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17221C] tracking-tight leading-tight">
            Transparência e respeito com seus dados.
          </h1>
          <p className="text-sm text-[#687169] mt-3">
            Última atualização: Março de {RADAR_CONSTANTS.YEAR}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-[#687169] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#17221C]">1. Quais dados coletamos</h2>
            <p>
              Para enviar a newsletter semanal do RADAR, coletamos apenas os dados fornecidos
              voluntariamente por você no formulário:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Nome:</strong> para personalizar o contato.
              </li>
              <li>
                <strong>E-mail:</strong> caso você opte por receber a edição por e-mail.
              </li>
              <li>
                <strong>Número de WhatsApp:</strong> caso você opte por receber a edição por
                mensagem.
              </li>
              <li>
                <strong>Preferências opcionais:</strong> perfil (família, professor, etc.), faixa
                etária e temas de interesse informados no Passo 2, utilizados unicamente para
                aprimorar a relevância do conteúdo.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E2E5DF]">
            <h2 className="text-xl font-bold text-[#17221C]">2. Finalidade e uso dos dados</h2>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Envio semanal das edições do RADAR pelo canal ou canais escolhidos.</li>
              <li>Comunicações pontuais relacionadas a atualizações editoriais relevantes.</li>
            </ul>
            <p className="font-medium text-[#17221C]">
              Nunca vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de
              marketing ou publicidade.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E2E5DF]">
            <h2 className="text-xl font-bold text-[#17221C]">
              3. Consentimento separado e revogável
            </h2>
            <p>
              Os consentimentos para envio por e-mail e por WhatsApp são independentes. Você pode se
              descadastrar a qualquer momento:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Nos e-mails, através do link "Descadastrar" presente no rodapé de cada edição.
              </li>
              <li>No WhatsApp, respondendo com a palavra "SAIR" a qualquer mensagem recebida.</li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E2E5DF]">
            <h2 className="text-xl font-bold text-[#17221C]">4. Dúvidas e contato</h2>
            <p>
              Se você tiver qualquer dúvida sobre o tratamento dos seus dados ou quiser solicitar a
              exclusão de suas informações de nossa base, envie um e-mail para{' '}
              <a
                href={`mailto:${RADAR_CONSTANTS.CONTACT_EMAIL}`}
                className="font-bold text-[#245C45] underline hover:text-[#1D4A38]"
              >
                {RADAR_CONSTANTS.CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
