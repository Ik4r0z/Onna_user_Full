import { SafeAreaView, View, StatusBar, Text, Image, Pressable } from "react-native"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import { Link, router } from "expo-router"

export default function Index() {
    // navegação
    const Router = () => {
        try {
            router.push("/login")
        }
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    // validação
    const RouterHandle = () => {
        try {
            Router()
        }
        catch (error) {
            showToast("error", "ERRO", "" + error)
            console.error
            return
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-red-300" >
            <View className="w-full h-full justify-center items-center gap-[50px]" >
                <StatusBar barStyle={"light-content"} />

                <View className="justify-center items-center gap-[1px]" >
                    <Text className="text-[25px] color-white  font-Omedium" >Bem vindo ao</Text>
                    <Text className="text-[50px] color-red-900 font-Imedium" >ONNA</Text>
                    <Text className="text-[18.75px] color-white  font-Oregular">Seu assistente menstrual</Text>
                </View>

                <View className="" >
                    <Image className="w-[320px] h-[335.5px]"
                        source={require("@/assets/images/women.png")}
                    />
                </View>


                <View className="w-[62.5%] h-[50px] flex-row justify-around items-center gap-[1px]" >
                    <Pressable className="w-full h-[50px] bg-red-500 justify-center items-center rounded-[12.5px]" onPress={RouterHandle} >
                        <Link href={"/(dashboard)/home"}>
                            <Text className="text-[18.75px] color-white font-Imedium" >Login</Text>
                        </Link>
                    </Pressable>
                </View>

                <View className="justify-center items-center" >
                    <Text className="text-[18.75px] color-red-900 font-Oregular" >Dúvidas?
                        <Text className="text-[18.75px] color-red-900 font-Oregular" > Veja como funciona</Text>
                    </Text>
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    )
}