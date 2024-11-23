import React, { useState, useEffect } from "react"
import { SafeAreaView, View, Text, TextInput, Pressable } from "react-native"

import { colors } from "@/styles/colors"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { MaterialIcons } from "@expo/vector-icons"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

import api from "@/services/api"

// tipagem do modal
type ModalProfileProps = {
    handleClose: () => void
}

export function ModalProfile({ handleClose }: ModalProfileProps) {
   // declaração do async storage
   const { readDataByID, updateDataByID } = useAsyncStorage()

    //hooks
    const [id, setID] = useState<number>(0)
    const [senha, setSenha] = useState<string>("")

    useEffect(() => {
        const Load = async () => {
            // id
            const id = await readDataByID("@login", "idTipo_Usuario")
            setID(id)
        }
    
        Load()
      }, [])

    // modificar_Senha
    const Modificar = async (id: number, senha: string) => {
        try {
            const res = await api.put("/api/tipoUsuarioS", {
                idTipo_Usuario: id, 
                senha: senha
            })

            if(res.status === 200) {
                console.log(res.data)
                await updateDataByID("@login", id, "senha", senha)
                handleClose()
            }
        } 
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    // validação e inserção
    const ModificarHandle = () => {
        try {
            if(id === 0 && senha === "") {
                showToast("error", "ERRO", "Preencha todos os campos")
                console.error
                return 
            }

            if(id === 0) {
                showToast("error", "ERRO", "ID inválido")
                console.error
                return 
            }

            if(senha === "") {
                showToast("error", "ERRO", "Preencha o campo 'Senha'")
                console.error
                return 
            }

            Modificar(id, senha)
        }
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-black/50 opacity-1" >
            <View className="w-full h-full items-center justify-center" >
                <View className="w-[75%] bg-white opacity-3 pt-12 pb-12 rounded-2xl items-center justify-center gap-[18.75px]" >
                    <View className="w-[75%] p-1 flex-row justify-between" >
                        <Text className="text-[25px] text-left color-davys font-Ibold mb-3" >Nova Senha</Text>
                        <Pressable onPress={handleClose} >
                            <MaterialIcons name="close" color={colors.davys} size={30} />
                        </Pressable>
                    </View>

                    <TextInput className="w-[75%] h-[50px] bg-gray text-[18.75px] text-justify color-black font-Oregular rounded-xl pl-[6.25px] mb-[10px] shadow-lg shadow-black"
                        placeholder=""
                        keyboardType="default"
                        onChangeText={setSenha}
                        value={senha}
                    />

                    <Pressable className="w-[50%] h-[50px] bg-red-500 justify-center items-center rounded-full shadow-md shadow-black" onPress={ModificarHandle} >
                        <Text className="text-[18.75px] color-white font-Imedium" >Salvar</Text>
                    </Pressable>
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    )
}
