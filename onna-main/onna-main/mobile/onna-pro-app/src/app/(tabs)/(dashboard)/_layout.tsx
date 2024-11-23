import { Tabs } from "expo-router"

import { colors } from "@/styles/colors"

import { MaterialIcons } from "@expo/vector-icons"
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen 
            name="articles" 
            options={{ 
                headerShown: false, 
                title: "",
                tabBarIcon: ({ focused, color, size }) => {
                    if(focused){
                        return <MaterialIcons name="article" color={colors.red[900]} size={size} />
                    }
                    return <MaterialIcons name="article" color={colors.black} size={size} />
                }
            }} 
            />
            <Tabs.Screen 
            name="chat" 
            options={{ 
                headerShown: false, 
                title: "",
                tabBarIcon: ({ focused, color, size }) => {
                    if(focused){
                        return <MaterialIcons name="chat" color={colors.red[900]} size={size} />
                    }
                    return <MaterialIcons name="chat" color={colors.black} size={size} />
                }
            }} 
            />
            <Tabs.Screen 
            name="home" 
            options={{ 
                headerShown: false, 
                title: "",
                tabBarIcon: ({ focused, color, size }) => {
                    if(focused){
                        return <MaterialIcons name="home" color={colors.red[900]} size={size} />
                    }
                    return <MaterialIcons name="home" color={colors.black} size={size} />
                }
            }} 
            />
            <Tabs.Screen 
            name="pre_test" 
            options={{ 
                headerShown: false, 
                title: "",
                tabBarIcon: ({ focused, color, size }) => {
                    if(focused){
                        return <MaterialIcons name="group" color={colors.red[900]} size={size} />
                    }
                    return <MaterialIcons name="group" color={colors.black} size={size} />
                }
            }} 
            />
            <Tabs.Screen 
            name="settings" 
            options={{ 
                headerShown: false,
                title: "",
                tabBarIcon: ({ focused, color, size }) => {
                    if(focused){
                        return <MaterialIcons name="settings" color={colors.red[900]}size={size} />
                    }
                    return <MaterialIcons name="settings" color={colors.black} size={size} />
                }
            }} 
            />
        </Tabs>
    )
}