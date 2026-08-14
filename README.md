# Quasar App (logingooglewebandroid)

## Install the dependencies

```bash
pnpm install
# or: yarn/npm/bun install
```

### Start the app in development mode (HMR, error reporting, etc.)

```bash
quasar dev
```

### Format & Lint the files

```bash
pnpm run lint
# or: yarn/npm/bun run lint
```

...or just check formatting & linting:

```bash
pnpm run lint:check
# or: yarn/npm/bun run lint:check
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-file).

#PASOS
se agrega capacitor al proyecto de quasar
quasar mode add capacitor

Luego se agrega el plugin
npm install @codetrix-studio/capacitor-google-auth

Paso 4: Obtener las Credenciales en Google Cloud Console
Ve a Google Cloud Console.

Crea un proyecto nuevo.

Configura la Pantalla de consentimiento de OAuth (OAuth consent screen) agregando el alcance (scope) email y profile, dentro del nuevo proyecto, entras a Oauth consent screen y creas un sub proyecto

en acceso a datos, aggrega los permisos:
.../auth/userinfo.email
.../auth/userinfo.profile

en publico vamos agregar los usuarios de prueba.

en el clienteweb, haz clic y en origenes autorizados y url de redireecionamiento agrega [localhost:9000](http://localhost:9000)

Menu clientes
En Credenciales, crea dos identificadores de cliente (Client IDs):

ID de cliente de aplicación web: Copia este ID. Lo usarás como serverClientId y como clientId en la Web.

ID de cliente de Android:

Nombre del paquete: com.esaapp.pruebagoogleauthwebandroid (el mismo que pusiste en Capacitor).

Huella digital SHA-1: Obtén tu SHA-1 de desarrollo ejecutando en la terminal:

En Linux/macOS: keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

En Windows: keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

Paso 5: Configurar Capacitor y Android
A. Archivo src-capacitor/capacitor.config.json
Edita este archivo para registrar el plugin:

JSON
{
"appId": "com.miempresa.googleauth",
"appName": "Quasar Google Auth",
"webDir": "www",
"plugins": {
GoogleAuth: {
"scopes": ["profile", "email"],
"serverClientId": "TU_CLIENT_ID_WEB.apps.googleusercontent.com",
"forceCodeForRefreshToken": true
}
}
}
B. Archivo strings.xml de Android
Compila la app para Android una primera vez para generar la carpeta del proyecto Android:

Bash
quasar build -m capacitor -T android
Luego abre el archivo src-capacitor/android/app/src/main/res/values/strings.xml y añade tu Client ID Web:

XML
<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">Quasar Google Auth</string>
    <string name="title_activity_main">Quasar Google Auth</string>
    <string name="package_name">com.miempresa.googleauth</string>
    <string name="custom_url_scheme">com.miempresa.googleauth</string>

    <!-- Añadir esta línea -->
    <string name="server_client_id">TU_CLIENT_ID_WEB.apps.googleusercontent.com</string>

</resources>

CLIENTE GOOGLE OAUTH
pruebaweb1
ID de cliente
205298612426-934ctufpon5pfhap4sl9rvopf7ios2ra.apps.googleusercontent.com

Secreto del cliente
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

en index.html head he puesto esto
<meta
      name="google-signin-client_id"
      content="205298612426-934ctufpon5pfhap4sl9rvopf7ios2ra.apps.googleusercontent.com"
    />
