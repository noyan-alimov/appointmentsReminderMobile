import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wlqhugksgdsnixjqajub.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQzMTA4MDg4LCJleHAiOjE5NTg2ODQwODh9.Vi2JFOWf9nIpv6h_WKskobD7SQAsrZXq50lp6Cpq2yw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage as any
})