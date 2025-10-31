# SmartTodoFrontend

SmartTodoFrontend är ett Angular 20-baserat webgränssnitt för SmartTodo-plattformen. Applikationen låter användare registrera sig, logga in, hantera todos, uppgradera sin plan via Stripe och kommunicera med administratörer via realtidschatt. Projektet pratar med backend-API:t som hostas på DigitalOcean.

## Funktioner

- **Autentisering & roller**  
  Inloggning, registrering och JWT-hantering via `AuthService`. Rollkontroll sker med `role.guard.ts`.

- **Todo-hantering**  
  Skapa, lista och toggla todos via REST-anrop (`TodoService`). Signal-baserad lokal state uppdaterar UI:t.

- **Billing & prenumerationer**  
  Integrerat Stripe-flöde för uppgradering, avbrutna betalningar och kvitto-vyer (`Billing`-komponenterna).

- **Administrationspanel**  
  Separata dashboards för användare och administratörer med rollbaserade vyer.

- **Supportchatt i realtid**  
  WebSocket/STOMP-integration (`WsService`, `RxStomp`) för meddelanden mellan användare och admin, samt AI-hjälp (`AiService`) för att föreslå todo-beskrivningar.

## Teknisk stack

- Angular 20, TypeScript 5.9
- RxJS 7.8 och Angular Signals
- `@stomp/rx-stomp` och `sockjs-client` för realtid
- Stripe-integration via `ngx-stripe`

## Förutsättningar

- Node.js 20.x (rekommenderat att låsa versionen via `"engines"` i `package.json`)
- npm 10+
- (Valfritt) Angular CLI globalt installerad för lokala verktyg

## Kom igång lokalt

```bash
git clone https://github.com/Azadan/SmartTodoFrontend.git
cd SmartTodoFrontend
npm install
```

Kör utvecklingsservern:

```bash
npm run ng -- serve
# eller om du föredrar npm scriptet:
npm start
```

Applikationen är tillgänglig på `http://localhost:4200/`. Dev-servern använder filbevakning och hot reload.

## Bygg

```bash
npm run build
```

Bygget hamnar i `dist/SmartTodoFrontend/browser`, vilket är den mapp som ska exponeras i produktion.

## Miljövariabler

Applikationen använder för närvarande hårdkodade URL:er till backend (`https://orca-app-htew6.ondigitalocean.app`). Om du behöver byta miljö, introducera gärna Angulars miljökonfiguration (`src/environments/`) och ersätt direkta URL-strängar.
