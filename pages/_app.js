import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';

import { store } from "../store/store";
import { Provider } from "react-redux";
import { ContactsProvider } from '../context/ContactsProvider';
import { ConversationsProvider } from '../context/ConversationsProvider';
import { SocketProvider } from '../context/SocketProvider';

function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ContactsProvider>
          <SocketProvider username={session?.user?.email}>
            <ConversationsProvider>
              <Component {...pageProps} />
            </ConversationsProvider>
          </SocketProvider>
        </ContactsProvider>
      </Provider>
    </SessionProvider>
  )
}

export default App
