import { useState, useEffect } from "react";

const T = {
  negro: "#080808", superficie: "#0f0f0f", borde: "#1c1c1c",
  oro: "#c9a84c", oroSuave: "rgba(201,168,76,0.08)", oroMedio: "rgba(201,168,76,0.15)",
  hueso: "#ede9e0", gris1: "#888", gris2: "#444", gris3: "#222",
  bajo: "#8b4a4a", medio: "#8b7a3a", alto: "#3d7a56", rojo: "#8b3a3a",
};

// ── DIMENSIONES ──────────────────────────────────────────────────────────────
const DIMENSIONES = [
  {
    id: "CN", nombre: "Coherencia Narrativa",
    concepto: "La coherencia narrativa no mide si tu historia es verdadera. Mide si es tuya. Una persona que construye narrativas distintas según el interlocutor no miente necesariamente: opera desde un yo que todavía no tiene centro de gravedad propio. El MCD trabaja en este eje para identificar cuándo las decisiones provienen de valores reales y cuándo provienen del personaje que el contexto exige.",
    autores: "McAdams (1993) · Ricoeur — Identidad narrativa · Senge — Modelos mentales",
    preguntas: [
      {
        texto: "Describiste una decisión importante de manera diferente ante tu jefe, tu pareja y vos mismo a solas. ¿Cuál de las tres versiones considerás más verdadera?",
        friccion: "Esta pregunta no tiene respuesta neutra. Si las tres son iguales, probablemente no estás siendo honesto. Si son radicalmente distintas, hay algo que todavía no pudiste integrar.",
        opciones: [
          "La que le conté a mi jefe — es la versión que sostengo públicamente",
          "La que le conté a mi pareja — ahí bajo la guardia",
          "La que me digo a mí mismo a solas — pero rara vez la digo en voz alta",
          "No existe una versión más verdadera — todas son parciales y lo sé",
        ],
        valores: [15, 40, 70, 100],
      },
      {
        texto: "Cuando fallás en algo que considerás importante, ¿qué historia te contás primero?",
        friccion: "La narrativa de la falla revela más sobre el nivel de autoconciencia que la falla en sí misma.",
        opciones: [
          "Busco la causa externa — algo o alguien lo impidió",
          "Me critico duramente pero sin analizar qué pasó",
          "Identifico qué hice y qué no hice, aunque duela",
          "Lo analizo con la misma distancia que analizaría la falla de otro",
        ],
        valores: [0, 25, 70, 100],
      },
      {
        texto: "¿Hay alguna versión de vos mismo que mostrás en público y que en privado considerás falsa o exagerada?",
        friccion: "No se trata de hipocresía. Se trata de cuánta energía consume sostener una imagen que no coincide con la experiencia interna.",
        opciones: [
          "No, soy bastante consistente",
          "Sí, pero la considero una versión legítima — todos nos adaptamos",
          "Sí, y a veces me incomoda el costo de sostenerla",
          "Sí, y es una de las cosas que más quiero cambiar",
        ],
        valores: [60, 40, 75, 100],
      },
    ],
  },
  {
    id: "LR", nombre: "Latencia Reflexiva",
    concepto: "Viktor Frankl identificó el espacio entre el estímulo y la respuesta como el territorio donde reside la libertad humana. La latencia reflexiva no es lentitud: es la capacidad de no ser arrastrado por el primer impulso. Bajo presión, este espacio se contrae hasta desaparecer. El MCD mide qué tan pequeño se vuelve ese espacio cuando algo realmente importa.",
    autores: "Frankl (1946) · Kahneman — Sistema 1 y 2 (2011) · Damasio — Marcadores somáticos (1994)",
    preguntas: [
      {
        texto: "Alguien en quien confiabas tomó una decisión que te afectó sin consultarte. ¿Cuál fue tu primera respuesta interna?",
        friccion: "La respuesta a la traición percibida es uno de los indicadores más honestos del nivel de latencia real, porque activa los sistemas más primitivos del procesamiento emocional.",
        opciones: [
          "Enojo inmediato que tardó en bajar",
          "Distancia — me cerré sin decir nada",
          "Intenté entender antes de reaccionar, aunque costó",
          "Pude separar el hecho de la interpretación desde el principio",
        ],
        valores: [0, 20, 65, 100],
      },
      {
        texto: "¿Podés identificar una situación reciente donde sabías que tu primera respuesta era incorrecta pero la diste igual?",
        friccion: "La conciencia del error en tiempo real sin capacidad de modificar la conducta es uno de los estados más reveladores del funcionamiento decisional.",
        opciones: [
          "No recuerdo ninguna — generalmente actúo bien",
          "Sí, pero lo justifiqué en el momento",
          "Sí, lo supe mientras pasaba y no pude evitarlo",
          "Sí, y es algo que sigo procesando",
        ],
        valores: [15, 30, 80, 100],
      },
      {
        texto: "Cuando alguien te presenta un argumento que amenaza una posición que sostenés hace tiempo, ¿qué ocurre internamente primero?",
        friccion: "La defensa de posiciones antiguas es uno de los mecanismos más sofisticados del ego: aparece disfrazada de coherencia y firmeza.",
        opciones: [
          "Busco el error en su argumento",
          "Escucho pero ya sé que no voy a cambiar de posición",
          "Siento resistencia y la observo antes de responder",
          "Lo que primero aparece es curiosidad genuina",
        ],
        valores: [0, 25, 75, 100],
      },
    ],
  },
  {
    id: "TC", nombre: "Tolerancia a la Contradicción",
    concepto: "El pensamiento binario no es una falla cognitiva: es un mecanismo de supervivencia. Reduce la carga de procesamiento en situaciones de amenaza. El problema surge cuando se aplica a situaciones que requieren sostener tensiones genuinas sin resolverlas. La tolerancia a la contradicción no significa indiferencia moral. Significa la capacidad de habitar la complejidad sin necesidad de simplificarla para sentirse seguro.",
    autores: "Kegan — Mind autoautorizante (1994) · McGilchrist — El maestro y su emisario (2009) · Tetlock — Superforecasting (2015)",
    preguntas: [
      {
        texto: "Pensá en alguien cuyas ideas políticas o filosóficas considerás fundamentalmente equivocadas. ¿Podés identificar el origen legítimo de esa posición, aunque no la compartas?",
        friccion: "No se trata de relativismo. Se trata de si el mapa que usás para entender el mundo tiene suficiente resolución como para ver la lógica interna de lo que rechazás.",
        opciones: [
          "No — si la posición es equivocada, su origen no importa",
          "Puedo entender el origen pero no lo considero legítimo",
          "Sí, y eso no cambia mi posición pero la hace más sólida",
          "Sí, y a veces eso hace más difícil sostener la mía",
        ],
        valores: [0, 30, 75, 100],
      },
      {
        texto: "¿Hay algo en vos mismo que admitís que es contradictorio y que ya dejaste de intentar resolver?",
        friccion: "Aceptar una contradicción interna sin resolverla no es resignación. Puede ser el nivel más alto de autoconocimiento: saber que algunas tensiones son constitutivas, no patológicas.",
        opciones: [
          "No — las contradicciones son problemas a resolver",
          "Sí, pero me genera incomodidad reconocerlo",
          "Sí, y aprendí a convivir con eso",
          "Sí, y esa contradicción es parte de lo que me define",
        ],
        valores: [10, 40, 75, 100],
      },
      {
        texto: "¿Podés sostener simultáneamente que una persona es valiosa y que una decisión suya fue moralmente incorrecta?",
        friccion: "La incapacidad de separar la persona del acto opera en ambas direcciones: lleva tanto a la idealización como a la demonización, y en ambos casos distorsiona la percepción de la realidad.",
        opciones: [
          "Depende — hay acciones que definen a las personas",
          "Sí, pero me cuesta cuando me afecta directamente",
          "Sí, casi siempre puedo hacer esa distinción",
          "Sí, y la considero una de las habilidades más importantes que tengo",
        ],
        valores: [20, 50, 80, 100],
      },
    ],
  },
];

// ── PREGUNTA DUAL FINAL ──────────────────────────────────────────────────────
const PREGUNTA_DUAL = {
  titulo: "La Pregunta del Espejo",
  subtitulo: "Esta pregunta no tiene respuesta correcta. Tiene respuesta honesta.",
  contexto: "Todo lo que respondiste hasta acá describe cómo procesás el mundo externo. Esta última pregunta apunta al único lugar donde el MCD no puede llegar desde afuera: la brecha entre lo que sabés que es correcto y lo que elegís hacer cuando nadie mira y el costo es real.",
  texto: "Hay algo que sabés con certeza que deberías estar haciendo — o dejando de hacer — y que no estás haciendo. No por falta de información, no por falta de recursos, sino porque elegís no hacerlo. ¿Qué tan seguido pensás en eso?",
  friccion: "Esta no es una pregunta sobre debilidad. Es una pregunta sobre la distancia entre consciencia y acción. Esa distancia es exactamente lo que el MCD intenta medir.",
  opciones: [
    { texto: "Raramente — no tengo claro que haya algo así", valor: 20, interpretacion: "La ausencia de esa tensión puede indicar alta coherencia o alta evasión. El MCD no puede distinguirlas desde afuera." },
    { texto: "A veces — lo pienso pero no lo sostengo", valor: 45, interpretacion: "La consciencia intermitente es el estado más común y el más costoso energéticamente: suficiente para generar incomodidad, insuficiente para producir cambio." },
    { texto: "Seguido — vivo con esa tensión de manera permanente", valor: 70, interpretacion: "La tensión crónica entre saber y no actuar tiene un costo acumulativo que el MCD identifica como el principal predictor de fatiga decisional." },
    { texto: "Constantemente — y esta pregunta lo acaba de poner en palabras", valor: 100, interpretacion: "Nombrar la brecha es el primer acto del cambio. No el cambio en sí, pero sí su condición de posibilidad." },
  ],
};

// ── PERFILES ─────────────────────────────────────────────────────────────────
const PERFILES = {
  bajo: {
    rango: "ICR < 50", nombre: "Zona Reactiva", color: T.bajo, icono: "◌",
    resumen: "El sistema decisional opera predominantemente desde automatismos emocionales y expectativas del entorno externo.",
    cuerpo: [
      "Las respuestas surgen antes de que exista deliberación real. Esto no es una falla: es el modo de funcionamiento por defecto de cualquier sistema bajo carga cognitiva alta. El cerebro optimiza para la velocidad cuando la energía disponible para procesar es limitada.",
      "Lo que el MCD identifica en este rango no es ausencia de valores sino desconexión entre los valores declarados y los valores operativos — los que realmente gobiernan las decisiones cuando hay fricción. Esa desconexión no es moral: es estructural.",
      "El trabajo en este rango comienza con observación, no con cambio. Hacer visible lo que opera sin ser visto es la condición de posibilidad de cualquier modificación posterior.",
    ],
    autores: "Damasio (1994) · Kahneman Sistema 1 (2011) · Kohlberg — Moral preconvencional (1969)",
    recomendaciones: [
      { titulo: "Protocolo de observación sin juicio", cuerpo: "Durante 7 días consecutivos, anotá las tres últimas reacciones fuertes de cada día. No las evalúes. No las expliques. Solo registralas con el mayor detalle posible: qué pasó, qué sentiste, qué hiciste. La observación sistemática sin juicio es el primer movimiento del MCD porque no activa los mecanismos defensivos que bloquean el aprendizaje." },
      { titulo: "La regla de los 10 minutos", cuerpo: "Antes de responder cualquier mensaje, conversación o situación que te genere una emoción intensa — enojo, miedo, urgencia — esperá 10 minutos. No para cambiar la respuesta. Para ver si cambia sola. Si cambia, eso es información sobre cuánto de tu primera respuesta era tuya y cuánto era del sistema automático." },
      { titulo: "Espejo Socrático · Nivel 1 — La arqueología de una decisión", cuerpo: "Elegí una decisión reciente que lamentás o que no entendés del todo. Respondé por escrito: ¿Qué sabía en ese momento? ¿Qué no quería saber? ¿Qué habría necesitado saber para decidir diferente? ¿Qué obtuve con esa decisión, aunque no lo haya buscado conscientemente? La última pregunta es la más importante." },
    ],
  },
  medio: {
    rango: "ICR 50–74", nombre: "Zona de Transición", color: T.medio, icono: "◑",
    resumen: "Existe consciencia del propio proceso decisional. La pausa aparece. La narrativa tiene estructura. La contradicción puede sostenerse a veces.",
    cuerpo: [
      "Este es el rango más productivo para el trabajo del MCD, y también el más incómodo: hay suficiente reflexividad para ver la brecha entre valores declarados y valores operativos, pero todavía no hay consistencia suficiente para cerrarla bajo presión.",
      "La persona en zona de transición generalmente sabe qué debería hacer. El problema no es el conocimiento. Es la distancia entre el saber y el hacer, que en este rango es visible, nombrable, y por eso más difícil de ignorar que en la zona reactiva.",
      "El desafío específico de este rango es la consistencia: la capacidad de mantener el nivel reflexivo no solo cuando hay tiempo y calma, sino exactamente cuando no los hay.",
    ],
    autores: "Kohlberg — Moral convencional/postconvencional (1969) · Kegan (1994) · Frankl (1946)",
    recomendaciones: [
      { titulo: "Mapa de valores operativos vs. declarados", cuerpo: "Listá tus cinco valores declarados — los que dirías en una entrevista o ante alguien que admirás. Luego listá tus cinco decisiones más significativas de los últimos seis meses. Analizá: ¿cuántas de las segundas son consecuencia directa de los primeros? La brecha que encontrás no es un problema moral. Es el territorio exacto donde el MCD trabaja." },
      { titulo: "El mejor argumento contra tu posición", cuerpo: "Antes de cerrar cualquier posición importante — laboral, personal, filosófica — escribí el mejor argumento posible contra tu propia conclusión. No para cambiarla. Para saber que lo que sostenés resiste ese argumento y no solo la ausencia de oposición. Una posición que no puede articular su propio contraargumento no es una posición: es una preferencia." },
      { titulo: "Espejo Socrático · Nivel 2 — La función oculta del patrón", cuerpo: "Identificá un patrón que se repite en tus relaciones o decisiones — algo que hacés o que te pasa de manera recurrente y que no querés que siga pasando. Preguntate: ¿qué obtengo con este patrón? ¿qué perdería si desapareciera? Las respuestas a estas dos preguntas revelan la función que el patrón cumple, que es siempre más compleja que la simple repetición." },
    ],
  },
  alto: {
    rango: "ICR ≥ 75", nombre: "Zona Reflexiva", color: T.alto, icono: "●",
    resumen: "La estructura de valores y la arquitectura de decisiones muestran alta alineación observable bajo condiciones de fricción.",
    cuerpo: [
      "La pausa existe de manera consistente. La contradicción puede habitarse sin necesidad de resolverla para sentirse seguro. La narrativa persiste cuando cambia el interlocutor. Estos tres indicadores en simultáneo son inusuales y tienen valor diagnóstico real.",
      "La zona reflexiva no es un estado de perfección. Es un estado donde los errores son visibles y recuperables porque existe un sistema de referencia interno que no depende de la aprobación externa para mantenerse estable.",
      "El riesgo específico de este rango es la rigidez disfrazada de coherencia: la certeza excesiva sobre el propio proceso puede volverse el punto ciego más difícil de detectar desde adentro. La alta coherencia reflexiva puede convertirse en una forma sofisticada de cierre.",
    ],
    autores: "Senge — Pensamiento sistémico (1990) · McGilchrist (2009) · Tetlock — Superforecasting (2015)",
    recomendaciones: [
      { titulo: "Auditoría de puntos ciegos de alta complejidad", cuerpo: "Las zonas ciegas en la zona reflexiva no son obvias. Generalmente se presentan como áreas donde la alta coherencia se ha vuelto predictiva en exceso: sabés cómo vas a reaccionar, sabés cómo van a reaccionar los demás, y esa certeza reduce la superficie de contacto con lo nuevo. El ejercicio: identificá las tres áreas donde más seguido tenés razón. Esas son las más sospechosas." },
      { titulo: "Transmisión consciente del proceso", cuerpo: "La enseñanza es el nivel más alto de comprensión porque fuerza la explicitación de lo que se sabe de manera tácita. ¿Quién en tu entorno se beneficiaría de ver tu proceso decisional en acción — no las conclusiones, sino el proceso? El MCD funciona también como vector de transmisión: una persona en zona reflexiva que trabaja con otras en zona de transición genera un campo de coherencia que no se puede producir por instrucción." },
      { titulo: "Espejo Socrático · Nivel 3 — El valor bajo presión máxima", cuerpo: "Elegí el valor que considerás más arraigado en vos. Construí el escenario más exigente posible en el que ese valor sería puesto a prueba — no un escenario hipotético cómodo, sino el que realmente te costaría. Describí en detalle cómo responderías. La distancia entre esa respuesta y lo que sabés que harías en la realidad es la medida más honesta de cuánto de ese valor es real y cuánto es declarado." },
    ],
  },
};

// ── UTILS ────────────────────────────────────────────────────────────────────
const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : null;
const calcDims = r => DIMENSIONES.map((_,i) => avg(r[i].filter(v=>v!==null)));
const calcICR = (r, dual) => {
  const dimVals = r.flat().filter(v=>v!==null);
  if (!dimVals.length) return null;
  const dimAvg = avg(dimVals);
  if (dual === null) return dimAvg;
  return Math.round(dimAvg * 0.75 + dual * 0.25);
};
const getPerfil = icr => {
  if (icr === null) return null;
  if (icr < 50) return PERFILES.bajo;
  if (icr < 75) return PERFILES.medio;
  return PERFILES.alto;
};
const fmtFecha = iso => new Date(iso).toLocaleDateString("es-AR",{day:"2-digit",month:"short",year:"numeric"});

// ── COMPONENTES ──────────────────────────────────────────────────────────────
const Mono = ({children,style}) => (
  <span style={{fontFamily:"monospace",fontSize:11,letterSpacing:2,...style}}>{children}</span>
);
const Divider = ({margin="32px 0"}) => <div style={{height:1,background:T.borde,margin}} />;
const Barra = ({valor,color,height=2}) => (
  <div style={{background:T.gris3,borderRadius:1,height,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${valor||0}%`,background:color||T.oro,borderRadius:1,transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)"}}/>
  </div>
);

// NAV
function Nav({vista,onNav}) {
  return (
    <div style={{borderBottom:`1px solid ${T.borde}`,padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:T.negro,zIndex:10}}>
      <button onClick={()=>onNav("inicio")} style={{background:"none",border:"none",cursor:"pointer",padding:0}}>
        <Mono style={{color:T.oro,fontSize:10}}>ALETHEIA</Mono>
        <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:2,color:T.gris2,marginLeft:12}}>MCD · v2.0</span>
      </button>
      <div style={{display:"flex",gap:4}}>
        {["inicio","historial"].map(v=>(
          <button key={v} onClick={()=>onNav(v)} style={{padding:"6px 14px",background:"transparent",border:`1px solid ${vista===v?T.borde:"transparent"}`,color:vista===v?T.hueso:T.gris2,fontFamily:"monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>
            {v==="inicio"?"Inicio":"Historial"}
          </button>
        ))}
      </div>
    </div>
  );
}

// VISTA INICIO
function Inicio({historial,onComenzar}) {
  const ultima = historial[0];
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"56px 24px"}}>
      <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:48,letterSpacing:4}}>PROYECTO ALETHEIA · ÍNDICE DE COHERENCIA REFLEXIVA</Mono>

      <div style={{marginBottom:48}}>
        <div style={{fontSize:"clamp(38px, 5vw, 52px)",fontWeight:300,lineHeight:1.05,letterSpacing:-1,marginBottom:20,fontFamily:"Georgia,serif"}}>
          Lo que sabés de vos<br/>
          y lo que <span style={{fontStyle:"italic",color:T.oro}}>elegís ignorar</span><br/>
          no es lo mismo.
        </div>
        <p style={{fontSize:16,color:T.gris1,lineHeight:1.8,maxWidth:560,fontFamily:"Georgia,serif",fontWeight:300}}>
          El ICR no evalúa inteligencia ni bondad. Evalúa la distancia entre los valores que declarás y los valores que realmente gobiernan tus decisiones cuando hay fricción real. Esa distancia tiene un nombre. El MCD lo mide.
        </p>
      </div>

      {ultima && (
        <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"28px 32px",marginBottom:32,borderRadius:2}}>
          <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:16}}>ÚLTIMA SESIÓN · {fmtFecha(ultima.fecha)}</Mono>
          <div style={{display:"flex",alignItems:"flex-end",gap:20,marginBottom:16}}>
            <div style={{fontSize:60,fontWeight:300,letterSpacing:-2,color:getPerfil(ultima.icr)?.color,lineHeight:1}}>{ultima.icr}</div>
            <div style={{paddingBottom:6}}>
              <div style={{fontSize:18,fontFamily:"Georgia,serif",fontStyle:"italic",color:T.hueso,marginBottom:4}}>{getPerfil(ultima.icr)?.nombre}</div>
              <Mono style={{color:T.gris1,fontSize:9}}>{getPerfil(ultima.icr)?.rango}</Mono>
            </div>
          </div>
          <Barra valor={ultima.icr} color={getPerfil(ultima.icr)?.color}/>
          {ultima.dims && (
            <div style={{display:"flex",gap:24,marginTop:16}}>
              {DIMENSIONES.map((d,i)=>(
                <div key={d.id}>
                  <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:4}}>{d.id}</Mono>
                  <span style={{fontSize:20,fontWeight:300,color:getPerfil(ultima.dims[i])?.color}}>{ultima.dims[i]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={onComenzar} style={{padding:"14px 40px",background:"transparent",border:`1px solid ${T.oro}`,color:T.oro,fontFamily:"monospace",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",marginBottom:56}}
        onMouseEnter={e=>{e.currentTarget.style.background=T.oroSuave}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
        {ultima?"Nueva evaluación →":"Comenzar →"}
      </button>

      <Divider/>
      <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:24,letterSpacing:4}}>ARQUITECTURA DEL INSTRUMENTO</Mono>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {DIMENSIONES.map(d=>(
          <div key={d.id} style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"20px"}}>
            <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:10}}>{d.id}</Mono>
            <div style={{fontSize:13,fontFamily:"Georgia,serif",marginBottom:8}}>{d.nombre}</div>
            <div style={{fontSize:11,color:T.gris1,lineHeight:1.5,fontStyle:"italic"}}>{d.concepto.slice(0,100)}…</div>
          </div>
        ))}
      </div>
      <div style={{background:T.superficie,border:`1px solid ${T.oro}22`,padding:"20px",borderLeft:`2px solid ${T.oro}`}}>
        <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:8}}>PREGUNTA DUAL · CIERRE</Mono>
        <div style={{fontSize:13,color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>
          "{PREGUNTA_DUAL.texto.slice(0,120)}…"
        </div>
      </div>
    </div>
  );
}

// VISTA EVALUACIÓN
function Evaluacion({onTerminar}) {
  const TOTAL_DIMS = DIMENSIONES.length;
  const TOTAL_PREGS_POR_DIM = 3;
  const TOTAL_PREGS = TOTAL_DIMS * TOTAL_PREGS_POR_DIM;

  const [fase, setFase] = useState("dim");
  const [dimIdx, setDimIdx] = useState(0);
  const [pregIdx, setPregIdx] = useState(0);
  const [respuestas, setRespuestas] = useState([[null,null,null],[null,null,null],[null,null,null]]);
  const [respDual, setRespDual] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [mostrarFriccion, setMostrarFriccion] = useState(false);
  const [dualSeleccion, setDualSeleccion] = useState(null);

  const dim = DIMENSIONES[dimIdx];
  const preg = dim?.preguntas[pregIdx];
  const progreso = fase === "dual" ? 1 : (dimIdx*3+pregIdx)/TOTAL_PREGS;
  const icrParcial = calcICR(respuestas, null);

  const seleccionar = (val) => {
    if (animando) return;
    const nv = respuestas.map(d=>[...d]);
    nv[dimIdx][pregIdx] = val;
    setRespuestas(nv);
    setMostrarFriccion(false);
    setAnimando(true);
    setTimeout(()=>{
      const ultimaDim = dimIdx===2, ultimaPreg = pregIdx===2;
      if (ultimaDim && ultimaPreg) setFase("dual");
      else if (ultimaPreg) { setDimIdx(d=>d+1); setPregIdx(0); }
      else setPregIdx(p=>p+1);
      setAnimando(false);
    },300);
  };

  const seleccionarDual = (op) => {
    setDualSeleccion(op);
    setRespDual(op.valor);
  };

  const confirmarDual = () => {
    if (!dualSeleccion) return;
    onTerminar(respuestas, dualSeleccion.valor);
  };

  const [mostrando, setMostrando] = useState("pregunta");

  useEffect(()=>{
    if (fase==="dim" && pregIdx===0) {
      setMostrando("intro");
      const t = setTimeout(()=>setMostrando("pregunta"),3200);
      return ()=>clearTimeout(t);
    }
  },[dimIdx, fase]);

  if (fase==="dual") return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:48}}>
        <Mono style={{color:T.oro,fontSize:10}}>PREGUNTA FINAL · ESPEJO</Mono>
        <Mono style={{color:T.gris2,fontSize:10}}>10 / 10</Mono>
      </div>
      <Barra valor={100} height={1}/>

      <div style={{margin:"48px 0 32px"}}>
        <div style={{fontSize:13,fontFamily:"monospace",letterSpacing:3,color:T.oro,marginBottom:8,textTransform:"uppercase"}}>{PREGUNTA_DUAL.titulo}</div>
        <div style={{fontSize:12,color:T.gris1,fontStyle:"italic",fontFamily:"Georgia,serif",marginBottom:32}}>{PREGUNTA_DUAL.subtitulo}</div>

        <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"24px 28px",marginBottom:32,borderLeft:`2px solid ${T.oro}33`}}>
          <div style={{fontSize:14,color:T.gris1,lineHeight:1.7,fontFamily:"Georgia,serif"}}>{PREGUNTA_DUAL.contexto}</div>
        </div>

        <div style={{fontSize:22,fontFamily:"Georgia,serif",fontWeight:300,lineHeight:1.6,color:T.hueso,marginBottom:40}}>
          {PREGUNTA_DUAL.texto}
        </div>

        <div style={{fontSize:12,color:T.gris2,fontStyle:"italic",fontFamily:"Georgia,serif",marginBottom:32,padding:"12px 16px",borderLeft:`1px solid ${T.gris3}`}}>
          {PREGUNTA_DUAL.friccion}
        </div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
        {PREGUNTA_DUAL.opciones.map((op,i)=>(
          <button key={i} onClick={()=>seleccionarDual(op)} style={{
            padding:"18px 24px",background:dualSeleccion?.valor===op.valor?T.oroMedio:"transparent",
            border:`1px solid ${dualSeleccion?.valor===op.valor?T.oro:T.borde}`,
            color:dualSeleccion?.valor===op.valor?T.oro:T.gris1,
            fontFamily:"Georgia,serif",fontSize:15,textAlign:"left",cursor:"pointer",borderRadius:2,transition:"all 0.15s",
          }}>
            {op.texto}
          </button>
        ))}
      </div>

      {dualSeleccion && (
        <div style={{marginBottom:32}}>
          <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"20px 24px",borderLeft:`2px solid ${T.oro}`,marginBottom:16}}>
            <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:8}}>INTERPRETACIÓN MCD</Mono>
            <div style={{fontSize:14,color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>{dualSeleccion.interpretacion}</div>
          </div>
          <button onClick={confirmarDual} style={{width:"100%",padding:"16px",background:T.oroSuave,border:`1px solid ${T.oro}`,color:T.oro,fontFamily:"monospace",fontSize:11,letterSpacing:3,textTransform:"uppercase",cursor:"pointer"}}>
            Ver resultado →
          </button>
        </div>
      )}
    </div>
  );

  if (mostrando==="intro") return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px",minHeight:"60vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:16,letterSpacing:4}}>{dim.id}</Mono>
      <div style={{fontSize:36,fontFamily:"Georgia,serif",fontWeight:300,marginBottom:24,color:T.hueso}}>{dim.nombre}</div>
      <div style={{fontSize:15,color:T.gris1,lineHeight:1.8,fontFamily:"Georgia,serif",marginBottom:28}}>{dim.concepto}</div>
      <div style={{fontSize:11,color:T.gris2,fontFamily:"monospace",fontStyle:"italic"}}>{dim.autores}</div>
    </div>
  );

  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:48}}>
        <Mono style={{color:T.oro,fontSize:10}}>ICR · {dim.id}</Mono>
        <Mono style={{color:T.gris2,fontSize:10}}>{dimIdx*3+pregIdx+1} / {TOTAL_PREGS}</Mono>
      </div>
      <Barra valor={progreso*100} height={1}/>

      <div style={{margin:"40px 0 12px"}}>
        <Mono style={{color:T.oro,fontSize:9,textTransform:"uppercase"}}>{dim.nombre}</Mono>
      </div>

      <div style={{fontSize:22,fontFamily:"Georgia,serif",fontWeight:300,lineHeight:1.55,color:T.hueso,marginBottom:16,opacity:animando?0:1,transition:"opacity 0.2s"}}>
        {preg?.texto}
      </div>

      <button onClick={()=>setMostrarFriccion(f=>!f)} style={{background:"none",border:"none",cursor:"pointer",padding:0,marginBottom:28,display:"flex",alignItems:"center",gap:8}}>
        <Mono style={{color:T.gris2,fontSize:9}}>{mostrarFriccion?"▲ ocultar contexto":"▼ ¿por qué esta pregunta?"}</Mono>
      </button>

      {mostrarFriccion && (
        <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"16px 20px",marginBottom:24,borderLeft:`1px solid ${T.oro}44`}}>
          <div style={{fontSize:13,color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.7}}>{preg?.friccion}</div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:8,opacity:animando?0.3:1,transition:"opacity 0.2s"}}>
        {preg?.opciones.map((op,i)=>(
          <button key={i} onClick={()=>seleccionar(preg.valores[i])} style={{
            padding:"14px 20px",background:"transparent",border:`1px solid ${T.borde}`,
            color:T.gris1,fontFamily:"Georgia,serif",fontSize:15,textAlign:"left",
            cursor:"pointer",borderRadius:2,transition:"all 0.15s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.oro;e.currentTarget.style.color=T.hueso;e.currentTarget.style.background=T.oroSuave}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.borde;e.currentTarget.style.color=T.gris1;e.currentTarget.style.background="transparent"}}>
            {op}
          </button>
        ))}
      </div>

      {icrParcial!==null && (
        <div style={{marginTop:40,display:"flex",alignItems:"center",gap:16,opacity:0.7}}>
          <div style={{fontSize:28,fontWeight:300,color:getPerfil(icrParcial)?.color,letterSpacing:-1}}>{icrParcial}</div>
          <div>
            <Mono style={{color:T.gris2,fontSize:9,display:"block"}}>ICR PARCIAL</Mono>
            <div style={{fontSize:12,color:getPerfil(icrParcial)?.color,fontStyle:"italic"}}>{getPerfil(icrParcial)?.nombre}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// VISTA RESULTADO
function Resultado({respuestas,respDual,onVolver,onHistorial}) {
  const icr = calcICR(respuestas, respDual);
  const perfil = getPerfil(icr);
  const dims = calcDims(respuestas);
  const [tab, setTab] = useState(0);
  const tabs = ["Perfil","Dimensiones","Recomendaciones"];

  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"48px 24px"}}>
      <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"40px",marginBottom:32,borderRadius:2,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${perfil?.color},transparent)`}}/>
        <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:20}}>ÍNDICE DE COHERENCIA REFLEXIVA</Mono>
        <div style={{display:"flex",alignItems:"flex-end",gap:20,marginBottom:20}}>
          <div style={{fontSize:80,fontWeight:300,letterSpacing:-3,color:perfil?.color,lineHeight:1}}>{icr}</div>
          <div style={{paddingBottom:8}}>
            <div style={{fontSize:26,fontFamily:"Georgia,serif",fontStyle:"italic",color:T.hueso,marginBottom:6}}>{perfil?.nombre}</div>
            <span style={{fontFamily:"monospace",fontSize:9,letterSpacing:3,padding:"4px 10px",border:`1px solid ${perfil?.color}`,color:perfil?.color}}>{perfil?.rango}</span>
          </div>
        </div>
        <Barra valor={icr} color={perfil?.color}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <Mono style={{color:T.gris2,fontSize:9}}>REACTIVO</Mono>
          <Mono style={{color:T.gris2,fontSize:9}}>REFLEXIVO</Mono>
        </div>
        <div style={{marginTop:24,display:"flex",gap:24}}>
          {dims.map((d,i)=>(
            <div key={i}>
              <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:4}}>{DIMENSIONES[i].id}</Mono>
              <span style={{fontSize:22,fontWeight:300,color:getPerfil(d)?.color}}>{d}</span>
            </div>
          ))}
          <div>
            <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:4}}>DUAL</Mono>
            <span style={{fontSize:22,fontWeight:300,color:getPerfil(respDual)?.color}}>{respDual}</span>
          </div>
        </div>
      </div>

      <div style={{display:"flex",borderBottom:`1px solid ${T.borde}`,marginBottom:32}}>
        {tabs.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{padding:"10px 20px",background:"transparent",border:"none",borderBottom:tab===i?`2px solid ${T.oro}`:"2px solid transparent",color:tab===i?T.oro:T.gris1,fontFamily:"monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",marginBottom:-1}}>
            {t}
          </button>
        ))}
      </div>

      {tab===0 && (
        <div>
          <div style={{fontSize:20,fontFamily:"Georgia,serif",fontWeight:300,lineHeight:1.7,color:T.hueso,marginBottom:28}}>{perfil?.resumen}</div>
          {perfil?.cuerpo.map((p,i)=>(
            <div key={i} style={{fontSize:15,color:T.gris1,lineHeight:1.8,fontFamily:"Georgia,serif",marginBottom:20}}>{p}</div>
          ))}
          <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"16px 20px",borderLeft:`2px solid ${perfil?.color}`,marginTop:8}}>
            <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:8}}>BASE CIENTÍFICA</Mono>
            <div style={{fontSize:12,color:T.gris1,fontStyle:"italic"}}>{perfil?.autores}</div>
          </div>
        </div>
      )}

      {tab===1 && (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {DIMENSIONES.map((d,i)=>{
            const v=dims[i], c=getPerfil(v)?.color;
            return (
              <div key={d.id} style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"24px 28px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <Mono style={{color:T.oro,fontSize:9,display:"block",marginBottom:6}}>{d.id}</Mono>
                    <div style={{fontSize:18,fontFamily:"Georgia,serif"}}>{d.nombre}</div>
                  </div>
                  <div style={{fontSize:40,fontWeight:300,color:c,letterSpacing:-1}}>{v}</div>
                </div>
                <Barra valor={v} color={c}/>
                <div style={{marginTop:14,fontSize:13,color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>{d.concepto}</div>
                <div style={{marginTop:10,fontSize:11,color:T.gris2,fontFamily:"monospace"}}>{d.autores}</div>
              </div>
            );
          })}
        </div>
      )}

      {tab===2 && (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{fontSize:14,color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic",marginBottom:8,lineHeight:1.7}}>
            El MCD genera estas intervenciones desde tu perfil específico. No son ejercicios genéricos: responden al punto de entrada que tus respuestas revelan.
          </div>
          {perfil?.recomendaciones.map((r,i)=>(
            <div key={i} style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"28px 32px"}}>
              <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:28,height:28,border:`1px solid ${T.oro}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Mono style={{color:T.oro,fontSize:10}}>{i+1}</Mono>
                </div>
                <div>
                  <div style={{fontSize:16,fontFamily:"Georgia,serif",marginBottom:12,color:T.hueso}}>{r.titulo}</div>
                  <div style={{fontSize:14,color:T.gris1,lineHeight:1.8,fontFamily:"Georgia,serif",fontWeight:300}}>{r.cuerpo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Divider/>
      <div style={{display:"flex",gap:12}}>
        <button onClick={onVolver} style={{padding:"12px 24px",background:"transparent",border:`1px solid ${T.borde}`,color:T.gris1,fontFamily:"monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>↺ Nueva</button>
        <button onClick={onHistorial} style={{padding:"12px 24px",background:"transparent",border:`1px solid ${T.borde}`,color:T.gris1,fontFamily:"monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>Historial →</button>
      </div>
    </div>
  );
}

// VISTA HISTORIAL
function Historial({historial,onVolver}) {
  const serie = [...historial].reverse().slice(-8);
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"48px 24px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:48}}>
        <Mono style={{color:T.oro,fontSize:10}}>HISTORIAL · {historial.length} SESIÓN{historial.length!==1?"ES":""}</Mono>
        <button onClick={onVolver} style={{padding:"8px 16px",background:"transparent",border:`1px solid ${T.borde}`,color:T.gris1,fontFamily:"monospace",fontSize:9,letterSpacing:2,textTransform:"uppercase",cursor:"pointer"}}>← Volver</button>
      </div>

      {!historial.length && (
        <div style={{color:T.gris1,fontFamily:"Georgia,serif",fontStyle:"italic"}}>Todavía no hay sesiones registradas.</div>
      )}

      {serie.length>1 && (
        <div style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"28px",marginBottom:32}}>
          <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:20,letterSpacing:3}}>EVOLUCIÓN ICR</Mono>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:90}}>
            {serie.map((s,i)=>{
              const h=(s.icr/100)*90, c=getPerfil(s.icr)?.color;
              return (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <Mono style={{color:c,fontSize:9}}>{s.icr}</Mono>
                  <div style={{width:"100%",height:h,background:c,opacity:0.75,borderRadius:1}}/>
                  <Mono style={{color:T.gris2,fontSize:8}}>{new Date(s.fecha).toLocaleDateString("es-AR",{day:"2-digit",month:"short"})}</Mono>
                </div>
              );
            })}
          </div>
          <div style={{borderTop:`1px dashed ${T.oro}44`,marginTop:8,paddingTop:8}}>
            <Mono style={{color:T.oro,fontSize:9}}>— umbral crítico 75</Mono>
          </div>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {historial.map((s,i)=>{
          const p=getPerfil(s.icr);
          return (
            <div key={i} style={{background:T.superficie,border:`1px solid ${T.borde}`,padding:"20px 24px",display:"flex",alignItems:"center",gap:20}}>
              <div style={{fontSize:36,fontWeight:300,color:p?.color,letterSpacing:-1,minWidth:52}}>{s.icr}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontFamily:"Georgia,serif",fontStyle:"italic",color:T.hueso,marginBottom:6}}>{p?.nombre}</div>
                <Barra valor={s.icr} color={p?.color} height={1}/>
              </div>
              <div style={{textAlign:"right"}}>
                <Mono style={{color:T.gris2,fontSize:9,display:"block",marginBottom:6}}>{fmtFecha(s.fecha)}</Mono>
                <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                  {s.dims?.map((d,j)=>(
                    <Mono key={j} style={{color:getPerfil(d)?.color,fontSize:9}}>{DIMENSIONES[j].id}:{d}</Mono>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [vista, setVista] = useState("inicio");
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(()=>{
    try {
      const r = localStorage.getItem("aletheia-v2");
      if (r) setHistorial(JSON.parse(r));
    } catch {}
  },[]);

  const guardar = async(resp, dual) => {
    const icr = calcICR(resp, dual);
    const dims = calcDims(resp);
    const nueva = {fecha:new Date().toISOString(), icr, dims, dual};
    const nuevo = [nueva,...historial].slice(0,30);
    setHistorial(nuevo);
    try { localStorage.setItem("aletheia-v2", JSON.stringify(nuevo)); } catch {}
  };

  const handleTerminar = async(resp, dual) => {
    await guardar(resp, dual);
    setResultado({resp, dual});
    setVista("resultado");
  };

  return (
    <div style={{minHeight:"100vh",background:T.negro,color:T.hueso,fontFamily:"Georgia,serif"}}>
      <Nav vista={vista} onNav={v=>setVista(v)}/>
      {vista==="inicio" && <Inicio historial={historial} onComenzar={()=>setVista("evaluacion")}/>}
      {vista==="evaluacion" && <Evaluacion onTerminar={handleTerminar}/>}
      {vista==="resultado" && resultado && <Resultado respuestas={resultado.resp} respDual={resultado.dual} onVolver={()=>setVista("evaluacion")} onHistorial={()=>setVista("historial")}/>}
      {vista==="historial" && <Historial historial={historial} onVolver={()=>setVista("inicio")}/>}
    </div>
  );
}
