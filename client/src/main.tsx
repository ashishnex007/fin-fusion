import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {NextUIProvider} from "@nextui-org/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId = "222262057532-1s4prc4esjcl3o9653g922r52hpj3jc3.apps.googleusercontent.com";
const clientId = "222262057532-1s4prc4esjcl3o9653g922r52hpj3jc3.apps.googleusercontent.com";
// const clientId = "6963777585-s2r7n5hqvsrv12vmu7pnhlnunuf08bqd.apps.googleusercontent.com ";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
    <NextUIProvider>
          <App />
    </NextUIProvider>
      </GoogleOAuthProvider>
  </StrictMode>,
)
