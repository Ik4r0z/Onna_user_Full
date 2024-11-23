import React, { useState } from "react"
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, ScrollView, Pressable, TouchableOpacity } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"

import { MaterialIcons } from "@expo/vector-icons"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Link } from "expo-router"

import ImageSelector from '@/components/imagemSelector';





export default function Atividade_fisica() {
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

    const handleSelectImage = (id: number) => {
        setSelectedImageId(id);
        alert(`Imagem selecionada: ${id}`);
    };

    const imagesGroup1 = [
        { id: 1, src: require('@/assets/images/sim.png'), },
        { id: 2, src: require('@/assets/images/nao.png') }

    ];

    const imagesGroup2 = [
        { id: 1, src: require('@/assets/images/corrida2.png') },
        { id: 2, src: require('@/assets/images/yoga2.png') },
        { id: 3, src: require('@/assets/images/pedalar2.png') },
        { id: 4, src: require('@/assets/images/outro2.png') },
    ];

    const imagesGroup3 = [
        { id: 1, src: require('@/assets/images/disposta2.png') },
        { id: 2, src: require('@/assets/images/cansada2.png') },
        { id: 3, src: require('@/assets/images/naosabe2.png') }

    ];


    // Funções para lidar com o salvamento de cada grupo
    const handleSaveSelection1 = (selectedImage: number | null) => {
        console.log('Seleção do grupo 1:', selectedImage);
        // Aqui você pode salvar no banco de dados ou realizar outra ação
    };

    const handleSaveSelection2 = (selectedImage: number | null) => {
        console.log('Seleção do grupo 2:', selectedImage);
        // Aqui você pode salvar no banco de dados ou realizar outra ação
    };

    const handleSaveSelection3 = (selectedImage: number | null) => {
        console.log('Seleção do grupo 3:', selectedImage);
        // Aqui você pode salvar no banco de dados ou realizar outra ação
    };


    return (
        <SafeAreaView className="flex-1 bg-white" >
            <ScrollView>
                <View>
                    <View>
                        <View className="items-center">
                            <Text className="font-Imedium color-red-900 text-[28.75px] ml-[5px] font-bold">
                                Hoje
                            </Text>
                        </View>


                        <View className="items-center mb-[20px]">
                            <Text className="font-Imedium color-slate-600 text-[15px] ml-[5px] font-bold">
                                {dataFormatada}
                            </Text>
                        </View>

                        <View className="ml-[10px] mb-[20px]">
                            <Text className="font-Imedium color-slate-600 text-[18.75px] ml-[5px]">
                                Categorias
                            </Text>
                        </View>





                        <View className="border-2 border-red-900 h-[250px] ml-[10px] mr-[10px] rounded-[25px]">

                            <View>
                                <Text className="text-center color-slate-700 text-[17.75px] mt-[20px]">
                                    Você realizou alguma atividade física?
                                </Text>

                                <View className="items-center">
                                    <ScrollView className="" horizontal showsHorizontalScrollIndicator={true} >
                                        <View>
                                            <ImageSelector images={imagesGroup1} onSave={handleSaveSelection1} />
                                        </View>
                                    </ScrollView>
                                </View>

                            </View>

                        </View>


                        <View className="border-2 border-red-900 h-[250px] ml-[10px] mr-[10px] rounded-[25px] mt-[10px]">

                            <View>
                                <Text className="text-center color-slate-700 text-[17.75px] mt-[20px]">
                                    De quantas em quantas horas você deve tomar remédio?
                                </Text>

                                <ScrollView className="" horizontal showsHorizontalScrollIndicator={true} >
                                    <View>
                                        <ImageSelector images={imagesGroup2} onSave={handleSaveSelection2} />
                                    </View>
                                </ScrollView>

                            </View>

                        </View>


                        <View className="border-2 border-red-900 h-[250px] ml-[10px] mr-[10px] rounded-[25px] mt-[10px]">

                            <View>
                                <Text className="text-center color-slate-700 text-[17.75px] mt-[20px]">
                                    Quantos mls de água você tomou hoje?
                                </Text>

                                <ScrollView className="" horizontal showsHorizontalScrollIndicator={true} >
                                    <View>
                                        <ImageSelector images={imagesGroup3} onSave={handleSaveSelection3} />
                                    </View>
                                </ScrollView>

                            </View>

                        </View>

                        <View className="items-center mt-[20px] h-[100px]">
                            <Pressable className="w-[45%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px]">
                                <Text className="color-white">
                                    Salvar Registro
                                </Text>
                            </Pressable>

                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({



})