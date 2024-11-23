import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

import { Avatar } from "./avatar"

import { formatDate, getRoomId } from "@/utils/common"

import { doc, collection, query, orderBy, onSnapshot } from "firebase/firestore"

import { db } from "../../firebaseConfig"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

export default function ChatItem({ item, router, currentUser }) {
    // async storage
    const { createData, deleteData } = useAsyncStorage()

    const [lastMessage, setLastMessage] = useState(undefined)

    useEffect(() => {
        let roomId = getRoomId(currentUser?.userId, item?.userId)
        const docRef = doc(db, "@rooms", roomId)
        const messagesRef = collection(docRef, "@messages")
        const q = query(messagesRef, orderBy("createdtAt", "desc"))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => doc.data())
            setLastMessage(allMessages[0] ? allMessages[0] : null)
        })

        return unsub
    }, [])

    const openChatRomm = async () => {
        await deleteData("@username")
        await createData("@username", item?.username)
        router.push({ pathname: "/chat/chatRoom", params: { ...item, title: item.username } })
    };

    const renderTime = () => {
        if (lastMessage) {
            let date = lastMessage?.createdtAt
            return formatDate(new Date(date?.seconds * 1000))
        } else {
            return "Time"
        }
    };

    const renderLastMessage = () => {
        if (typeof lastMessage == "undefined") {
            return "Carregando..."
        }
        if (lastMessage) {
            if (currentUser?.userId == lastMessage?.userId) return "Você: " + lastMessage?.text
            return lastMessage?.text
        } else {
            return "Diga olá 👋"
        }
    }

    const avatarUri = item?.profileUrl

    return (
        <View className="w-full bg-white flex-row rounded-full shadow-black shadow-md gap-4 p-4 mt-5">
            <Avatar source={{ uri: avatarUri }} />

            <View className="flex-1">
                <View className="flex-row items-center gap-1">
                    <Text onPress={openChatRomm} className="flex-1 text-[18.75px] font-Imedium text-red-900">{item?.username}</Text>
                    <Text className="text-[12.5px] font-Ilight text-black pr-2">{renderTime()}</Text>
                </View>

                <Text className="text-[12.5px] font-Oregular text-black" numberOfLines={1} lineBreakMode="tail">{renderLastMessage()}</Text>
            </View>
        </View>
    )
}
