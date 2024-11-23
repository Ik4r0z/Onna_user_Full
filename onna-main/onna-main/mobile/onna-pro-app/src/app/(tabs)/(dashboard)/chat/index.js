import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, View, Pressable, ActivityIndicator } from "react-native"

import { colors } from "@/styles/colors"
import { MaterialIcons } from "@expo/vector-icons"

import { Input } from "@/components/input"
import ChatList from "@/components/ChatList"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { useAuth } from "@/context/authContext"

import { getDocs, query, where } from "firebase/firestore"

import { usersRef } from "../../../../../firebaseConfig"

export default function Chat() {
    // hooks
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        console.log("useEffect executed")
        console.log("Current user state:", user)
        if (user === undefined) {
            console.log("User is still loading")
        } else if (user?.uid) {
            console.log("User UID found, calling getUsers()")
            setLoadingUser(false)
            getUsers()
        } else {
            console.log("User not defined or missing UID")
        }
    }, [user])

    const getUsers = async () => {
        console.log("getUsers function executed")
        const q = query(usersRef, where("userId", "!=", user?.uid))

        try {
            const querySnapShot = await getDocs(q);
            console.log("Query executed, result size:", querySnapShot.size)
            let data = []
            querySnapShot.forEach(doc => {
                console.log("Document data:", doc.data())
                data.push({ ...doc.data() })
            })

            setUsers(data)
            console.log("Users set to state:", data)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    };

    if (loadingUser) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray">
            <View className="w-full h-full justify-center items-center gap-[50px]">
                <StatusBar barStyle={"dark-content"} />

                <View className="flex-1 pt-14 p-4">
                    <Input>
                        <Pressable>
                            <MaterialIcons name="search" color={colors.davys} size={25} />
                        </Pressable>
                        <Input.Field placeholder="Pesquisar..." />
                    </Input>

                    {
                        users.length > 0 ? (
                            <ChatList currentUser={user} users={users} />
                        ) : (
                            <View className="flex items-center top-10">
                                <ActivityIndicator size={"large"} />
                            </View>
                        )
                    }
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    );
}
