import React, { useState } from "react"
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, Pressable } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import { MaterialIcons } from "@expo/vector-icons"

import { Link } from "expo-router"



export default function Q1() {


    return (
        <SafeAreaView className="flex-1 bg-white items-center pl-[10px] pr-[10px]" >
            <View className=" ">

                <Text className="mt-[120px] text-[17.75px] color-black font-Imedium text-center" >
                    Você teve relações sexuais sem uso de métodos contraceptivos nos últimos 2 meses?
                </Text>
            </View>


            <View>
                <Image className="w-[350px] h-[350.5px]"
                    source={require("@/assets/images/condom.png")}
                />
            </View>


            <View>
                <View className="w-[75%] h-[50px] flex-row justify-around items-center gap-[1px]" >
                    <Pressable className="w-[45%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px] border-red-500 border-[2px]" >
                        <Link href={"../q2"} >
                            <Text className="text-[18.75px] color-white font-Imedium" >Sim</Text>
                        </Link>
                    </Pressable>

                    <Pressable className="w-[45%] h-[50px] bg-red-500 border-solid border-red-500 border-[2px] justify-center items-center rounded-[12.5px]" >
                        <Link href={"../q2"}>
                            <Text className="text-[18.75px] color-white font-Imedium" >Não</Text>
                        </Link>
                    </Pressable>


                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})