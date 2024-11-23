import React from "react"
import { KeyboardAvoidingView, ScrollView } from "react-native"

export default function CustomKeyboardView({ children }) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={90}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flex: 1 }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}