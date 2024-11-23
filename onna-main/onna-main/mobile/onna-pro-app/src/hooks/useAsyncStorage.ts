import AsyncStorage from "@react-native-async-storage/async-storage"

export const useAsyncStorage = () => {
    // create
    const createData = async (key: string, value: any) => { // tipagem dos parâmetros
        try {
            let data = await readData(key)
            
            data.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(data))
        }
        catch (error) {
            console.log("ERRO 1: " + error)
            return []
        }      
    }

    // read
    const readData = async (key: string) => { // tipagem do parâmetro
        try {
            const data = await AsyncStorage.getItem(key)
            return JSON.parse(data + "") || []
        }
        catch (error) {
            console.log("ERRO 2: " + error)
            return []
        }
    }

    // read by id
    const readDataByID = async (key: string, field: string) => { // tipagem dos parâmetros
        try {
            const data = await AsyncStorage.getItem(key)
            const dataByID = JSON.parse(data + "") || []
            return dataByID.map((data: any) => data[field]) || []
        }
        catch (error) {
            console.log("ERRO 3: " + error)
            return []
        }
    }

    // update
    const updateDataByID = async (key: string, idTipo_Usuario: number, field: string, newValue: any) => {
        try {
            let data = await readData(key);

            const index = data.findIndex((item: any) => Number(item.idTipo_Usuario) === Number(idTipo_Usuario))
    
            if (index !== -1) {
                data[index][field] = newValue
    
                await AsyncStorage.setItem(key, JSON.stringify(data))
    
                return data
            } else {
                return []
            }
        }
        catch (error) {
            console.log("ERRO 5: " + error)
            return []
        }
    }

    // delete
    const deleteData = async (key: string) => { // tipagem dos parâmetros
        try {
            await AsyncStorage.removeItem(key)
            return []  
        }
        catch (error) {
            console.log("ERRO 4: " + error)
            return []
        }
    }

    // delete by id
    const deleteDataByID = async (key: string, idTipo_Usuario: number) => { // tipagem dos parâmetros
        try {
            let data = await readData(key)
            
            let myData = data.filter( (x: any) => x.idTipo_Usuario !== idTipo_Usuario)

            await AsyncStorage.setItem(key, JSON.stringify(myData))
            return myData  
        }
        catch (error) {
            console.log("ERRO 5: " + error)
            return []
        }
    }

    // clear
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            console.log("Storage is empty...")
        }
        catch (error) {
            console.log("ERRO 6: " + error)
        }
    }

    return {
        createData,
        readData,
        readDataByID,
        updateDataByID,
        deleteData,
        deleteDataByID,
        clearStorage
    }
}