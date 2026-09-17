async function subscribe(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nome, email, whatsapp, voce_e, faixa_etaria, temas_interesse } = req.body ?? {}

  if (!nome || (!email && !whatsapp)) {
    return res
      .status(400)
      .json({ error: 'Informe nome e ao menos um contato (email ou whatsapp).' })
  }

  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    LEADLOVERS_WEBHOOK_URL_EMAIL,
    LEADLOVERS_WEBHOOK_URL_WHATSAPP,
    LEADLOVERS_MACHINE_CODE_EMAIL,
    LEADLOVERS_MACHINE_CODE_WHATSAPP,
    LEADLOVERS_SEQUENCE_LEVEL_CODE_EMAIL,
    LEADLOVERS_SEQUENCE_LEVEL_CODE_WHATSAPP,
    LEADLOVERS_EMAIL_SEQUENCE_CODE,
  } = process.env

  const result = { supabase: null, leadlovers: { email: null, whatsapp: null } }

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ nome, email, whatsapp, voce_e, faixa_etaria, temas_interesse }),
      })

      if (!supabaseRes.ok) {
        result.supabase = { ok: false, status: supabaseRes.status, body: await supabaseRes.text() }
      } else {
        result.supabase = { ok: true }
      }
    } catch (err) {
      result.supabase = { ok: false, error: err.message }
    }
  } else {
    result.supabase = { ok: false, error: 'SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados.' }
  }

  const callLeadLoversWebhook = async (url, machineCode, sequenceLevelCode, emailSequenceCode) => {
    if (!url) {
      return { ok: false, error: 'URL do webhook não configurada.' }
    }

    if (!machineCode) {
      return { ok: false, error: 'Código da Máquina (MachineCode) não configurado.' }
    }

    try {
      const webhookRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone: whatsapp,
          MachineCode: Number(machineCode),
          SequenceLevelCode: Number(sequenceLevelCode) || 1,
          ...(emailSequenceCode ? { EmailSequenceCode: Number(emailSequenceCode) } : {}),
        }),
      })

      if (!webhookRes.ok) {
        return { ok: false, status: webhookRes.status, body: await webhookRes.text() }
      }

      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    }
  }

  const [emailResult, whatsappResult] = await Promise.all([
    callLeadLoversWebhook(
      LEADLOVERS_WEBHOOK_URL_EMAIL,
      LEADLOVERS_MACHINE_CODE_EMAIL,
      LEADLOVERS_SEQUENCE_LEVEL_CODE_EMAIL,
      LEADLOVERS_EMAIL_SEQUENCE_CODE,
    ),
    callLeadLoversWebhook(
      LEADLOVERS_WEBHOOK_URL_WHATSAPP,
      LEADLOVERS_MACHINE_CODE_WHATSAPP,
      LEADLOVERS_SEQUENCE_LEVEL_CODE_WHATSAPP,
    ),
  ])

  result.leadlovers = { email: emailResult, whatsapp: whatsappResult }

  const leadloversOk = emailResult.ok || whatsappResult.ok

  return res.status(leadloversOk ? 200 : 502).json(result)
}

export default async function handler(req, res) {
  try {
    return await subscribe(req, res)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
