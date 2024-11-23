import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, Text, Pressable, StyleSheet } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import { TextInputMask } from "react-native-masked-text"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { useAsyncStorage } from "@/hooks/useAsyncStorage" 
import api from "@/services/api"

import { router } from "expo-router"

export default function Update() {
    // async storage
    const { readDataByID } = useAsyncStorage()

    // hooks
    const [dia, setDia] = useState<string>("")
    const [mes, setMes] = useState<string>("")

    const [id, setID] = useState<number>(0)
    const [data, setData] = useState<string>("")
    const [inicio, setInicio] = useState<string>("")
    const [termino, setTermino] = useState<string>("")

    useEffect(()=>{
        const Load = async () => {
            // datas já inseridas
            showToast("info", "INFORMAÇÃO", "Agendamentos")

            // id do usuario
            const id = await readDataByID("@login", "idTipo_Usuario")
            setID(id)

            // data selecionada
            const data = await readDataByID("@home", "dateString")
            setData(data)

            // dia
            const dia = await readDataByID("@home", "day")
            setDia(dia)

            // mês
            const mes = await readDataByID("@home", "month")
            setMes(mes)
        }

        Load()
    }, [])

    // criar_Disponibilidade
    const Disponibilidade = async (id: number, data: string, inicio: string, termino: string) => {
        try {
            const res = await api.post("/api/disponibilidade", {
                idProfissional: id, 
                data_Disponibilidade: data,
                hora_Inicial: [inicio],
                hora_Final: [termino]
            })

            if(res.status === 200) {
                console.log(res.data)
                router.push("/(dashboard)/home")
            }
        } 
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    // validação e inserção
    const DisponibilidadeHandle = () => {
        try {
            if(id === 0 && data === "" && inicio === "" && termino === "") {
                showToast("error", "ERRO", "Preencha todos os campos")
                console.error
                return 
            }
 
            if(id === 0) {
                showToast("error", "ERRO", "ID inválido")
                console.error
                return 
            }

            if(data === "") {
                showToast("error", "ERRO", "Preencha o campo 'Data'")
                console.error
                return 
            }

            if(inicio === "") {
                showToast("error", "ERRO", "Preencha o campo 'Início'")
                console.error
                return 
            }

            if(termino === "") {
                showToast("error", "ERRO", "Preencha o campo 'Término'")
                console.error
                return 
            }

            Disponibilidade(id, data, inicio, termino)
        }
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray" >   
            <View className="w-full h-full justify-center items-center gap-[50px]" >
                <StatusBar barStyle={"dark-content"} />

                <View className="w-[90%] h-[375px] bg-white justify-center items-center rounded-[25px] gap-[25px] shadow-2xl shadow-black" >

                    <Text className="w-[75%] h-[37.5px] border-solid border-green-800 border-b-[0.5px] text-[18.75px] text-justify color-black font-Oregular rounded-[12.5px] pl-[1.5625px]"> {dia} / {mes} </Text>

                    <TextInputMask style={styles.textInput}
                        type={'datetime'}
                        options={{
                            format: 'HH:mm'
                        }}
                        value={inicio}
                        onChangeText={setInicio}
                        placeholder="Início (HH:mm)"
                        keyboardType="default"
                    />

                    <TextInputMask style={styles.textInput}
                        type={'datetime'}
                        options={{
                            format: 'HH:mm'
                        }}
                        value={termino}
                        onChangeText={setTermino}
                        placeholder="Término (HH:mm)"
                        keyboardType="default"
                    />

                    <Pressable className="w-[50%] h-[50px] bg-green-800 justify-center items-center rounded-[12.5px] shadow-xl shadow-black" onPress={DisponibilidadeHandle} >
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
        borderStyle: "solid",
        borderBottomColor: colors.green[800],
        borderBottomWidth: 0.5,
        fontSize: 18.75,
        textAlign: "justify",
        color: colors.black,
        fontFamily: fontFamily.Oregular,
        borderRadius: 12.5,
        paddingLeft: 6.25,
        marginBottom: 5
    }
})