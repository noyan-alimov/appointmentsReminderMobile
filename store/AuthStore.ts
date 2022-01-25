import { Session } from '@supabase/supabase-js'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { Alert } from 'react-native'
import { supabase } from '../supabaseClient'

class AuthStore {
    constructor() {
        makeObservable(this, {
            name: observable,
            phoneNumber: observable,
            email: observable,
            password: observable,
            setName: action.bound,
            setPhoneNumber: action.bound,
            setEmail: action.bound,
            setPassword: action.bound,

            session: observable,
            setSession: action.bound,
            isSignInLoading: observable,
            isSignUpLoading: observable,
            signUp: action.bound,
            signIn: action.bound
        })
    }

    name: string = ''
    phoneNumber: string = ''
    email: string = ''
    password: string = ''

    setName(name: string) {
        this.name = name
    }

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    session: Session = supabase.auth.session()
    
    setSession(session: Session) {
        this.session = session
    }

    isSignInLoading: boolean = false
    isSignUpLoading: boolean = false

    async signUp() {
        try {
            runInAction(() => {
                this.isSignUpLoading = true
            })
            const { error, session } = await supabase.auth.signUp({ email: this.email, password: this.password }, {
                data: {
                    name: this.name,
                    phoneNumber: this.phoneNumber
                }
            })
            if (error || !session) {
                Alert.alert(error.message || 'Error signing up')
            } else {
                runInAction(() => {
                    this.session = session
                })
            }
        } catch (error) {
            Alert.alert(error.message || 'Error signing up')
        } finally {
            runInAction(() => {
                this.isSignUpLoading = false
            })
        }
    }

    async signIn() {
        try {
            runInAction(() => {
                this.isSignInLoading = true
            })
            const { error, session } = await supabase.auth.signIn({ email: this.email, password: this.password })
            if (error || !session) {
                Alert.alert(error.message || 'Error signing in')
            } else {
                runInAction(() => {
                    this.session = session
                })
            }
        } catch (error) {
            Alert.alert(error.message || 'Error signing in')
        } finally {
            runInAction(() => {
                this.isSignInLoading = false
            })
        }
    }
}

export const authStore = new AuthStore()