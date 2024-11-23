import { Link } from "expo-router"
import { SafeAreaView, View, StatusBar, Text, Image, Pressable } from "react-native"

export default function Community() {
    return (
        <SafeAreaView className="flex-1 bg-red-300" >
            <View className="w-full h-full justify-center items-center gap-[50px]" >
                <StatusBar barStyle={"dark-content"} />

                <View className="w-[90%] justify-center items-center gap-[1px] p-[3.125px]" >
                    <Text className="text-[18.5px] text-center color-white font-Ibold" >Bem vindo(a),
                        <Text className="text-[18.5px] text-center color-black font-Ibold" > ao teste rápido de gravidez</Text>
                    </Text>
                </View>

                <View className="" >
                    <Text className="text-[17.5px] text-center color-balck font-Ibold ">Antes de receber o resultado,
                        <Text className="text-[17.5px] text-center color-white font-Ibold m-5" >
                            é de suma importância saber que esse teste não substitui o teste de gravidez convencional,
                            como o de sangue. 
                        </Text>
                        Nosso teste só lhe entrega uma ideia de uma possível gravidez ou não.
                    </Text>
                </View>

                <Pressable className="w-[75%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px] shadow-xl shadow-black"  >

                    <Link href={"../q1"}>
                        <Text className="text-[18.75px] color-white font-Imedium" >Iniciar teste</Text>
                    </Link>

                </Pressable>


            </View>
        </SafeAreaView >
    )
}