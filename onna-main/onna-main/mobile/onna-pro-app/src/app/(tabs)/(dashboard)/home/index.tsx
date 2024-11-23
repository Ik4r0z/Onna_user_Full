import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, ScrollView, Modal, TouchableOpacity, Pressable } from "react-native"

import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/fontFamily"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { MaterialIcons } from "@expo/vector-icons"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Avatar } from "@/components/avatar"

import Toast from 'react-native-toast-message'
import { showToast } from "@/components/toast"

import { Calendar, DateData, LocaleConfig } from "react-native-calendars"

import { ptBR } from "@/utils/localeCalendarConfig"

import { Link } from "expo-router"

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

import { useAuth } from "@/context/authContext"
import { useAsyncStorage } from "@/hooks/useAsyncStorage"
import { avatarUrl } from "@/utils/avatar"


export default function Home() {
    // idioma do calendário
    LocaleConfig.locales["pt-br"] = ptBR
    LocaleConfig.defaultLocale = "pt-br"


    // async storage
    const { createData, readDataByID, deleteData } = useAsyncStorage()

    // hooks
    const { logout } = useAuth()
    const [day, setDay] = useState<DateData>() // calendário
    const [nome, setNome] = useState<string>("")
    const [id, setID] = useState<number>(0)
    const [avatar, setAvatar] = useState<string>("")
    const [diaMarcado, setDiaMarcado] = useState<string>("")


    useEffect(() => {
        const Load = async () => {
            // confirmação do login
            showToast("info", "HOME", "")

            // excluir @home
            await deleteData("@home")

            // nome do usuário
            const nome = await readDataByID("@login", "nome")
            setNome(nome)

            // avatar
            const avatar = await readDataByID("@login", "avatar")
            setAvatar(avatar)

            // id
            const id = await readDataByID("@login", "idTipo_Usuario")
            setID(id)
        }

        Load()
    }, [])

    // logout
    const logoutHandle = async () => {
        await logout()
    }


    const handleEndDatePress = (day: DateData) => {
        setSelectedEndDate(day.dateString);
    };

    useEffect(() => {
        // Mostra o Toast ao carregar a tela
        Toast.show({
            type: 'success', // Tipos: 'success', 'error', 'info'
            text1: 'Bem-vinda!',
            text2: 'Login efetuado com sucesso',
        });
    }, []); // Executa apenas ao montar o componente

    const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked?: boolean; customStyles?: any } }>({});
    const [isModalVisible, setModalVisible] = useState(false);

    const handleDayPress = (day: DateData) => {
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        setModalVisible(true);
    };

    const handleRegisterCycle = () => {
        if (selectedStartDate && selectedEndDate) {
            const cycleDates = calculateCycleDates(selectedStartDate, selectedEndDate);
            const ovulationDay = calculateOvulationDay(selectedStartDate);

            const newMarkedDates = {
                ...cycleDates,
                [ovulationDay]: {
                    marked: true,
                    dotColor: '#fff',
                    customStyles: {
                        container: { backgroundColor: '#fff' },
                        text: { color: '#fff' },
                    },
                },
            };
            setMarkedDates(newMarkedDates);
            setModalVisible(false);
        }
    };

    const calculateCycleDates = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const dates: { [key: string]: { marked?: boolean; customStyles?: any } } = {};

        while (startDate <= endDate) {
            const dateString = startDate.toISOString().split('T')[0];
            dates[dateString] = {
                marked: true,
                customStyles: {
                    container: { backgroundColor: '#EF4444' },
                    text: { color: 'white' },
                },
            };
            startDate.setDate(startDate.getDate() + 1);
        }

        return dates;
    };

    const calculateOvulationDay = (start: string) => {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + 14);
        return startDate.toISOString().split('T')[0];
    };


    return (
        <SafeAreaView className=" bg-gray" >
            <ScrollView className="mt[-200px]">
                <View className="w-full  justify-center items-center gap-[75px]" style={styles.ContainerGlobal}>
                    <StatusBar barStyle={"dark-content"} />

                    <View className="w-[90%] h-[75px] bg-white rounded-full flex-row justify-between items-center p-4 shadow-xl shadow-black" >
                        <Text className="text-[18.75px] color-black font-Imedium" >Olá,
                            <Text className="text-[18.75px] color-red-900 font-Imedium" > {nome} </Text>
                        </Text>
                        <Avatar source={{ uri: avatarUrl[String(avatar)] }} size={"small"} />
                    </View>

                    <View className="w-[90%] max-h-[50%] bg-white rounded-[25px] gap-[12.5px] shadow-black shadow-2xl" >
                        <Calendar
                            style={styles.calendar}
                            renderArrow={(direction: "right" | "left") => (
                                <MaterialIcons name={`chevron-${direction}`} color={colors.black} size={18.75} />)}
                            headerStyle={{
                                paddingBottom: 1,
                                marginBottom: 1
                            }}
                            theme={{
                                textMonthFontSize: 25,
                                textDayFontSize: 12.5,
                                monthTextColor: colors.red[900],
                                todayTextColor: colors.red[900],
                                selectedDayBackgroundColor: colors.red[900],
                                selectedDayTextColor: colors.white,
                                arrowColor: colors.black,
                                calendarBackground: "transparent",
                                textDayStyle: { color: colors.black },
                                textDisabledColor: colors.green[400],
                                arrowStyle: {
                                    margin: 0,
                                    padding: 0
                                },
                                textMonthFontFamily: fontFamily.Imedium,
                                textDayFontFamily: fontFamily.Oregular
                            }}
                            minDate={new Date().toDateString()}
                            onDayPress={handleDayPress}
                            markedDates={markedDates}
                            markingType={'custom'}

                        />


                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            animationType="slide" // ou "fade" para uma transição diferente
                        >

                            <View className="flex-1" style={styles.Back}>
                                <View className="" style={styles.modalContent2} >
                                    <Text className="text-[18.75px]  font-Imedium">
                                        Data Inicial: {selectedStartDate || 'Não selecionada'}
                                    </Text>
                                    <Text className="text-[17.75px] font-Imedium color-slate-600 mb-[5px]">Selecione a Data Final:</Text>

                                    <View className="w-[100%] max-h-[100%] bg-white rounded-[25px] gap-[12.5px] shadow-black shadow-2xl">
                                        <Calendar
                                            style={styles.calendar}
                                            renderArrow={(direction: "right" | "left") => (
                                                <MaterialIcons name={`chevron-${direction}`} color={colors.black} size={18.75} />)}
                                            headerStyle={{
                                                paddingBottom: 1,
                                                marginBottom: 1
                                            }}
                                            theme={{
                                                textMonthFontSize: 25,
                                                textDayFontSize: 12.5,
                                                monthTextColor: colors.red[900],
                                                todayTextColor: colors.red[900],
                                                selectedDayBackgroundColor: colors.red[900],
                                                selectedDayTextColor: colors.white,
                                                arrowColor: colors.black,
                                                calendarBackground: "transparent",
                                                textDayStyle: { color: colors.black },
                                                textDisabledColor: colors.green[400],
                                                arrowStyle: {
                                                    margin: 0,
                                                    padding: 0
                                                },
                                                textMonthFontFamily: fontFamily.Imedium,
                                                textDayFontFamily: fontFamily.Oregular
                                            }}
                                            minDate={new Date().toDateString()}
                                            onDayPress={(day: DateData) => setSelectedEndDate(day.dateString)}
                                            markedDates={{
                                                [selectedStartDate || '']: {
                                                    selected: true,
                                                    selectedColor: '#7D0A0A',
                                                },
                                                [selectedEndDate || '']: {
                                                    selected: true,
                                                    selectedColor: '#7D0A0A',
                                                },
                                            }}
                                        />


                                        <View className="w-[90%px] mt-[2px] flex-row justify-around items-center gap-[1px] ">

                                            <Pressable onPress={handleRegisterCycle} disabled={!selectedStartDate || !selectedEndDate}
                                                className="w-[35%] mb-[10px] h-[35px] bg-red-500 justify-center items-center rounded-[12.5px]" >
                                                <Text className="text-[18.75px] color-white font-Imedium" >Registrar</Text>
                                            </Pressable>

                                            <Pressable onPress={() => setModalVisible(false)}
                                                className="w-[35%] mb-[10px]  h-[35px] bg-red-500 justify-center items-center rounded-[12.5px]" >
                                                <Text className="text-[18.75px] color-white font-Imedium" >Voltar</Text>
                                            </Pressable>


                                        </View>

                                    </View>

                                </View>
                            </View>

                        </Modal>
                    </View>


                </View>

                <Toast />

                <View style={styles.ButtonRegister}>
                    <Pressable className="w-[75%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px] ml-[50px]">
                        <Link href={"../historico"}>
                            <Text className="text-[18.75px] color-white font-Imedium" >Ver histórico de registros </Text>
                        </Link>
                    </Pressable>
                </View>

                <View style={styles.ContainerRegistro}>
                    <Text style={styles.txtRegistro}>
                        Hoje
                    </Text>

                    <View style={styles.Registro}>

                        {/* Primeira Horizontal*/}
                        <View style={styles.boxRegistro}>
                            <Link href={"/symp"}>
                                <Text style={styles.txtBoxRegistro}>
                                    Registrar Sintomas
                                </Text>
                            </Link>

                            <Link href={"/symp"}>
                                <MaterialCommunityIcons name="plus-circle-outline" size={45} color="#7D0A0A" />
                            </Link>
                        </View>

                        {/* Primeira Horizontal*/}
                        <View style={[styles.boxDicas, styles.difDicas]}>
                            <Text style={styles.txtBoxDicas}>
                                Dica do dia
                            </Text>
                        </View>

                        {/* Segunda Horizontal*/}
                        <View style={[styles.boxDicas, styles.difDicas2]}>
                            <Text style={styles.txtBoxDicas}>
                                Artigos
                            </Text>
                        </View>

                        {/* Segunda Horizontal*/}

                        <View style={[styles.boxRegistro, styles.difRegistro]}>
                            <Link href={"/remedios"}>
                                <Text style={styles.txtBoxRegistro}>
                                    Registrar Remédios
                                </Text>
                            </Link>

                            <Link href={"/remedios"}>
                                <MaterialCommunityIcons name="plus-circle-outline" size={45} color="#7D0A0A" />
                            </Link>
                        </View>

                        {/* Terceira Horizontal*/}
                        <View style={styles.boxRegistro}>
                            <Link href={'/atividade_fisica'}>
                                <Text style={styles.txtBoxRegistro}>
                                    Registrar Atividades
                                </Text>
                            </Link>

                            <Link href={'/atividade_fisica'}>
                                <MaterialCommunityIcons name="plus-circle-outline" size={45} color="#7D0A0A" />
                            </Link>
                        </View>

                        {/* Terceira Horizontal*/}
                        <View style={styles.boxDicas}>
                            <Text style={styles.txtBoxDicas}>
                                Papo das Mulheres
                            </Text>
                        </View>
                    </View>


                </View>

                <View>

                    <Pressable onPress={logoutHandle} >
                        <Text className="w-[90%] h-[37.5px] text-[18.75px] text-center color-red-900 font-Ibold ml-[20px] mt-[15px]" >Sair</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView >

    )
}


const styles = StyleSheet.create({


    ContainerGlobal: {
        height: 1000,
        marginTop: -200,
    },

    calendar: {
        backgroundColor: "transparent",
        width: "100%",
        alignSelf: "center"
    },

    Back: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo semi-transparente
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent2: {
        width: 370,
        height: 500,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // sombra no Android
    },


    ButtonRegister: {
        marginTop: -220
    },

    /* Início do Registro */

    ContainerRegistro: {
        backgroundColor: '#fff',
        flex: 1,
        height: 620,
        margin: 5,
        borderRadius: 20,
        width: 390,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: '#000000',  // Sombra preta
        shadowOffset: { width: 0, height: 4 },  // Deslocamento da sombra
        shadowOpacity: 0.2,  // Opacidade da sombra
        shadowRadius: 6,
        marginTop: 50,
        maxWidth: 400,

    },

    txtRegistro: {
        color: '#7D0A0A',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 40,
        marginTop: 5
    },

    Registro: {
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    boxRegistro: {
        height: 150,
        width: 150,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderColor: '#CA6060',
        borderWidth: 3,
        margin: 10,
        alignItems: 'center',
        paddingTop: 10,

    },

    imgRegistro: {
        height: 60,
        width: 50,
        alignItems: 'center'
    },

    'difRegistro': {
        height: 160
    },

    txtBoxRegistro: {
        color: '#000000',
        fontSize: 23.5,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    boxDicas: {
        height: 150,
        width: 150,
        borderRadius: 20,
        backgroundColor: '#CA6060',
        borderColor: '#CA6060',
        borderWidth: 2.5,
        margin: 10,
        alignItems: 'center',
        paddingTop: 15
    },

    'difDicas': {
        marginTop: 38.5
    },

    'difDicas2': {
        height: 200,
        marginTop: -25
    },

    txtBoxDicas: {
        color: '#fff',
        fontSize: 22.5,
        fontWeight: 'bold',
        textAlign: 'center'
    },


});

