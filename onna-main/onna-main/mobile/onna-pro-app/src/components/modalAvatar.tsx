import React, { useState, useEffect } from "react"
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { TextInputMask } from "react-native-masked-text"

import { MaterialIcons } from "@expo/vector-icons"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

import api from "@/services/api"

// tipagem do modal
type ModalAvatarProps = {
    handleClose: () => void
}

export function ModalAvatar({ handleClose }: ModalAvatarProps) {
    // declaração do async storage
    const { readDataByID, updateDataByID } = useAsyncStorage()

    //hooks
    const [id, setID] = useState<number>(0)
    const [avatar, setAvatar] = useState<string>("")

    useEffect(() => {
        const Load = async () => {
            // id
            const id = await readDataByID("@login", "idTipo_Usuario")
            setID(id)
        }
    
        Load()
      }, [])

    // modificar_Avatar
    const Modificar = async (id: number, avatar: string) => {
        try {
            const res = await api.put("/api/tipoUsuarioA", {
                idTipo_Usuario: id, 
                avatar: avatar
            })

            if(res.status === 200) {
                console.log(res.data)
                await updateDataByID("@login", id, "avatar", avatar)
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
            if(id === 0 && avatar === "") {
                showToast("error", "ERRO", "Preencha todos os campos")
                console.error
                return 
            }

            if(id === 0) {
                showToast("error", "ERRO", "ID inválido")
                console.error
                return 
            }

            if(avatar === "") {
                showToast("error", "ERRO", "Preencha o campo 'Senha'")
                console.error
                return 
            }

            Modificar(id, avatar)
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
                        <Text className="text-[25px] text-left color-davys font-Ibold mb-3" >Novo Avatar</Text>
                        <Pressable onPress={handleClose} >
                            <MaterialIcons name="close" color={colors.davys} size={30} />
                        </Pressable>
                    </View>

                    <TextInputMask style={styles.textInput}
                        type={'only-numbers'}
                        value={avatar}
                        onChangeText={setAvatar}
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

// estilos
const styles = StyleSheet.create({
    textInput: {
        width: "75%",
        height: 50,
        backgroundColor: colors.gray,
        fontSize: 18.75,
        textAlign: "justify",
        color: colors.black,
        fontFamily: fontFamily.Oregular,
        borderRadius: 12.5,
        paddingLeft: 6.25,
        marginBottom: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
