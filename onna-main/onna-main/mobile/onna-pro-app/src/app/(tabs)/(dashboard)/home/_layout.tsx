import { Stack } from "expo-router"

import { colors } from "@/styles/colors"

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: colors.black,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="update" options={{ title: "", headerStyle: { backgroundColor: colors.gray } }} />
        </Stack>
    )
}