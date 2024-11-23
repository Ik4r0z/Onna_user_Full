import { SafeAreaView, View, StatusBar, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, Pressable } from "react-native"

import { Link } from "expo-router"

export default function Password() {
    return (
        <SafeAreaView className="flex-1 bg-white" >   
            <View className="w-full h-full justify-center gap-[25px]" >
                <StatusBar barStyle={"dark-content"} />

                <View className="items-center" >
                    <Image className="w-[250px] h-[297.5px]"
                        source={require("@/assets/images/mulher_caderno.png")}
                    />
                </View>

                <KeyboardAvoidingView className="flex-1" >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <View className="w-full h-full justify-center items-center gap-[18.75px]" >
                            <Text className="w-[75%] text-[25px] text-left color-red-900 font-Ibold" >Definir Senha</Text>

                            <Text className="w-[75%] text-[18.75px] text-left color-black font-Iregular mt-[10px]" >Senha</Text>
                            <TextInput className="w-[75%] h-[50px] bg-white border-solid border-black border-[2px] text-[18.75px] text-justify color-black font-Olight rounded-[12.5px] pl-[6.25px]"
                                placeholder="**********"
                                keyboardType="default"
                            />

                            <Text className="w-[75%] text-[18.75px] text-left color-black font-Iregular" >Confirme a senha</Text>
                            <TextInput className="w-[75%] h-[50px] bg-white border-solid border-black border-[2px] text-[18.75px] text-justify color-black font-Olight rounded-[12.5px] pl-[6.25px] mb-[10px]"
                                placeholder="**********"
                                keyboardType="visible-password"
                            />

                            <Pressable className="w-[75%] h-[50px] bg-red-500 justify-center items-center rounded-[12.5px] shadow-xl shadow-black" >
                                <Link href={"/trainingArea"} > {/* MUDAR ISSO AQUI HEIN */}
                                    <Text className="text-[18.75px] color-white font-Imedium" >Salvar</Text>
                                </Link>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}