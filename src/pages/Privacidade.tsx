import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { RADAR_CONSTANTS } from '@/lib/constants'

export default function Privacidade() {
  const navigate = useNavigate()

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

        {/* Header */}
        <header className="pb-8 mb-12 border-b border-[#E7E5DC]">
          <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#7C74AC] mb-3">
            POLÍTICA DE PRIVACIDADE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#113D30] tracking-tight leading-tight">
            Transparência e respeito com seus dados.
          </h1>
          <p className="text-sm text-[#5C6E67] mt-3">
            Última atualização: Março de {RADAR_CONSTANTS.YEAR}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-[#5C6E67] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#113D30]">1. Quais dados coletamos</h2>
            <p>
              Para enviar a newsletter semanal do Radar, coletamos apenas os dados fornecidos
              voluntariamente por você no formulário:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-[#113D30]">Nome:</strong> para personalizar o contato.
              </li>
              <li>
                <strong className="text-[#113D30]">E-mail:</strong> caso você opte por receber a
                edição por e-mail.
              </li>
              <li>
                <strong className="text-[#113D30]">Número de WhatsApp:</strong> caso você opte por
                receber a edição por mensagem.
              </li>
              <li>
                <strong className="text-[#113D30]">Preferências opcionais:</strong> perfil (família,
                professor, etc.), faixa etária e categorias de interesse informadas no Passo 2,
                utilizadas unicamente para aprimorar a relevância do conteúdo.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E7E5DC]">
            <h2 className="text-xl font-bold text-[#113D30]">2. Finalidade e uso dos dados</h2>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Envio semanal das edições do Radar pelo canal ou canais escolhidos.</li>
              <li>Comunicações pontuais relacionadas a atualizações editoriais relevantes.</li>
            </ul>
            <p className="font-semibold text-[#113D30]">
              Nunca vendemos, alugamos ou compartilhamos seus dados com terceiros para fins de
              marketing ou publicidade.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E7E5DC]">
            <h2 className="text-xl font-bold text-[#113D30]">
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

          <section className="space-y-3 pt-4 border-t border-[#E7E5DC]">
            <h2 className="text-xl font-bold text-[#113D30]">4. Dúvidas e contato</h2>
            <p>
              Se você tiver qualquer dúvida sobre o tratamento dos seus dados ou quiser solicitar a
              exclusão de suas informações de nossa base, envie um e-mail para{' '}
              <a
                href={`mailto:${RADAR_CONSTANTS.CONTACT_EMAIL}`}
                className="font-bold text-[#113D30] underline hover:text-[#7C74AC]"
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
