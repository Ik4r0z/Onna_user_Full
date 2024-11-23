import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, Pressable, Text, Modal } from "react-native"

import { ModalProfile } from "@/components/modalProfile"
import { ModalAvatar } from "@/components/modalAvatar"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { Avatar } from "@/components/avatar"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

import api from "@/services/api"

import { avatarUrl } from "@/utils/avatar"

export default function Profile() {
   // async storage
   const { readDataByID } = useAsyncStorage()

   // hooks
   const [id, setID] = useState<number>(0)
   const [nome, setNome] = useState<string>("")
   const [dataNasc, setDataNasc] = useState<string>("")
   const [email, setEmail] = useState<string>("")
   const [area, setArea] = useState<string>("")
   const [avatar, setAvatar] = useState<string>("")
   const [modalVisibleP, setModalVisibleP] = useState<boolean>(false) // modal profile
   const [modalVisibleA, setModalVisibleA] = useState<boolean>(false) // modal avatar
   const [modalClosed, setModalClosed] = useState<boolean>(false) // monitorar modal

   useEffect(() => {
    const Load = async () => {
      try {
        showToast("info", "Avatar", "Experimente do 1 ao 8!")

        // id
        const id = await readDataByID("@login", "idTipo_Usuario")
        setID(id)

        // nome
        const nome = await readDataByID("@login", "nome")
        setNome(nome)

        // dataNasc
        const dataNasc = await readDataByID("@login", "Data de nascimento")
        setDataNasc(dataNasc)

        // email
        const email = await readDataByID("@login", "email")
        setEmail(email)

        // avatar
        const avatar = await readDataByID("@login", "avatar")
        setAvatar(avatar)
        console.log(avatar)

        if (id !== null) {
            const res = await api.get(`/api/perfilProfissional/${id}`)

            if (res.status === 200) {
                setArea(res.data.area_Formacao)
            }
        }
      } 
      catch (error) {
        showToast("error", "ERRO", "" + error)
        console.error(error)
      }
    }

    Load()
  }, [modalClosed]) 

    const ModalVisibilityP = () => {
        setModalVisibleP(true)
    }

    const ModalVisibilityA = () => {
        setModalVisibleA(true)
    }

    const handleCloseProfileModal = () => {
        setModalVisibleP(false)
        setModalClosed(true)
    }

    const handleCloseAvatarModal = () => {
        setModalVisibleA(false)
        setModalClosed(true)
    }

    return (
        <SafeAreaView className="flex-1 bg-gray" >   
            <View className="w-full h-full justify-center items-center gap-[18.75px]" >
                <StatusBar barStyle={"dark-content"} />

                    <Avatar source={{ uri: avatarUrl[String(avatar)] }} size={"large"} />

                    <Pressable className="w-[45%] h-[45px] bg-white justify-center items-center rounded-full shadow-md shadow-black" onPress={ModalVisibilityA}  >
                        <Text className="text-[15.625px] color-black font-Imedium" >Definir Foto de Perfil</Text>
                    </Pressable>

                    <Text className="w-[90%] text-[25px] text-center color-dark font-Ibold mt-[5px] mb-[5px]" >Minhas Informações</Text>

                    <View className="w-[80%] h-[37.5%] bg-white justify-center items-center gap-[25px] rounded-[18.75px] shadow-md shadow-black" >
                        <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Imedium" >Nome:
                            <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Ilight" numberOfLines={1} lineBreakMode="tail" > {nome}</Text>
                        </Text>
                        <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Imedium" numberOfLines={1} lineBreakMode="tail" >DataNasc:
                            <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Ilight" numberOfLines={1} lineBreakMode="tail" > {dataNasc}</Text>
                        </Text>
                        <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Imedium" numberOfLines={1} lineBreakMode="tail" >Email:
                            <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Ilight" > {email}</Text>
                        </Text>
                        
                        <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Imedium" numberOfLines={1} lineBreakMode="tail" >Senha:
                            <Text className="w-[75%] text-[15.625px] text-left border-solid border-black border-b-[0.5px] color-black font-Ilight" numberOfLines={1} lineBreakMode="tail" > **********</Text>
                        </Text>
                    </View>

                    <Pressable className="w-[50%] h-[50px] bg-white justify-center items-center rounded-full shadow-md shadow-black" onPress={ModalVisibilityP} >
                        <Text className="text-[18.75px] color-black font-Imedium" >Alterar Senha</Text>
                    </Pressable>

                    <Modal visible={modalVisibleP} animationType="fade" transparent={true} > 
                        <ModalProfile handleClose={handleCloseProfileModal} />
                    </Modal>

                    <Modal visible={modalVisibleA} animationType="fade" transparent={true} > 
                        <ModalAvatar handleClose={handleCloseAvatarModal} />
                    </Modal>
            </View>
            <Toast />
        </SafeAreaView>
    )
}
