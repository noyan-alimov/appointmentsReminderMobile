import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import { Navigation } from './navigation'
import { SignInScreen } from './screens/SignInScreen'
import { authStore } from './store/AuthStore'
import { supabase } from './supabaseClient'

const App = observer(() => {
  const isLoadingComplete = useCachedResources()

  useEffect(() => {
    const listener = supabase.auth.onAuthStateChange((_, session) => authStore.setSession(session))
    return () => listener.data.unsubscribe()
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        {authStore.session ? <Navigation /> : <SignInScreen />}
        <StatusBar />
      </SafeAreaProvider>
    )
  }
})

export default App