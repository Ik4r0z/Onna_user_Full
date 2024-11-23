import { ActivityIndicator } from "react-native"

export function Loading() {
    return (
        <ActivityIndicator className="flex-1 w-full h-full justify-center items-center bg-white" />
    )
}