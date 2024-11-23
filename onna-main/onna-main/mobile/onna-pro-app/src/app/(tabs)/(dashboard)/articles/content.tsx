import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, ScrollView, Text} from "react-native"

import { useAsyncStorage } from "@/hooks/useAsyncStorage" 

export default function Content() {
    // async storage
    const { readData } = useAsyncStorage()

    // hooks
    const [title, setTitle] = useState<string>("") 
    const [content, setContent] = useState<string>("")
    const [resource, setResource] = useState<string>("")
    const [date, setDate] = useState<string>("")

    useEffect(()=>{
        const Load = async () => {
            // artigo selecionado
            const data = await readData("@article")

            setTitle(data[0])
            setContent(data[1])
            setResource(data[2])
            setDate(data[3])
        }
        Load()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-gray" >   
            <View className="w-full h-full justify-center items-center gap-[25px]" >
                <StatusBar barStyle={"dark-content"} />

                <View className="w-[90%] gap-[50px]" >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <View className="w-full flex-col m-1" >
                            <Text className="text-[31.25px] text-justify font-Ibold text-red-900 gap-[25px] border-solid border-black border-b-[1px] p-1" >{title}</Text>
                            <Text className="text-[15.625px] text-justify font-Obold text-black p-1 pt-3" >{date}</Text>
                        </View>
                        <Text className="text-[18.75px] text-justify font-Oregular text-black ml-1 mt-5 mb-5 p-1 pb-3 border-solid border-black border-b-[1px]" >{content}</Text>

                        <Text className="text-[15.625px] text-justify font-bold text-black p-1 mb-5" >Fonte: {resource}</Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}