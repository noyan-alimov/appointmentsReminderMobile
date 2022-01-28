import { Session } from '@supabase/supabase-js'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { Alert } from 'react-native'
import { TimezoneType } from '../models'
import { SignInSchema, SignUpSchema } from '../schemaValidation'
import { supabase } from '../supabaseClient'
import { parsePhoneNumber, validatePhoneNumber } from '../utils'

class AuthStore {
    constructor() {
        makeObservable(this, {
            name: observable,
            phoneNumber: observable,
            timezone: observable,
            email: observable,
            password: observable,
            setName: action.bound,
            setPhoneNumber: action.bound,
            setTimezone: action.bound,
            setEmail: action.bound,
            setPassword: action.bound,

            session: observable,
            setSession: action.bound,
            isSignInLoading: observable,
            isSignUpLoading: observable,
            signUp: action.bound,
            signIn: action.bound,

            isUpdateUserMetadataLoading: observable,
            editUserMetadata: action,

            isSignOutLoading: observable,
            signOut: action.bound
        })
    }

    name: string = ''
    phoneNumber: string = ''
    timezone: TimezoneType | null = null
    email: string = ''
    password: string = ''

    setName(name: string) {
        this.name = name
    }

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber
    }

    setTimezone(timezone: TimezoneType) {
        this.timezone = timezone
    }

    setEmail(email: string) {
        this.email = email
    }

    setPassword(password: string) {
        this.password = password
    }

    session: Session | null = supabase.auth.session()
    
    setSession(session: Session | null) {
        this.session = session
    }

    isSignInLoading: boolean = false
    isSignUpLoading: boolean = false

    async signUp() {
        const parsedPhoneNumber = parsePhoneNumber(this.phoneNumber)
        try {
            validatePhoneNumber(parsedPhoneNumber)
            SignUpSchema.parse({
                email: this.email,
                password: this.password,
                name: this.name,
                phoneNumber: parsedPhoneNumber,
                timezone: this.timezone
            })
        } catch (error) {
            Alert.alert('Invalid user input', (error as Error).message)
            return
        }

        runInAction(() => {
            this.isSignUpLoading = true
        })
        const { error, session } = await supabase.auth.signUp({ email: this.email, password: this.password }, {
            data: {
                name: this.name,
                phoneNumber: parsedPhoneNumber,
                timezone: this.timezone
            }
        })
        if (error || !session) {
            Alert.alert(error?.message || 'Error signing up')
        } else {
            runInAction(() => {
                this.session = session
            })
        }
        runInAction(() => {
            this.isSignUpLoading = false
        })
    }

    async signIn() {
        try {
            await SignInSchema.parseAsync({
                email: this.email,
                password: this.password
            })
        } catch (error) {
            Alert.alert('Invalid user input', (error as Error).message)
            return
        }

        runInAction(() => {
            this.isSignInLoading = true
        })
        const { error, session } = await supabase.auth.signIn({ email: this.email, password: this.password })
        if (error || !session) {
            Alert.alert(error?.message || 'Error signing in')
        } else {
            runInAction(() => {
                this.session = session
            })
        }
        runInAction(() => {
            this.isSignInLoading = false
        })
    }

    isUpdateUserMetadataLoading: boolean = false

    async editUserMetadata(name: string, phoneNumber: string, timezone: TimezoneType) {
        runInAction(() => {
            this.isUpdateUserMetadataLoading = true
        })
        const { error } = await supabase.auth.update({ data: { name, phoneNumber, timezone } })
        if (error) {
            Alert.alert(error.message || 'Error updating user metadata')
        }
        Alert.alert('Saved Profile successfully')
        runInAction(() => {
            this.isUpdateUserMetadataLoading = false
        })
    }

    isSignOutLoading: boolean = false

    async signOut() {
        runInAction(() => {
            this.isSignOutLoading = true
        })
        await supabase.auth.signOut()
        runInAction(() => {
            this.isSignOutLoading = false
        })
    }
}

export const authStore = new AuthStore()