import React, { useState } from "react"
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, Pressable, ScrollView } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import { MaterialIcons } from "@expo/vector-icons"

import { Link } from "expo-router"
import ImageSelector from '@/components/imagemSelector';


export default function Historico() {

    const imagesGroup1 = [
        { id: 1, src: require('@/assets/images/gatoBravo2.png'), },
        { id: 2, src: require('@/assets/images/fadiga3.png') },
        { id: 3, src: require('@/assets/images/vermelho2.png') },
        { id: 4, src: require('@/assets/images/ibuprofeno2.png') },
        { id: 5, src: require('@/assets/images/6h.png') },
        { id: 6, src: require('@/assets/images/cheio2.png') },
        { id: 7, src: require('@/assets/images/sim.png') },
        { id: 8, src: require('@/assets/images/yoga2.png') },
        { id: 9, src: require('@/assets/images/cansada2.png') },

    ];

    // Funções para lidar com o salvamento de cada grupo
    const handleSaveSelection1 = (selectedImage: number | null) => {
        console.log('Seleção do grupo 1:', selectedImage);
        // Aqui você pode salvar no banco de dados ou realizar outra ação
    };

    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const ano = dataAtual.getFullYear();

    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const mesEscrito = meses[dataAtual.getMonth()];

    const dataFormatada = `${dia} de ${mesEscrito} de ${ano}`;

    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);



    return (
        <SafeAreaView className="flex-1 bg-white items-center pl-[10px] pr-[10px] " >
            <View className=" h-[1000px] w-full">

                <View className=" items-center">
                    <Text className="font-Imedium color-slate-600 text-[20px] ml-[5px] font-bold">
                        Verifique seu histórico de registros
                    </Text>

                </View>

                <View className="border-2 border-red-900 h-[200px] items-center mt-[25px] rounded-[20px] ">
                    <View>
                        <Text className="font-Imedium color-slate-600 text-[15px] ml-[5px] font-bold">
                            {dataFormatada}
                        </Text>
                    </View>


                    <View>
                        <ScrollView className="" horizontal showsHorizontalScrollIndicator={true} >
                            <View>
                                <ImageSelector images={imagesGroup1} onSave={handleSaveSelection1} />
                            </View>
                        </ScrollView>
                    </View>
                </View>


                <View className="border-2 border-red-900 h-[200px] items-center mt-[25px] rounded-[20px]">
                    <View>
                        <Text className="font-Imedium color-slate-600 text-[15px] ml-[5px] font-bold">

                        </Text>
                    </View>


                    <View>
                        <Text className="font-Imedium color-slate-500 text-[18.75px] ml-[5px] font-bold mt-[65px]">
                            Esperando por novos registros...
                        </Text>
                    </View>


                </View>



            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})