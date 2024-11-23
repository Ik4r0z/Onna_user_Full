import { SafeAreaView, View, StatusBar, Image, Text, Pressable } from "react-native"

import { Link } from "expo-router"


import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message'

export default function RecoveryPassword() {

    const [seconds, setSeconds] = useState<number>(60);

    const handleTextPress = () => {
        Toast.show({
            type: 'info', // Tipos: 'success', 'error', 'info'
            text1: 'Reenviando Código de verificação',
            text2: 'Verifique sua caixa de entrada do email!',
        });
    };

    useEffect(() => {
        if (seconds === 0) {
            return;
        }
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);


    const restartTimer = () => {
        setSeconds(60);
    };

    const handlePress = () => {
        handleTextPress();
        restartTimer();
    };


    return (
        <SafeAreaView className="flex-1 bg-white" >
            <View className="w-full h-full justify-center gap-[50px]" >
                <StatusBar barStyle={"dark-content"} />

                <View className="items-center" >
                    <Image className="w-[250px] h-[253px]"
                        source={require("@/assets/images/email.png")}
                    />
                </View>

                <View className="justify-center items-center gap-[18.75px]" >
                    <Text className="text-[50px] color-red-900 font-Ibold" >Atenção</Text>
                    <Text className="w-[87.5%] text-[25px] text-center color-black font-Iregular" >Enviamos um código para seu email, verifique sua caixa de entrada</Text>

                    <Text className="text-[18.75px] color-black font-Obold mb-[10px]" > Tempo restante: {seconds} </Text>

                    <Pressable className="w-[62.5%] h-[50px] bg-white border-solid color-red-900 border-[2px] justify-center items-center rounded-[12.5px] mb-5" >
                        <Link href={"/login"} >
                            <Text className="text-[18.75px] color-red-900 font-Imedium" >Login</Text>
                        </Link>
                    </Pressable>

                    <Text className="text-[18.75px] color-black font-Oregular" >Não recebeu?
                        <Text onPress={handlePress} className="text-[18.75px] color-red-900 font-Oregular font-bold" > Clique para Reenviar</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}