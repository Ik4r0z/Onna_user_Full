import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface ImageOption {
    id: number;
    src: any; // Tipo `any` para imagens locais com `require`
}

interface ImageSelectorProps {
    images: ImageOption[];
    onSave: (selectedImage: number | null) => void; // Callback para passar a imagem selecionada para o componente pai
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images, onSave }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <View style={styles.imageContainer}>
            {images.map((image) => (
                <TouchableOpacity
                    key={image.id}
                    onPress={() => setSelectedImage(image.id)} // Atualiza a seleção da imagem
                >
                    <Image
                        source={image.src}
                        style={[
                            styles.image,
                            selectedImage === image.id && styles.selectedImage, // Aplica estilo se a imagem for selecionada
                        ]}
                    />
                </TouchableOpacity>
            ))}
            
        </View>
    );
};


const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    image: {
        width: 120,
        height: 150,
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent', // Borda invisível por padrão
    },
    selectedImage: {
        borderColor: '#7D0A0A', // Cor de borda para imagem selecionada
        opacity: 0.8, // Opacidade para efeito visual
    },
    saveButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ImageSelector;