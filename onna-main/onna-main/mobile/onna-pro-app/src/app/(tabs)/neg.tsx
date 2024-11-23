import React, { useState } from "react"
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, Pressable } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import { MaterialIcons } from "@expo/vector-icons"

import { Link } from "expo-router"



export default function Neg() {


    return (
        <SafeAreaView className="flex-1 bg-gray items-center pl-[7.5px] pr-[7.5px]" >
            <View className=" ">

                <Text className="mt-[30px] text-[35.75px] color-red-900 font-Imedium text-center" >
                    Teste de gravidez rápido
                </Text>


                <View className=" pl-[7.5px] pr-[7.5px] mt-10 w-[385px] h-[10.75%] bg-white items-center flex-column justify-center  rounded-[15px] gap-4 shadow-black shadow-2xl">
                    <Text className="color-black text-[20.75px] font-Imedium text-center">Possível resultado:
                        <Text className="color-red-900 font-Imedium text-center text-[20.75px] font-bold "> Negativo </Text>
                    </Text>
                </View>

                <View className=" mt-10 w-[385px] h-[18.75%] bg-white flex-column justify-center items-center rounded-[15px] gap-4 shadow-black shadow-2xl" >
                    <Text className="color-black text-[18.75px] font-Imedium text-center">
                        Com base nas suas respostas, <Text className="color-red-900 font-Imedium text-center text-[20.75px] font-bold " >é improvável que você esteja grávida.</Text> Alterações no ciclo menstrual podem estar relacionadas a outros fatores.
                    </Text>
                </View>


                <View className=" mt-10 w-[385px] h-[29%] bg-white flex-column justify-center items-center rounded-[15px] gap-4 shadow-black shadow-2xl">
                    <Text className=" color-red-900 text-[20.75px] font-Imedium text-center font-bold"> AVISO! </Text>

                    <View className="">
                        <Text className="color-black text-[18.75px] font-Imedium text-center">
                            Lembre-se: este resultado não substitui os testes realizados em farmácia. Em caso de suspeita de gravidez, consulte um médico para confirmação e orientação.
                        </Text>
                    </View>
                </View>
            </View>


            <View className="items-center mt-[20px]">
                <Pressable className="w-[70%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px] border-red-500 border-[2px]" >
                    <Link href={"../q8"} >
                        <Text className="text-[18.75px] color-white font-Imedium text-center" >Voltar</Text>
                    </Link>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}
