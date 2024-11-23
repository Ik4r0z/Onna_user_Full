import { createContext, useState, useEffect, useContext } from "react"

import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

import { auth, db } from "../../firebaseConfig"

import { doc, getDoc, setDoc } from "firebase/firestore"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    // hooks
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log("user:", user)
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            }
            else{
                setIsAuthenticated(false)
                setUser(null)
            }
        })

        return unsub
    }, []) 

    // update
    const updateUserData = async (userId) => {
        const docRef = doc(db, "@users", userId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            let data = docSnap.data()
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId })
        }
    }

    // login
    const login = async (email, password) => {
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            return {success: true}
        }
        catch(error){
            return {success: false, msg: error.message}
        }
    }

    // logout
    const logout = async () => {
        try{
            await signOut(auth)
            return {success: true}
        }
        catch(error){
            return {success: false, msg: error.message, error: error}
        }
    }

    // register
    const register = async (email, password, username, profileUrl) => {
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log("res.user :", res?.user)

            // setUser(res?.user)
            // setIsAuthenticated(true)

            await setDoc(doc(db, "@users", res?.user?.uid), {
                username,
                profileUrl,
                userId: res?.user?.uid
            })

            return {success: true, data: res?.user}
        }
        catch(error){
            return {success: false, msg: error.message}
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if(!value){
        throw new Error("useAuth deve ser encapsulado dentro de AuthContextProvider")
    }

    return value
}