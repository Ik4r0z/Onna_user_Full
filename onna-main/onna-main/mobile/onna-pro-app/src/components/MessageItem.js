import React from "react"
import { View, Text } from "react-native"

export default function MessageItem({ message, currentUser }) {
    if(currentUser?.userId == message?.userId){
        // mensagem do usuário logado
        return (
            <View className="flex-row justify-end mb-3 mr-3" >
                <View className="w-[80%]" >
                    <View className="flex self-end p-3 rounded-3xl bg-white" >
                        <Text className="text-lg" >
                            {message?.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    else{
        return (
            <View className="w-[80%] ml-3 mb-3" >
                <View className="flex self-start p-3 px-4 rounded-3xl bg-red-300" >
                    <Text className="text-lg" >
                        {message?.text}
                    </Text>
                </View>
            </View>
        )
    }
}