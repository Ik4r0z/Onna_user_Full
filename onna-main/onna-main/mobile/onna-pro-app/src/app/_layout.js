import React, { useEffect } from "react"
import { Stack, Slot, useRouter, useSegments } from "expo-router"

import { colors } from "@/styles/colors"
import "@/styles/global.css"

import { useFonts, Inter_700Bold, Inter_500Medium, Inter_400Regular, Inter_300Light } from "@expo-google-fonts/inter"
import { OpenSans_700Bold, OpenSans_500Medium, OpenSans_400Regular, OpenSans_300Light } from "@expo-google-fonts/open-sans"

import { Loading } from "@/components/loading"
import { AuthContextProvider, useAuth } from "@/context/authContext"

const LayoutMain = () => {
    // hooks    
    const { isAuthenticated } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        // verifica se o usuário está autenticado ou não    
        if (typeof isAuthenticated === "undefined") {
            return
        }

        const inApp = segments[0] == "(tabs)"

        if (isAuthenticated && !inApp) {
            // redirecionar para home
            router.replace("/(dashboard)/chat/")
        } else if (isAuthenticated === false) {
            // redirecionar para login
            router.replace("/")
        }
    }, [isAuthenticated])

    return null
}

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_500Medium,
        Inter_400Regular,
        Inter_300Light,
        OpenSans_700Bold,
        OpenSans_500Medium,
        OpenSans_400Regular,
        OpenSans_300Light
    })

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <AuthContextProvider>
            <LayoutMain />
            <Stack
                screenOptions={{
                    headerTintColor: colors.black,
                    headerShadowVisible: false
                }}
            >
                <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)/login" options={{ title: "", headerStyle: { backgroundColor: "#FCA5A5" } }} />
                <Stack.Screen name="(tabs)/recoveryPassword" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/(dashboard)" options={{ headerShown: false }} />




            
                <Stack.Screen name="(tabs)/password" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />

                <Stack.Screen name="(tabs)/q1" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q2" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q3" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q4" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q5" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q6" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q7" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/q8" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/pos" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/neg" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />

                <Stack.Screen name="(tabs)/symp" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/atividade_fisica" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                <Stack.Screen name="(tabs)/remedios" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />

                <Stack.Screen name="(tabs)/historico" options={{ title: "", headerStyle: { backgroundColor: colors.white } }} />
                
                <Slot />
            </Stack>
        </AuthContextProvider>
    )
}

// temporário
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Layout children must be of type Screen, all other children are ignored"])