# README Task Frontend — Configuratore Poke e Panino

> Stack: Vite, ReactJS e integrazione con API Node.js/Express.
> Questo file contiene il backlog frontend ordinato per presa in carico.

## Legenda

- **P0**: necessario per l'MVP.
- **P1**: importante, pianificabile dopo il nucleo MVP.
- **Taglie**: `XS` poche ore, `S` mezza/una giornata, `M` 1–2 giornate, `L` 3–5 giornate, `XL` da suddividere.

## Milestone

| Milestone | Task | Risultato atteso |
|---|---|---|
| M1 — Fondazioni UI | FE-001–FE-004 | Progetto, routing, tema e struttura applicativa. |
| M2 — Configuratore core | FE-005–FE-012 | Flusso Poke/Panino funzionante con stato e validazioni. |
| M3 — Riepilogo e carrello | FE-013–FE-016 | Prezzo, riepilogo, modifica e aggiunta al carrello. |
| M4 — Qualità e rilascio | FE-017–FE-020 | Accessibilità, test, performance e documentazione. |

## Backlog completo

## [ ] FE-001 — Bootstrap del progetto e standard di qualità

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** S
- **Dipendenze:** —
- **Obiettivo:** Creare una base Vite + React riproducibile e pronta al lavoro in team.

### Sotto-task

- [ ] Inizializzare il progetto Vite con ReactJS e configurare alias di import.
- [ ] Aggiungere script npm per dev, build, preview, lint, test e test:e2e.
- [ ] Configurare ESLint, Prettier, EditorConfig e regole per hook React.
- [ ] Creare file .env.example con VITE_API_BASE_URL e flag applicativi.
- [ ] Definire gestione ambienti locale, staging e produzione senza segreti nel bundle.
- [ ] Configurare path di asset e fallback SPA per il deploy.

### Criteri di accettazione

- [ ] npm install e npm run build terminano senza errori.
- [ ] Lint e test sono eseguibili in CI senza dipendenze locali implicite.
- [ ] Il repository contiene istruzioni di avvio e variabili richieste.
- [ ] Nessuna chiave Supabase service-role è presente nel frontend.

---

## [ ] FE-002 — Router, provider e boundary applicativi

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** S
- **Dipendenze:** FE-001
- **Obiettivo:** Impostare navigazione, provider globali e gestione errori.

### Sotto-task

- [ ] Configurare il router con lazy loading delle pagine.
- [ ] Aggiungere QueryClientProvider o equivalente per lo stato server.
- [ ] Aggiungere provider del carrello e del configuratore.
- [ ] Creare ErrorBoundary globale con pagina di fallback e azione di ripristino.
- [ ] Creare layout applicativo con header, area contenuto e mini-cart.
- [ ] Implementare pagina 404 e redirect controllati.

### Criteri di accettazione

- [ ] Tutte le rotte MVP sono raggiungibili tramite navigazione client-side.
- [ ] Un errore di rendering non lascia una schermata bianca.
- [ ] Il refresh su una rotta profonda funziona nell’ambiente di deploy.
- [ ] I provider non causano richieste duplicate non necessarie.

---

## [ ] FE-003 — Design system minimo e token responsive

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-001
- **Obiettivo:** Definire componenti visivi coerenti e riutilizzabili.

### Sotto-task

- [ ] Definire token CSS per colori, tipografia, spaziature, radius, shadow e breakpoint.
- [ ] Implementare Button, IconButton, Card, Badge, Chip, CheckboxCard, RadioCard e Divider.
- [ ] Implementare Stepper/ProgressBar, BottomActionBar e PriceSummary.
- [ ] Definire stati hover, focus-visible, selected, disabled, loading ed error.
- [ ] Creare Skeleton, EmptyState, ErrorState e Toast/Alert.
- [ ] Documentare proprietà e casi d’uso dei componenti principali.

### Criteri di accettazione

- [ ] I componenti base non contengono logica specifica Poke o Panino.
- [ ] Il focus è sempre visibile e il contrasto è adeguato.
- [ ] La CTA fissa non copre contenuti o controlli su mobile.
- [ ] Gli stati selezionato e disabilitato sono distinguibili anche senza affidarsi solo al colore.

---

## [ ] FE-004 — Client API, DTO e normalizzazione errori

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-001
- **Obiettivo:** Centralizzare comunicazione con Express e gestione degli errori.

### Sotto-task

- [ ] Creare un client HTTP con base URL, header JSON, timeout e AbortController.
- [ ] Mappare risposte non 2xx in un AppError con code, message, fieldErrors e requestId.
- [ ] Definire funzioni per catalogo, ricette, anteprima prezzo e ordini.
- [ ] Creare tipi DTO e mapper verso i modelli UI.
- [ ] Aggiungere retry solo per GET idempotenti e non per creazione ordine.
- [ ] Gestire 401/403, 409 e 422 con messaggi specifici.

### Criteri di accettazione

- [ ] Le pagine non invocano fetch direttamente.
- [ ] Gli errori API vengono mostrati con messaggi comprensibili e log tecnico separato.
- [ ] Le richieste obsolete vengono annullate in cambio pagina.
- [ ] Il requestId del backend è disponibile per diagnosi.

---

## [ ] FE-005 — Caricamento catalogo e cache

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-004
- **Obiettivo:** Recuperare dal backend struttura, prezzi e disponibilità dei configuratori.

### Sotto-task

- [ ] Implementare query per elenco tipologie e dettaglio configuratore.
- [ ] Definire staleTime coerente per dati di menu e disponibilità.
- [ ] Mostrare skeleton durante il primo caricamento.
- [ ] Gestire catalogo vuoto, prodotto disattivato e rete assente.
- [ ] Pre-caricare il configuratore dopo hover/tap intenzionale sulla card della home.
- [ ] Invalidare o ricaricare i dati prima dell’invio ordine se troppo vecchi.

### Criteri di accettazione

- [ ] Il catalogo viene riusato dalla cache nelle navigazioni ravvicinate.
- [ ] Nessun ingrediente o prezzo è hardcoded nei componenti di produzione.
- [ ] Gli stati indisponibili sono riflessi senza rompere una bozza esistente.
- [ ] Il retry manuale è disponibile dopo un errore di rete.

---

## [ ] FE-006 — Home e scelta del percorso

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** S
- **Dipendenze:** FE-002, FE-003, FE-005
- **Obiettivo:** Realizzare la prima schermata con tre percorsi chiari.

### Sotto-task

- [ ] Creare hero sintetico con titolo e istruzione.
- [ ] Aggiungere card “Crea la tua Poke” e “Crea il tuo Panino”.
- [ ] Aggiungere sezione “Creazioni del brand” con anteprime.
- [ ] Gestire stato disabilitato se una tipologia non è disponibile.
- [ ] Aggiungere accesso persistente al carrello.
- [ ] Tracciare evento di scelta percorso, se analytics è previsto.

### Criteri di accettazione

- [ ] L’utente distingue immediatamente le tre opzioni.
- [ ] Le card sono interamente cliccabili e utilizzabili da tastiera.
- [ ] La home resta leggibile da 320 px fino a desktop.
- [ ] Le immagini non causano layout shift significativo.

---

## [ ] FE-007 — Engine comune del configuratore

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-003, FE-005
- **Obiettivo:** Implementare lo stato e le regole comuni ai due configuratori.

### Sotto-task

- [ ] Definire ConfiguratorState con type, sizeId, selections, currentStep, pricing e validation.
- [ ] Implementare reducer/action per selezione singola, multipla, quantità, reset e caricamento ricetta.
- [ ] Calcolare lo stato di completezza per categoria usando minSelect/maxSelect ricevuti dal backend.
- [ ] Impedire selezioni oltre il limite e proporre sostituzione quando la categoria è singola.
- [ ] Persistire una bozza versionata in sessionStorage o localStorage.
- [ ] Rimuovere dalla bozza opzioni diventate inattive e mostrare un avviso.
- [ ] Esporre hook useConfigurator con API stabile per le pagine.

### Criteri di accettazione

- [ ] Lo stesso engine supporta Poke e Panino senza fork di logica.
- [ ] Non è possibile avanzare con una categoria obbligatoria incompleta.
- [ ] Il refresh mantiene una bozza compatibile con il catalogo corrente.
- [ ] La modifica di dimensione rivalida tutte le selezioni.
- [ ] I test coprono min/max, singola selezione, reset, ripristino e invalidazione.

---

## [ ] FE-008 — Shell a quattro step e navigazione

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-007
- **Obiettivo:** Costruire il contenitore del flusso breve con progressione chiara.

### Sotto-task

- [ ] Creare header del configuratore con nome prodotto, step corrente e uscita.
- [ ] Implementare progress bar “Step X di 4”.
- [ ] Mostrare una categoria per sezione, raggruppando categorie correlate nello stesso step.
- [ ] Aggiungere CTA Indietro/Continua e prezzo corrente nella bottom bar.
- [ ] Chiedere conferma solo quando l’uscita perderebbe modifiche non salvate.
- [ ] Consentire accesso diretto agli step già completati dal riepilogo.

### Criteri di accettazione

- [ ] Il flusso completo richiede al massimo quattro step prima del riepilogo finale.
- [ ] La navigazione non perde selezioni.
- [ ] Il back del browser mantiene uno stato coerente.
- [ ] La CTA continua indica il motivo quando è disabilitata.

---

## [ ] FE-009 — Configuratore Poke

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-008
- **Obiettivo:** Configurare contenuti e vincoli del flusso Poke.

### Sotto-task

- [ ] Step 1: dimensione Small/Regular/Large e base riso bianco, riso venere, quinoa o insalata.
- [ ] Step 2: proteine salmone, tonno, pollo, gamberi, tofu e uovo.
- [ ] Step 3: avocado, edamame, cetriolo, carote, mango, cavolo rosso, mais, cipolla croccante, sesamo e alghe.
- [ ] Step 4: salsa di soia, teriyaki, spicy mayo, ponzu o yogurt, più riepilogo.
- [ ] Visualizzare allergeni e tag alimentari ricevuti dal backend.
- [ ] Gestire supplementi e quantità solo se abilitati dalle regole dati.
- [ ] Aggiungere il prodotto configurato al carrello con snapshot leggibile.

### Criteri di accettazione

- [ ] Tutti gli ingredienti sono generati dal catalogo backend e ordinati per displayOrder.
- [ ] Dimensione e base sono obbligatorie.
- [ ] L’interfaccia rispetta i limiti configurati per proteine, topping e salse.
- [ ] Il riepilogo mostra ogni selezione, supplementi, totale e link di modifica.
- [ ] Un prodotto valido può essere aggiunto al carrello una sola volta per azione.

---

## [ ] FE-010 — Configuratore Panino

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-008
- **Obiettivo:** Configurare contenuti e vincoli del flusso Panino.

### Sotto-task

- [ ] Step 1: dimensione Normale/Maxi e pane bun classico, integrale, ai cereali, focaccia o senza glutine.
- [ ] Step 2: hamburger di manzo, pollo, cotoletta, pulled pork o burger vegetale.
- [ ] Step 3: cheddar, scamorza, mozzarella, provola; insalata, pomodoro, cipolla, cetriolini, melanzane, zucchine e peperoni.
- [ ] Step 4: bacon, uovo, cipolla croccante, doppia carne; maionese, ketchup, barbecue, senape o salsa piccante; riepilogo.
- [ ] Gestire la doppia carne come extra con supplemento e vincolo compatibile con la proteina.
- [ ] Gestire pane senza glutine come opzione con allergeni e possibile supplemento.
- [ ] Aggiungere il prodotto configurato al carrello.

### Criteri di accettazione

- [ ] Il flusso usa l’engine comune e non duplica la logica di stato.
- [ ] Una sola proteina principale è selezionabile salvo regola esplicita.
- [ ] Formaggi, verdure, extra e salse rispettano min/max del catalogo.
- [ ] Le incompatibilità restituite dal backend vengono mostrate prima dell’aggiunta al carrello.
- [ ] Il riepilogo è completo e modificabile.

---

## [ ] FE-011 — Anteprima prezzo reattiva e robusta

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-004, FE-007
- **Obiettivo:** Mostrare un prezzo aggiornato senza rendere fragile l’esperienza.

### Sotto-task

- [ ] Inviare il payload di configurazione all’endpoint price preview dopo modifiche rilevanti.
- [ ] Applicare debounce breve alle modifiche multiple.
- [ ] Annullare richieste prezzo superate e ignorare risposte fuori ordine.
- [ ] Mostrare stato “Aggiornamento prezzo…” senza bloccare selezioni.
- [ ] Aggiornare breakdown base/supplementi/totale e warnings.
- [ ] In caso di errore, mantenere l’ultimo prezzo valido marcandolo come da verificare.

### Criteri di accettazione

- [ ] Il totale visualizzato coincide con l’ultima risposta valida del backend.
- [ ] Una risposta lenta non sovrascrive una configurazione più recente.
- [ ] Gli errori temporanei non cancellano le selezioni.
- [ ] Prima dell’aggiunta al carrello è disponibile un price preview valido per lo stato corrente.

---

## [ ] FE-012 — Creazioni del brand

- **Stato:** Da prendere in carico
- **Priorità:** P1
- **Taglia:** M
- **Dipendenze:** FE-004, FE-003
- **Obiettivo:** Permettere la scelta rapida di ricette preconfigurate.

### Sotto-task

- [ ] Creare pagina elenco con filtro Poke/Panino e stato vuoto.
- [ ] Creare card con immagine, nome, descrizione breve, prezzo e tag.
- [ ] Creare dettaglio con ingredienti, allergeni e disponibilità.
- [ ] Aggiungere CTA “Aggiungi così” e, se consentito, “Personalizza”.
- [ ] Quando si personalizza, inizializzare l’engine con le selezioni della ricetta.
- [ ] Gestire ricette disattivate o ingredienti non disponibili.

### Criteri di accettazione

- [ ] Le ricette provengono dal backend e non sono duplicate nel bundle.
- [ ] La personalizzazione mantiene il riferimento alla ricetta originaria.
- [ ] Una ricetta non più disponibile mostra un messaggio e un percorso alternativo.
- [ ] Il prezzo viene sempre rivalidato dal backend.

---

## [ ] FE-013 — Carrello persistente

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-007, FE-011
- **Obiettivo:** Gestire prodotti configurati e totali prima dell’ordine.

### Sotto-task

- [ ] Definire store versionato con add, updateQuantity, remove, clear e replaceItem.
- [ ] Usare localId client-side distinto dagli id di catalogo.
- [ ] Persistire in localStorage e gestire migrazione/invalidazione dello schema.
- [ ] Mostrare nome prodotto, dimensione, selezioni sintetiche, prezzo unitario e quantità.
- [ ] Consentire modifica riaprendo il configuratore con lo snapshot.
- [ ] Ricalcolare il prezzo al ritorno al carrello quando il catalogo è cambiato.
- [ ] Prevenire doppi click e aggiunte duplicate involontarie.

### Criteri di accettazione

- [ ] Il carrello sopravvive al refresh.
- [ ] Quantità e rimozioni aggiornano immediatamente il totale visualizzato.
- [ ] Un item non valido viene marcato e richiede revisione prima dell’ordine.
- [ ] La modifica sostituisce l’item originario senza duplicarlo.
- [ ] Il carrello vuoto presenta CTA di ritorno alla scelta.

---

## [ ] FE-014 — Invio ordine e pagina di conferma

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-013, FE-004
- **Obiettivo:** Creare l’ordine in modo sicuro e gestire tutti gli esiti.

### Sotto-task

- [ ] Creare form minimo cliente solo per i dati richiesti dal processo operativo.
- [ ] Validare lato client formato e campi obbligatori senza sostituire la validazione server.
- [ ] Generare e inviare una idempotency key per tentativo ordine.
- [ ] Disabilitare la CTA durante l’invio e impedire submit multipli.
- [ ] Gestire 409/422 mostrando item o prezzi da aggiornare.
- [ ] Al successo, svuotare il carrello solo dopo risposta confermata.
- [ ] Creare pagina conferma con orderId, totale, stato e riepilogo.

### Criteri di accettazione

- [ ] Un doppio click non crea due ordini.
- [ ] Gli errori di validazione sono associati ai campi corretti.
- [ ] Il carrello non viene perso in caso di errore server o rete.
- [ ] La conferma è raggiungibile anche tramite refresh con orderId valido, secondo regole backend.
- [ ] I dati sensibili non vengono registrati nei log client.

---

## [ ] FE-015 — Gestione allergeni e informazioni alimentari

- **Stato:** Da prendere in carico
- **Priorità:** P1
- **Taglia:** M
- **Dipendenze:** FE-005, FE-003
- **Obiettivo:** Rendere visibili allergeni e tag senza dichiarazioni non supportate.

### Sotto-task

- [ ] Creare componente allergeni con icona, label e tooltip/testo esteso.
- [ ] Aggregare allergeni dalla configurazione nel riepilogo.
- [ ] Mostrare tag vegetariano/vegano solo se restituiti dal backend.
- [ ] Aggiungere disclaimer configurabile relativo a contaminazioni crociate.
- [ ] Non inferire automaticamente “senza glutine” dall’assenza di ingredienti noti.

### Criteri di accettazione

- [ ] Gli allergeni sono leggibili anche da screen reader.
- [ ] Il riepilogo riflette tutte le selezioni correnti.
- [ ] Le informazioni provengono dai dati backend.
- [ ] Il disclaimer è visibile prima della conferma ordine quando richiesto.

---

## [ ] FE-016 — Responsive, accessibilità e tastiera

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-003, FE-008
- **Obiettivo:** Portare l’intero flusso a standard di usabilità mobile e accessibile.

### Sotto-task

- [ ] Verificare layout a 320, 375, 768, 1024 e 1440 px.
- [ ] Usare landmark, heading gerarchici e label esplicite.
- [ ] Implementare selezioni con input semantici o pattern ARIA corretti.
- [ ] Gestire focus allo step successivo e ritorno al titolo della sezione.
- [ ] Garantire target touch adeguati e nessuno scroll orizzontale.
- [ ] Annunciare errori, aggiornamento prezzo e aggiunta al carrello con live region sobrie.
- [ ] Supportare prefers-reduced-motion.

### Criteri di accettazione

- [ ] Tutte le azioni principali sono completabili solo da tastiera.
- [ ] L’ordine di focus segue l’ordine visivo.
- [ ] Il controllo automatico a11y non segnala violazioni critiche.
- [ ] Zoom al 200% non nasconde contenuto o CTA.
- [ ] Le animazioni non sono necessarie per comprendere lo stato.

---

## [ ] FE-017 — Test unitari e di componente

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-007–FE-016
- **Obiettivo:** Coprire logica e componenti ad alto rischio.

### Sotto-task

- [ ] Testare reducer del configuratore e store carrello.
- [ ] Testare validazione min/max e cambio dimensione.
- [ ] Testare mapping API, currency formatter ed error mapping.
- [ ] Testare IngredientCard in stati selezionato, disabled e supplemento.
- [ ] Testare step navigation e riepilogo.
- [ ] Mockare rete con MSW o equivalente.
- [ ] Impostare soglia di coverage mirata sui moduli critici.

### Criteri di accettazione

- [ ] I test non dipendono da rete reale.
- [ ] I moduli di pricing state, configurator state e cart hanno copertura significativa.
- [ ] I test verificano comportamento, non dettagli interni fragili.
- [ ] La suite termina in modo deterministico in CI.

---

## [ ] FE-018 — Test end-to-end dei percorsi critici

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** L
- **Dipendenze:** FE-014, FE-017
- **Obiettivo:** Validare i flussi utente completi contro ambiente controllato.

### Sotto-task

- [ ] Scenario Poke: configurazione valida, carrello e ordine.
- [ ] Scenario Panino: supplementi, modifica item e ordine.
- [ ] Scenario ricetta brand: aggiunta diretta e personalizzazione.
- [ ] Scenario ingrediente non disponibile durante il flusso.
- [ ] Scenario errore price preview e successivo recupero.
- [ ] Scenario submit ordine duplicato e risposta idempotente.
- [ ] Eseguire almeno viewport mobile e desktop.

### Criteri di accettazione

- [ ] Gli scenari P0 passano su ogni merge verso il branch principale.
- [ ] I test usano dati seed ripetibili.
- [ ] Screenshot/video sono conservati solo in caso di fallimento.
- [ ] I selettori usano ruoli, label o data-testid stabili solo dove necessario.

---

## [ ] FE-019 — Performance e osservabilità frontend

- **Stato:** Da prendere in carico
- **Priorità:** P1
- **Taglia:** M
- **Dipendenze:** FE-006–FE-018
- **Obiettivo:** Controllare peso, velocità e diagnostica.

### Sotto-task

- [ ] Analizzare bundle e separare chunk per configuratore/ricette/carrello.
- [ ] Ottimizzare immagini con dimensioni esplicite e lazy loading.
- [ ] Misurare Web Vitals in staging.
- [ ] Aggiungere logging strutturato per errori API senza dati personali.
- [ ] Collegare un sistema di error tracking se disponibile.
- [ ] Definire eventi minimi: scelta percorso, completamento step, add-to-cart, ordine.

### Criteri di accettazione

- [ ] Il bundle iniziale non include pagine non necessarie.
- [ ] Le immagini non bloccano l’interazione primaria.
- [ ] Gli errori includono route, requestId e versione applicazione.
- [ ] Gli eventi analytics non includono ingredienti sensibili o dati personali non necessari.

---

## [ ] FE-020 — CI/CD e rilascio frontend

- **Stato:** Da prendere in carico
- **Priorità:** P0
- **Taglia:** M
- **Dipendenze:** FE-017, FE-018
- **Obiettivo:** Automatizzare controlli e pubblicazione.

### Sotto-task

- [ ] Creare pipeline con install pulita, lint, unit test e build.
- [ ] Eseguire E2E su staging o preview environment.
- [ ] Gestire variabili ambiente dal provider di deploy.
- [ ] Aggiungere cache dipendenze senza compromettere riproducibilità.
- [ ] Configurare SPA fallback, HTTPS e header di sicurezza pertinenti.
- [ ] Definire procedura di rollback e versionamento release.

### Criteri di accettazione

- [ ] Una pull request non può essere unita con controlli P0 falliti.
- [ ] La build usa solo variabili pubbliche VITE_*.
- [ ] Staging e produzione puntano a API distinte.
- [ ] Esiste una procedura documentata per rollback e verifica post-deploy.

---

## Definition of Done comune

- [ ] Il componente è responsive e verificato almeno su mobile, tablet e desktop.
- [ ] Gli stati loading, empty, error e disabled sono gestiti dove pertinenti.
- [ ] Le selezioni da tastiera e il focus visibile funzionano correttamente.
- [ ] Le chiamate API usano il client condiviso e gestiscono errori e timeout.
- [ ] I dati visualizzati derivano dalle API, senza duplicare regole di pricing nel frontend.
- [ ] I test unitari o di integrazione pertinenti passano.
- [ ] Non sono presenti errori o warning bloccanti nella console.
- [ ] Le variabili di ambiente e la documentazione tecnica sono aggiornate.

## Ordine consigliato di presa in carico

1. **Setup e architettura:** FE-001, FE-002, FE-003, FE-004.
2. **Ingresso e navigazione del configuratore:** FE-005, FE-006.
3. **Stato, dati e selezioni:** FE-007, FE-008, FE-009, FE-010, FE-011, FE-012.
4. **Riepilogo, prezzo e carrello:** FE-013, FE-014, FE-015, FE-016.
5. **Qualità e consegna:** FE-017, FE-018, FE-019, FE-020.

## Regole di integrazione con il backend

- Il frontend non deve calcolare autonomamente il prezzo finale.
- Le opzioni disponibili devono essere recuperate dalle API di catalogo.
- Il backend resta la fonte autorevole per disponibilità, vincoli e supplementi.
- Le richieste di preventivo e creazione ordine devono inviare identificativi, non prezzi scelti dal client.
- Token e chiavi Supabase non devono essere inseriti direttamente nel codice sorgente.
