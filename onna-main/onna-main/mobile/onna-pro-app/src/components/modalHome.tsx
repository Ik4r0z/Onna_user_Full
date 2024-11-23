import React, { useState, useEffect } from "react"
import { SafeAreaView, View, Text, Pressable, ScrollView } from "react-native"

import { colors } from "@/styles/colors"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { MaterialIcons } from "@expo/vector-icons"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

import api from "@/services/api"

// tipagem do modal
type ModalHomeProps = {
    handleClose: () => void;
}

export function ModalHome({ handleClose }: ModalHomeProps) {
    // async storage
    const { readDataByID } = useAsyncStorage()

    // hooks
    const [id, setID] = useState<number>(0)
    const [disponibilidade, setDispoinibilidade] = useState<Array<any>>([])

    useEffect(() => {
        const Load = async () => {
            try {
                // id
                const id = await readDataByID("@login", "idTipo_Usuario")
                setID(id)

                if (id !== null) {
                    const res = await api.get(`/api/disponibilidade/${id}`)

                    if (res.status === 200) {
                        setDispoinibilidade(res.data)

                        if (res.data.length === 0) {
                            showToast("info", "INFORMAÇÃO", "Nenhuma data encontrada")
                        }
                    }
                }
            } catch (error) {
                showToast("info", "INFORMAÇÃO", "Nenhuma data encontrada")
                console.log(error)
            }
        }

        Load()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-black/50 opacity-1">
            <View className="w-full h-full items-center justify-center">
                <View className="w-[90%] bg-white opacity-3 pt-12 pb-12 rounded-2xl items-center justify-center gap-[18.75px]">
                    <View className="w-[80%] p-1 flex-row justify-between">
                        <Text className="text-[25px] text-left color-davys font-Ibold mb-3">Agendamentos</Text>
                        <Pressable onPress={handleClose}>
                            <MaterialIcons name="close" color={colors.davys} size={30} />
                        </Pressable>
                    </View>

                    <ScrollView className="w-[80%] h-[200px] bg-gray text-[18.75px] color-black font-Oregular rounded-xl pl-5 mb-[10px] shadow-lg shadow-black p-5">
                        {disponibilidade.map((item, index) => (
                            <Text key={index} className="text-[15.625px] color-black font-Oregular mb-2">
                                <Text className="font-Obold">Data:</Text> {item.data_Disponibilidade}{"\n"}
                                <Text className="font-Obold">Hora Inicial:</Text> {item.hora_Inicial}{"\n"}
                                <Text className="font-Obold">Hora Final:</Text> {item.hora_Final}{"\n"}
                                <Text className="font-Obold">______________________________</Text>{"\n"}
                            </Text>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    )
}
