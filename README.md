# ONDE PASSA

## INTEGRANTES

- Gabriel Garibaldi de Cataldi - RA: 2040482423051
- Leonardo Dias Correa - RA: 2040482423047
- Samuel Felipe de Souza - RA: 2040482423013

## Como executar

### Backend

1. Abra um terminal na pasta `backend` e instale as dependências:
   ```bash
   cd backend
   npm install
   ```

2. Crie um arquivo `.env` dentro da pasta `backend` com base no arquivo `.env.example` e adicione o seu token da API do TMDB:
   ```env
   TMDB_TOKEN=seu_token_aqui
   ```
   **Como obter o token do TMDB:**
   - Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org) e confirme o seu e-mail.
   - Acesse **Configurações > API** no menu do seu perfil, solicite uma chave de uso pessoal e não comercial e preencha o formulário.
   - Na página da API, copie o **Token de Acesso de Leitura da API** (*API Read Access Token*), que é o texto longo iniciado por `eyJ`.

3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   O terminal exibirá `Backend do OndePassa no ar. Porta: 3000.`.

### Aplicativo

1. Em um segundo terminal, acesse a pasta `mobile` e instale as dependências:
   ```bash
   cd mobile
   npm install
   ```

2. Descubra o endereço **IPv4** do seu computador na rede Wi-Fi local:
   - **Windows:** execute `ipconfig` no terminal e localize o valor de **Endereço IPv4** do seu adaptador Wi-Fi.
   - **Linux / macOS:** execute `ifconfig` ou `ip a` no terminal.
   - **Pelo próprio Expo:** ao iniciar o Expo, o IP aparece no terminal na linha `exp://<IP>:8081`.

3. Abra o arquivo `mobile/src/utils/backendClient.js` e atualize a `baseURL` com o IPv4 encontrado:
   ```javascript
   const backendClient = axios.create({
     baseURL: 'http://<SEU_IP>:3000',
   })
   ```

4. Certifique-se de que o computador e o celular estejam conectados na **mesma rede Wi-Fi**, inicie o aplicativo e escaneie o QR Code com o aplicativo **Expo Go**:
   ```bash
   npx expo start
   ```