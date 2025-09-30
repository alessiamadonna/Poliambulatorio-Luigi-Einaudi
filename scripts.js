// ============================
// MENU BURGER (non togliere sennò smettono di funzionare gli elementi nella home page)
// ============================
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
burger?.addEventListener('click', () => mainNav.classList.toggle('open'));

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mainNav?.classList.remove('open');
    }
  });
});

// ============================
// FADE-IN ELEMENTS
// ============================
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// ============================
// SLIDER DOTTORI
// ============================
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const slider = document.querySelector('.doctors-slider');

if (prevBtn && nextBtn && slider) {
  prevBtn.addEventListener('click', () => slider.scrollBy({ left: -250, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => slider.scrollBy({ left: 250, behavior: 'smooth' }));

  // drag/swipe
  let isDown = false, startX, scrollLeft;
  slider.addEventListener('mousedown', e => {
    isDown = true; slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

// ============================
// NAVBAR SCROLL
// ============================
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// ============================
// BOX VISITE SPECIALISTICHE (OVERLAY)
// ============================
const cards = document.querySelectorAll('.specialty-card');
const overlay = document.getElementById('specialtyOverlay');
if (overlay) {
  const overlayText = overlay.querySelector('.overlay-text');
  const closeBtn = overlay.querySelector('.close-overlay');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      overlayText.innerHTML = card.dataset.desc;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}


/*SEZIONE TERAPIE*/
// Gestione delle categorie
const categoryCards = document.querySelectorAll('.category-card');
const categoryGrid = document.getElementById('categoryGrid');
const categoryBar = document.getElementById('categoryBar');
const categoryBtns = document.querySelectorAll('.category-btn');
const therapyContents = document.querySelectorAll('.therapy-content');

// Selezione categoria iniziale
categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.getAttribute('data-category');
    showCategoryContent(category);
  });
});

// Gestione barra categorie
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    showCategoryContent(category);
  });
});

function showCategoryContent(category) {
  // Nascondi griglia categorie e mostra barra
  categoryGrid.style.display = 'none';
  categoryBar.classList.add('active');
  
  // Aggiorna stato attivo nei bottoni
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active', category);
    }
  });
  
  // Mostra contenuto corretto
  therapyContents.forEach(content => {
    content.classList.remove('active');
    if (content.id === category) {
      content.classList.add('active');
    }
  });
}

// Modal per i dettagli delle terapie
const modal = document.getElementById('therapyModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalBody = document.getElementById('modalBody');

// Event listener per i bottoni "Scopri di più"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('therapy-discover')) {
    const therapyItem = e.target.closest('.therapy-item');
    const therapyKey = therapyItem.getAttribute('data-therapy');
    const therapyData = getTherapyData(therapyKey);
    
    if (therapyData) {
      showModal(therapyData);
    }
  }
});

// Chiusura modal
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

function showModal(data) {
  modalTitle.textContent = data.title;
  modalCategory.textContent = data.category;
  modalCategory.className = `category-badge ${data.categoryClass}`;
  modalBody.innerHTML = data.content;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Dati delle terapie
function getTherapyData(key) {
  const therapyData = {
    'fisioterapia': {
      title: 'Fisioterapia',
      category: 'Terapia fisica',
      categoryClass: 'categoria-fisica',
      content: `
        <p>La Fisioterapia si occupa della riabilitazione in campo ortopedico, neurologico e cognitivo.</p>

<h4>Offriamo:</h4>
<ul>
  <li>Valutazioni e diagnosi (anamnesi, valutazione del caso, determinazione degli obiettivi e programmazione del trattamento);</li>
  <li>Rieducazione motoria e funzionale;</li>
  <li>Riabilitazione propriocettiva e posturale;</li>
  <li>Rieducazione neurologica, in risposta a patologie centrali e periferiche;</li>
  <li>Rieducazione viscerale;</li>
  <li>Rieducazione perineale;</li>
  <li>Educazione e rieducazione psicomotoria;</li>
  <li>Bendaggio funzionale e Kinesio Taping.</li>
</ul>

<h4>Servizi di Recupero e Rieducazione:</h4>
<ul>
  <li>Visite mediche specialistiche: Fisiatriche e discipline afferenti all’area riabilitativa;</li>
  <li>Recupero e rieducazione funzionale in esiti traumatici e/o chirurgici;</li>
  <li>Rieducazione posturale per il trattamento delle patologie della colonna vertebrale;</li>
  <li>Terapia manuale: fisioterapia, linfodrenaggio, bendaggi funzionali, kinesio taping, tecniche di facilitazione bio-neuro-muscolari.</li>
</ul>

<h4>Mal di Schiena</h4>
<p>
  Circa due terzi degli adulti soffrono di mal di schiena di tanto in tanto. È la causa più comune e più costosa della disabilità lavorativa. 
  Si può curare attraverso il movimento per elasticizzare i tessuti rigidi e tonificare quelli deboli, e con un percorso educativo che favorisca 
  posture corrette da mantenere nella quotidianità lavorativa, domestica e di svago.
</p>

<h4>Trattamenti</h4>
<ul>
  <li><strong>Linfodrenaggio:</strong> tecniche manuali lente e ritmiche per favorire il ritorno linfatico ed evitare ristagni periferici.</li>
  <li><strong>Massaggio Emolinfatico:</strong> stimola la circolazione reflua venosa e linfatica, contrastando edemi e stasi venose.</li>
  <li><strong>Massaggio Connettivale:</strong> agisce in profondità sul tessuto connettivo, utile per rilassamento, smagliature e contratture.</li>
  <li><strong>Massaggio Sportivo:</strong> indicato per atleti, aiuta a recuperare rapidamente dagli sforzi e a prevenire affaticamento, crampi e stiramenti.</li>
</ul>

<h4>Onde d’Urto</h4>
<p>
  Metodo innovativo per il trattamento delle tendinopatie croniche (epicondilite, fascite plantare, trocanterite, tendinite ecc.). 
  Stimola i meccanismi di autoguarigione, migliora l’irrorazione sanguigna e accelera la rigenerazione cellulare.
</p>

<h4>Osteopatia</h4>
<p>
  L’Osteopatia è una metodica terapeutica naturale basata sulla conoscenza dell’anatomia e della fisiologia del corpo umano.
  Mira a curare la persona, trattare le cause e ristabilire la corretta mobilità dei sistemi dell’organismo.
</p>
<ul>
  <li><strong>Tecniche strutturali:</strong> per il ripristino della mobilità osteo-articolare e muscolare.</li>
  <li><strong>Tecniche cranio-sacrali:</strong> per ristabilire l’equilibrio tra cranio e sacro.</li>
  <li><strong>Tecniche viscerali:</strong> per migliorare la mobilità dei visceri e del diaframma.</li>
</ul>
<p><strong>Indicazioni:</strong> capogiri, dolore cervicale post-trauma, sindromi croniche dolorose, gravidanza, scoliosi adolescenziale, problemi al collo e alla schiena, sciatica, lesioni traumatiche.</p>

<h4>Pavimento Pelvico</h4>
<p>
  Disturbi come incontinenza, prolasso, dolore o disfunzioni sessuali possono essere trattati con percorsi specifici 
  per rinforzare o rilassare la muscolatura pelvica, migliorando il controllo della continenza e la qualità della vita.
</p>
<p><strong>A chi è rivolta?</strong> Donne (parto, menopausa), uomini (incontinenza post-prostatectomia), e chi soffre di incontinenza, ritenzione, stipsi ostinata, dolore pelvico cronico o disfunzioni sessuali.</p>

<h4>Tecarterapia</h4>
<p>
  Terapia fisica riabilitativa che stimola i tessuti dall’interno in modo fisiologico. È indicata nel trattamento di patologie 
  osteoarticolari acute e croniche, affezioni muscolotendinee e per accelerare i processi riparativi e antinfiammatori.
</p>
<ul>
  <li>Terapia strumentale: Tecarterapia, Ultrasuoni;</li>
  <li>Terapia funzionale.</li>
</ul>

<p>
  <em>L’obiettivo della Fisioterapia è la migliore ripresa delle capacità motorie, secondo principi di carattere bio-psico-sociali.</em>
</p> 
`
    },
    
    'podologia': {
      title: 'Podologia',
      category: 'Terapia fisica',
      categoryClass: 'categoria-fisica',
      content: `

<h4>Valutazioni e Diagnostica</h4>
<ul>
  <li>Valutazione dell’anatomia e della funzionalità del piede (in statica e dinamica);</li>
  <li>Tecniche diagnostiche: Podoscopia e Baropodometria;</li>
  <li>Screening del piede diabetico;</li>
  <li>Medicazione delle ulcere.</li>
</ul>

<h4>Riabilitazione e Trattamenti</h4>
<ul>
  <li>Riabilitazione del passo con tecniche attive e passive;</li>
  <li>Utilizzo di presidi ortesici plantari di tipo biomeccanico e posturale;</li>
  <li>Educazione del paziente con patologie a rischio;</li>
  <li>Lavoro in équipe multidisciplinare con medici e specialisti, assumendo un ruolo attivo nelle decisioni terapeutiche e preventive.</li>
</ul>

<h4>Posturologia</h4>
<p>
  Il piede è un importante recettore del <em>Sistema Tonico Posturale (STP)</em>.  
  Il Podologo interviene quindi anche nell’ambito della posturologia per la correzione e prevenzione dei disturbi posturali.
</p>

<h4>Trattamenti correttivi e terapeutici delle patologie del piede</h4>
<ul>
  <li>Ulcere diabetiche;</li>
  <li>Ipercheratosi (callosità);</li>
  <li>Onicopatie (patologie delle unghie);</li>
  <li>Griffe delle dita (deformità e infiammazione);</li>
  <li>Alluce valgo;</li>
  <li>Sperone calcaneare;</li>
  <li>Ragade;</li>
  <li>Neuroma di Morton;</li>
  <li>Studio degli ipercarichi;</li>
  <li>Problemi di dolorabilità del piede;</li>
  <li>Correzione dell’appoggio e dei deficit funzionali evidenziabili durante il cammino.</li>
</ul>
      `
    },
    
    'logopedia': {
      title: 'Logopedia',
      category: 'Terapia fisica',
      categoryClass: 'categoria-fisica',
      content: `

<h4>Sintomi</h4>
<ul>
  <li>Disturbi della voce da cause funzionali;</li>
  <li>Disturbi della pronuncia da cause organiche del vocal contract;</li>
  <li>Disturbi della fluenza;</li>
  <li>Disturbi centrali della motricità del distretto fono-articolatorio;</li>
  <li>Disturbi specifici del linguaggio;</li>
  <li>Disturbi specifici degli apprendimenti.</li>
</ul>

<p>
  È opportuno chiedere una Consulenza Logopedica qualora si osservino delle difficoltà legate all’area della comunicazione, degli apprendimenti o della deglutizione, quali voce, articolazione (pronuncia dei singoli suoni e comprensibilità di un discorso), fluenza (capacità di parlare in modo sciolto), competenze comunicative e capacità di percezione uditiva.
</p>

<p>
  La precocità dell’intervento è essenziale in età evolutiva, così come in presenza di alcune patologie dell’adulto.
</p>

<h4>Trattamento dello squilibrio muscolare oro-facciale</h4>
<p>
  Lo Squilibrio Muscolare Oro-Facciale (SMOF) è un’alterazione dell’equilibrio delle strutture del complesso bucco-facciale trattabile con la Logopedia.
</p>

<h5>Lo SMOF è determinato da diversi fattori:</h5>
<ul>
  <li>Mancato passaggio di deglutizione da tipo infantile a quella di tipo adulto con una postura linguale a riposo ed in deglutizione corretta;</li>
  <li>Malocclusioni dentali;</li>
  <li>Respirazione orale per presenza di patologie organiche di natura otorino-laringoiatrica e/o allergologia;</li>
  <li>Scorretta postura della lingua determinata da vizi orali (succhiamento del pollice, prolungato utilizzo di ciuccio o biberon, onicofagia, ecc.);</li>
  <li>Traumi;</li>
  <li>Disfunzioni del sistema nervoso centrale.</li>
</ul>

<h5>Lo SMOF determina alterazioni in tutte le funzioni orali:</h5>
<ul>
  <li>Problemi di masticazione;</li>
  <li>Crescita anomala dei denti e malocclusione;</li>
  <li>Palato ogivale;</li>
  <li>Difetti di pronuncia a carico di alcuni suoni;</li>
  <li>Disturbi di natura respiratoria;</li>
  <li>Problemi posturali a carico della colonna;</li>
  <li>Alterazioni estetiche e mimiche.</li>
</ul>

<p>
  Le cause dello SMOF devono essere intercettate precocemente, per evitare meccanismi di compenso, che, a lungo andare, alterano le normali funzionalità nel bambino e nell’adulto.
</p>

<h4>Il ruolo del Logopedista</h4>
<p>
  Il Logopedista è il professionista sanitario competente nella valutazione e rieducazione delle funzioni orali, come suzione, deglutizione, masticazione, respirazione, fonazione, mimica e gusto.
</p>
<p>
  Il trattamento logopedico risulta coadiuvante all’ortodonzia, in quanto le anomalie posturali linguali possono compromettere l’intervento ortodontico e il ripristino di tutte le funzioni orali.
</p>
      `
    },
    
    
    'allergologia': {
      title: 'Allergologia',
      category: 'Terapie e test',
      categoryClass: 'categoria-test',
      content: `
        <p>
  L’Allergologia previene, tratta e diagnostica le allergie, ovvero l’insieme delle reazioni che l’organismo mette in atto quando entra in contatto con particolari sostanze estranee, definite “allergeni”.
</p>

<h4>Tipologie di allergie</h4>
<ul>
  <li>Allergopatie respiratorie (riniti, asma);</li>
  <li>Allergie e intolleranze alimentari;</li>
  <li>Patologie cutanee (dermatite atopica, eczemi da contatto, orticaria allergica).</li>
</ul>

<h4>Visite specialistiche</h4>
<p>
  È possibile effettuare visite specialistiche allergologiche comprensive di test diagnostici, indispensabili per la diagnosi delle allergie:
</p>
<ul>
  <li>Prick Test;</li>
  <li>Patch Test;</li>
  <li>Spirometria semplice.</li>
</ul>
      `
    },
    
    'dietistica': {
      title: 'Dietistica',
      category: 'Terapie e test',
      categoryClass: 'categoria-test',
      content: `
<p>
L’obiettivo della Dietistica, come scienza medica, è quello di inserire un nuovo modo di alimentarsi nell’ambito di un corretto stile di vita e fare in modo che le nozioni acquisite vengano mantenute nel tempo.  
I programmi alimentari che vengono proposti sono personalizzati e stilati sulla base delle esigenze specifiche dell’individuo.
</p>

<p>Lo specialista in Dietistica e Scienze della Nutrizione elabora schemi alimentari personalizzati per:</p>

<ul>
  <li>adulti e bambini,</li>
  <li>sovrappeso e obesità,</li>
  <li>diabete,</li>
  <li>ipertensione,</li>
  <li>ipercolesterolemia,</li>
  <li>ipertrigliceridemia,</li>
  <li>patologie del tratto gastro-intestinale,</li>
  <li>pre e post-intervento di chirurgia bariatrica ed estetica,</li>
  <li>vegetariani e vegani,</li>
  <li>gravidanza ed allattamento,</li>
  <li>alimentazione sportiva,</li>
  <li>celiachia,</li>
  <li>intolleranze alimentari,</li>
  <li>oppure semplicemente per chi, pur essendo normopeso, volesse seguire un’alimentazione più sana e corretta.</li>
</ul>

<p>
Lo specialista in Dietistica si avvale di un particolare strumento l’impedenziometro, che permette di valutare la composizione corporea in termini di acqua, massa grassa, e massa magra, al fine di monitorare i risultati di un programma dietetico o di una attività fisica.
</p>
      `
    },
    
    
    'agopuntura': {
      title: 'Agopuntura',
      category: 'Terapie alternative',
      categoryClass: 'categoria-alternative',
      content: `
<p>
L’Agopuntura è una tecnica terapeutica che consiste nel trattamento e nella prevenzione di varie patologie tramite la stimolazione di specifici punti per mezzo di aghi molto sottili, sterili e monouso, assolutamente priva di effetti collaterali.  
L’Agopuntura ha un’azione antidolorifica, antiinfiammatoria e decontratturante sui muscoli, essa ha, inoltre, un effetto sedativo, ansiolitico e antidepressivo.
</p>

<p>
Si valutano i sintomi e la storia clinica del paziente. I cicli sono di 5/10 sedute, a seconda della patologia da trattare e della risposta del paziente.
</p>

<p>
L’Agopuntura è un atto medico, pertanto, può essere praticata solo da personale laureato in medicina e chirurgia ed abilitato alla professione medica.
</p>

<p>Le principali patologie che possono essere trattate dall’Agopuntura sono:</p>

<ul>
  <li>Muscolo-scheletriche,</li>
  <li>Neurologiche e cefalee,</li>
  <li>Urologiche,</li>
  <li>Ostetrico-ginecologiche,</li>
  <li>Broncopolmonari,</li>
  <li>Gastroenterologiche,</li>
  <li>Otorinolaringoiatriche,</li>
  <li>Dermatologiche,</li>
  <li>Psico-emotive.</li>
</ul>
      `
    },
    
    'omeopatia': {
      title: 'Omeopatia',
      category: 'Terapie alternative',
      categoryClass: 'categoria-alternative',
      content: `
        <p>
L’Omeopatia, come medicina non convenzionale, propone un tipo di cura che guarda alla totalità della persona e non solo alla malattia in sé.  
“Per guarire una malattia, bisogna somministrare all’individuo che ne è affetto, un rimedio che gli provocherebbe, se fosse sano, la malattia che lo affligge”
</p>

<p><em>Christian Samuel Friedrich Hahnemann</em></p>

<p>
Elemento cardine della scienza omeopatica è costituito dalla legge di Hering, (medico omeopata tedesco dell’Ottocento) quest’ultima segnala se la cura sta procedendo nella direzione giusta e quanto tempo ci vorrà per la guarigione.
</p>

<p>La legge di Hering è espressa da quattro principi:</p>

<ol>
  <li>la malattia progredisce dall’esterno all’interno, mentre quando è curata guarisce dall’interno all’esterno, la malattia ha sempre direzione centripeta, mentre la guarigione ha sempre direzione centrifuga;</li>
  <li>la guarigione dovrà verificarsi dall’alto verso il basso, partirà quindi dal piano psicologico-mentale per arrivare al piano fisico-corporeo;</li>
  <li>la guarigione dovrà iniziare dagli organi più importanti e proseguire in quelli di importanza minore;</li>
  <li>la guarigione avviene in ordine inverso alla comparsa dei sintomi.</li>
</ol>
      `
    },
    
    'kinesiotaping': {
      title: 'Kinesiotaping',
      category: 'Terapie alternative',
      categoryClass: 'categoria-alternative',
      content: `
        <p>Il kinesiotaping è l'applicazione di tape elastici specifici che supportano muscoli e articolazioni mantenendo la libertà di movimento.</p>
        
        <h4>Effetti terapeutici:</h4>
        <ul>
          <li>Supporto muscolare e articolare</li>
          <li>Miglioramento della circolazione</li>
          <li>Riduzione dell'edema</li>
          <li>Modulazione del dolore</li>
          <li>Correzione posturale</li>
        </ul>
        
        <h4>Tecniche di applicazione:</h4>
        <ul>
          <li>Tecnica muscolare</li>
          <li>Tecnica correttiva meccanica</li>
          <li>Tecnica linfatica</li>
          <li>Tecnica ligamentosa</li>
          <li>Applicazioni combinate</li>
        </ul>
        
        <p>Il tape può essere mantenuto per 3-5 giorni, permettendo al paziente di continuare le normali attività quotidiane con supporto terapeutico.</p>
      `
    },
    
    'linfodrenaggio': {
      title: 'Linfodrenaggio',
      category: 'Terapie alternative',
      categoryClass: 'categoria-alternative',
      content: `
        <p>Il linfodrenaggio manuale è una tecnica di massaggio specializzata che stimola il sistema linfatico per migliorare il drenaggio dei liquidi corporei.</p>
        
        <h4>Benefici principali:</h4>
        <ul>
          <li>Riduzione di edemi e gonfiori</li>
          <li>Miglioramento della circolazione linfatica</li>
          <li>Effetto detossificante</li>
          <li>Stimolazione del sistema immunitario</li>
          <li>Rilassamento generale</li>
        </ul>
        
        <h4>Indicazioni:</h4>
        <ul>
          <li>Linfedemi primari e secondari</li>
          <li>Edemi post-traumatici</li>
          <li>Insufficienza venosa</li>
          <li>Cellulite e ritenzione idrica</li>
          <li>Supporto post-chirurgico</li>
        </ul>
        
        <p>Il trattamento segue protocolli specifici con pressioni e direzioni precise per ottimizzare il flusso linfatico verso i linfonodi.</p>
      `
    }
  };
  
  return therapyData[key] || null;
}