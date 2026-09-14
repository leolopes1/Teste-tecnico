Outros Créditos/Débitos — Desafio Técnico Angular

Aplicação Angular standalone que implementa a tela de consulta de lotes "Outros Créditos/Débitos" e o modal de inclusão de lançamentos, conforme o desafio prático proposto. Usa dados mockados em memória (sem backend real).

Tecnologias
Item	Versão / Lib
Angular	22 (standalone components, novo @if/@for)
UI	Angular Material 22 (tema M3, paleta verde-petróleo customizada)
Formulários	Reactive Forms (FormBuilder), com validador customizado
Máscara de moeda	ngx-mask
Dados	Serviços mock com of(...).pipe(delay(...)), simulando uma API
Locale	pt-BR registrado globalmente (pipes date/currency)
Como rodar
bash
npm install
npm install ngx-mask --save   # se ainda não tiver instalado
ng serve

Acesse http://localhost:4200.

Scripts disponíveis (package.json):

Script	Comando
npm start	ng serve
npm run build	ng build
npm run watch	ng build --watch --configuration development
npm test	ng test
