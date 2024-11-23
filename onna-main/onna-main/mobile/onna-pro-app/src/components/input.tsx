import { ReactNode } from "react"
import { View, TextInput, TextInputProps } from "react-native"

import { colors } from "@/styles/colors"

type InputProps = {
    children: ReactNode
}

function Input( { children }: InputProps ) {
    return (
        <View className="w-full h-[50px] bg-white rounded-full flex-row items-center gap-4 p-4 shadow-xl shadow-black" >
            {children}
        </View>
    )
}

function InputField( { ...rest }: TextInputProps ) {
    return (
        <TextInput className="flex-1 font-Imedium text-[18.75px] text-black"
        placeholderTextColor={colors.dark}
        cursorColor={colors.black}
        {...rest}
        />
    )
}

Input.Field = InputField

export { Input }