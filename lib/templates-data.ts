// Template data extracted from CSV
export interface Template {
  template_key: string
  descripcion: string
}

export const TEMPLATES: Template[] = [
  {
    template_key: "ESTUDIAR EN ESPAÑA",
    descripcion: "Información para INICIAR una Estancia por Estudios (FP/Grado/Máster/curso oficial).",
  },
  {
    template_key: "DESPUÉS DE ESTUDIOS",
    descripcion: "Opciones QUÉ HACER al finalizar estudios (modificación a trabajo, búsqueda de empleo, etc.).",
  },
  {
    template_key: "MODIFICAR DE ESTUDIOS A CUENTA AJENA",
    descripcion: "MODIFICAR estancia de estudios a residencia y trabajo por CUENTA AJENA (con OFERTA/CONTRATO).",
  },
  {
    template_key: "MODIFICAR DE ESTUDIOS A CUENTA PROPIA",
    descripcion: "MODIFICAR estancia de estudios a residencia y trabajo por CUENTA PROPIA (emprender).",
  },
  {
    template_key: "MODIFICACIÓN DE FAMILIARES DE ESTUDIANTE",
    descripcion: "Familiares con autorización de Familiar de Estudiante que quieren modificar a residencia.",
  },
  {
    template_key: "ERROR EN LA RESOLUCIÓN DE ESTUDIANTES",
    descripcion: "Resolución/tarjeta de Estancia de Estudios que NIEGA o limita indebidamente derechos.",
  },
  {
    template_key: "RENOVACIÓN DE ESTUDIOS",
    descripcion: "Titulares de Estancia de Estudios cuya tarjeta va a CADUCAR y quieren RENOVAR.",
  },
  {
    template_key: "PEDIDO PAGO",
    descripcion: "Cliente YA decidió tramitar con nosotros y pide cómo PAGAR para iniciar.",
  },
  {
    template_key: "CLIENES",
    descripcion: "CLIENTES que ya pagaron el anticipo/50% y deben ser derivados al correo de clientes.",
  },
  { template_key: "AGENDAR CITA", descripcion: "Solicitan AGENDAR una consulta/cita informativa." },
  { template_key: "CITA AGENDADA", descripcion: "Ya se ofreció/definió día y hora de cita." },
  { template_key: "HOMOLOGACIÓN", descripcion: "Consultas sobre homologación de títulos/estudios." },
  {
    template_key: "GESTOR DE CONFIANZA",
    descripcion: "Consultas sobre ALTA de autónomo, impuestos, contabilidad u otros temas tributarios.",
  },
  {
    template_key: "ASILO",
    descripcion: "Personas con solicitud de Protección Internacional/Asilo que piden orientación práctica.",
  },
  {
    template_key: "EMIGRAR SIN PASAPORTE EUROPEO",
    descripcion: "Vías para VIVIR en España sin ciudadanía UE/EEE (panorama general de opciones).",
  },
  {
    template_key: "RESIDENCIA PARA INVERSORES",
    descripcion: "Visado/residencia para inversores (antigua 'Golden Visa') - fue suprimido.",
  },
  {
    template_key: "RESIDENCIA PARA PROFESIONAL ALTAMENTE CUALIFICADO",
    descripcion: "Ofertas de empleo cualificado en España (perfil directivo/técnico, PAC).",
  },
  {
    template_key: "HIJO DE ESPAÑOL DE ORIGEN",
    descripcion: "Hijos/as de español de origen que desean residencia por arraigo familiar.",
  },
  {
    template_key: "ESTAR A CARGO",
    descripcion: "Familiares ascendientes/descendientes que buscan residencia por estar 'a cargo'.",
  },
  {
    template_key: "REAGRUPACIÓN FAMILIAR",
    descripcion: "Residentes legales no comunitarios que desean reagrupar a su familia.",
  },
  {
    template_key: "NÓMADA DIGITAL",
    descripcion: "Trabajan en remoto para empresas/clientes fuera de España (VISADO/RESIDENCIA).",
  },
  {
    template_key: "CUENTA BREVEMENTE",
    descripcion: "Se pide al remitente un RESUMEN breve de su situación para orientar el caso.",
  },
  {
    template_key: "EMPRENDER EN ESPAÑA",
    descripcion: "Desean residir emprendiendo (cuenta propia/ley de emprendedores).",
  },
  {
    template_key: "FORMAS DE REGULARIZARSE",
    descripcion: "Personas ya en España que preguntan cómo REGULARIZARSE con el Reglamento vigente.",
  },
  {
    template_key: "ARRAIGO SOCIOLABORAL",
    descripcion: "Acreditan permanencia y relación laboral conforme al nuevo Reglamento.",
  },
  {
    template_key: "ARRAIGO FAMILIAR",
    descripcion:
      "Vínculo familiar cualificado (progenitor de menor español, cónyuge/pareja de español, hijo de español de origen).",
  },
  {
    template_key: "ARRAIGO SOCIAL",
    descripcion: "Personas con tiempo de permanencia y contrato/oferta o medios propios, con informe de integración.",
  },
  {
    template_key: "ARRAIGO SOCIOFORMATIVO",
    descripcion: "Jóvenes que acreditan permanencia y se comprometen a formación reglada.",
  },
  {
    template_key: "ARRAIGO DE SEGUNDA OPORTUNIDAD",
    descripcion: "Han perdido su residencia por causas objetivas y buscan recuperar autorización.",
  },
  {
    template_key: "NACIONALIDAD 2024",
    descripcion: "Consultas sobre nacionalidad por residencia con marco informativo actualizado.",
  },
  {
    template_key: "REMITIR A JULIA",
    descripcion: "Derivación interna para consultas que deben ser tratadas por Julia.",
  },
  {
    template_key: "NACIONALIDAD POR MATRIMONIO",
    descripcion: "Cónyuge/pareja de ciudadano/a español/a que pide nacionalidad por residencia REDUCIDA.",
  },
  {
    template_key: "NACIONALIDAD POR APELLIDOS",
    descripcion: "Vía de nacionalidad vinculada a apellidos (sólo cuando exista base legal vigente).",
  },
  {
    template_key: "RECURSO CONTENCIOSO",
    descripcion: "Expediente de nacionalidad EXCESIVAMENTE demorado o denegado (recurso contencioso-administrativo).",
  },
  {
    template_key: "RESIDIR MIENTRAS ESPERAMOS LMD",
    descripcion: "Descendientes TRAMITANDO o a la espera de resolución por LMD que preguntan cómo RESIDIR.",
  },
  {
    template_key: "BÚSQUEDA DE ACTAS",
    descripcion: "Necesitan ayuda para localizar actas/partidas en España o exterior para LMD/nacionalidad.",
  },
  {
    template_key: "LEY DE MEMORIA DEMOCRÁTICA (LMD)",
    descripcion: "Nietos/bisnietos de españoles u otros supuestos de LMD (requisitos y documentación).",
  },
  {
    template_key: "PRIMER PAGO NACIONALIDAD (UN EXPEDIENTE)",
    descripcion: "Clientes que contratan la presentación de UN expediente de nacionalidad.",
  },
  {
    template_key: "PRIMER PAGO NACIONALIDAD (VARIOS EXPEDIENTES)",
    descripcion: "Clientes que contratan VARIOS expedientes de nacionalidad.",
  },
  {
    template_key: "FAMILIARES DE CIUDADANOS CON NACIONALIDAD ESPAÑOLA",
    descripcion: "Familiares de ciudadano/a ESPAÑOL/A que buscan residencia.",
  },
  {
    template_key: "RESIDENCIA INDEPENDIENTE",
    descripcion: "Titulares de tarjeta como familiar de ciudadano de la UE que buscan RESIDENCIA INDEPENDIENTE.",
  },
  {
    template_key: "PUEDO TRABAJAR CON LA RESIDENCIA EN TRÁMITE",
    descripcion: "Consultas sobre si se puede TRABAJAR con la renovación/modificación en TRÁMITE.",
  },
  {
    template_key: "AUTORIZACIONES COMO TURISTA",
    descripcion: "Personas que están/entrarán como TURISTAS y preguntan qué autorizaciones pueden solicitar.",
  },
  {
    template_key: "ENTRAR COMO TURISTA",
    descripcion: "Requisitos para ENTRAR como turista (visado/ETIAS, medios, seguro, plazos).",
  },
  {
    template_key: "CUE 2025",
    descripcion: "Ciudadanos de la UE/EEE que necesitan el Certificado de Registro (CUE) en 2025.",
  },
  {
    template_key: "FAMILIAR UE 2025",
    descripcion: "FAMILIARES de ciudadano de la UE (no español) o español en régimen UE, con normativa 2025.",
  },
  {
    template_key: "PAREJA DE HECHO",
    descripcion: "Constitución/reconocimiento de pareja de hecho en España para fines migratorios.",
  },
  {
    template_key: "TRABAJAR CON RESIDENCIA DE FAMILIAR DE CIUDADANO DE LA UE EN TRÁMITE",
    descripcion: "Familiares de ciudadano UE/ESPAÑOL con TARJETA en TRÁMITE que preguntan si pueden TRABAJAR.",
  },
]

export type CategoriaId =
  | "ESTUDIOS"
  | "FAMILIAR_Y_UE"
  | "ARRAIGO_Y_ESPECIALES"
  | "TRABAJO_CUALIFICADO"
  | "NACIONALIDAD_Y_DOC"
  | "ADMIN_Y_GENERAL"

export interface Categoria {
  id: CategoriaId
  titulo: string
  descripcion: string
  templates: string[]
}

export const CATEGORIAS_GENERALES: Categoria[] = [
  {
    id: "ESTUDIOS",
    titulo: "I. Estudios en España",
    descripcion: "Trámites de Estancia/Residencia por Estudios (iniciar, renovar, modificar)",
    templates: [
      "ESTUDIAR EN ESPAÑA",
      "DESPUÉS DE ESTUDIOS",
      "MODIFICAR DE ESTUDIOS A CUENTA AJENA",
      "MODIFICAR DE ESTUDIOS A CUENTA PROPIA",
      "MODIFICACIÓN DE FAMILIARES DE ESTUDIANTE",
      "ERROR EN LA RESOLUCIÓN DE ESTUDIANTES",
      "RENOVACIÓN DE ESTUDIOS",
    ],
  },
  {
    id: "FAMILIAR_Y_UE",
    titulo: "II. Familiar y Régimen UE",
    descripcion: "Residencia por Vínculo Familiar (Comunitario, Reagrupación, ruptura)",
    templates: [
      "HIJO DE ESPAÑOL DE ORIGEN",
      "ESTAR A CARGO",
      "REAGRUPACIÓN FAMILIAR",
      "FAMILIARES DE CIUDADANOS CON NACIONALIDAD ESPAÑOLA",
      "RESIDENCIA INDEPENDIENTE",
      "CUE 2025",
      "FAMILIAR UE 2025",
      "PAREJA DE HECHO",
      "TRABAJAR CON RESIDENCIA DE FAMILIAR DE CIUDADANO DE LA UE EN TRÁMITE",
      "PUEDO TRABAJAR CON LA RESIDENCIA EN TRÁMITE",
    ],
  },
  {
    id: "ARRAIGO_Y_ESPECIALES",
    titulo: "III. Arraigo y Circunstancias Excepcionales",
    descripcion: "Residencia por Arraigo (Social, Familiar, Formación) y Circunstancias Excepcionales",
    templates: [
      "FORMAS DE REGULARIZARSE",
      "ARRAIGO SOCIOLABORAL",
      "ARRAIGO FAMILIAR",
      "ARRAIGO SOCIAL",
      "ARRAIGO SOCIOFORMATIVO",
      "ARRAIGO DE SEGUNDA OPORTUNIDAD",
      "ASILO",
    ],
  },
  {
    id: "TRABAJO_CUALIFICADO",
    titulo: "IV. Trabajo Cualificado y Emprendimiento",
    descripcion: "Nómadas Digitales, Profesionales Altamente Cualificados, Emprendedores y visados de trabajo",
    templates: [
      "NÓMADA DIGITAL",
      "RESIDENCIA PARA PROFESIONAL ALTAMENTE CUALIFICADO",
      "EMPRENDER EN ESPAÑA",
      "RESIDENCIA PARA INVERSORES",
      "EMIGRAR SIN PASAPORTE EUROPEO",
      "AUTORIZACIONES COMO TURISTA",
      "ENTRAR COMO TURISTA",
    ],
  },
  {
    id: "NACIONALIDAD_Y_DOC",
    titulo: "V. Nacionalidad y Documentación",
    descripcion: "Nacionalidad Española (por Residencia, LMD) y búsqueda de documentos",
    templates: [
      "NACIONALIDAD 2024",
      "NACIONALIDAD POR MATRIMONIO",
      "NACIONALIDAD POR APELLIDOS",
      "RECURSO CONTENCIOSO",
      "RESIDIR MIENTRAS ESPERAMOS LMD",
      "BÚSQUEDA DE ACTAS",
      "LEY DE MEMORIA DEMOCRÁTICA (LMD)",
      "PRIMER PAGO NACIONALIDAD (UN EXPEDIENTE)",
      "PRIMER PAGO NACIONALIDAD (VARIOS EXPEDIENTES)",
      "REMITIR A JULIA",
    ],
  },
  {
    id: "ADMIN_Y_GENERAL",
    titulo: "VI. Administración y Consultas Generales",
    descripcion: "Citas, Pagos, Duda Rápida, Asuntos internos/clientes existentes",
    templates: [
      "PEDIDO PAGO",
      "CLIENES",
      "AGENDAR CITA",
      "CITA AGENDADA",
      "HOMOLOGACIÓN",
      "GESTOR DE CONFIANZA",
      "CUENTA BREVEMENTE",
    ],
  },
]

// Helper function to get templates by category
export function getTemplatesByCategory(categoryId: CategoriaId): Template[] {
  const categoria = CATEGORIAS_GENERALES.find((c) => c.id === categoryId)
  if (!categoria) return []

  return categoria.templates.map((templateKey) => {
    const template = TEMPLATES.find((t) => t.template_key === templateKey)
    return template || { template_key: templateKey, descripcion: "" }
  })
}
