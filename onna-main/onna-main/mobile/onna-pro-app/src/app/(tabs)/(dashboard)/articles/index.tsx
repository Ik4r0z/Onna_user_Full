import React, { useState, useEffect } from "react"
import { SafeAreaView, View, StatusBar, Pressable, FlatList } from "react-native"

import { colors } from "@/styles/colors"
import { MaterialIcons } from "@expo/vector-icons"

import { Input } from "@/components/input"
import { Article } from "@/components/article"

import Toast from "react-native-toast-message"
import { showToast } from "@/components/toast"

import api from "@/services/api"

import { ArticleDataProps } from "@/utils/articles" 

export default function Articles() {
    // hooks
    const [articles, setArticles] = useState<ArticleDataProps[]>([])

    useEffect(() => {
        const Load = async () => {
            // exibir artigo
            try {
                const res = await api.get("/api/artigo")

                if (res.status === 200) {
                    const data: ArticleDataProps[] = res.data // resposta da api como uma array
                    setArticles(data)
                }
            } catch (error) {
                showToast("error", "ERRO", "" + error)
                console.error(error)
                return
            }
        }

        Load()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-gray">
            <View className="w-full h-full justify-center items-center gap-[50px]">
                <StatusBar barStyle="dark-content" />

                <View className="flex-1 pt-14 p-4">
                    <Input>
                        <Pressable>
                            <MaterialIcons name="search" color={colors.davys} size={25} />
                        </Pressable>
                        <Input.Field placeholder="Pesquisar..." />
                    </Input>

                    <FlatList
                        data={articles}
                        keyExtractor={item => item.idArtigo.toString()}
                        renderItem={({ item }) => <Article data={item} />}
                    />
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    )
}
