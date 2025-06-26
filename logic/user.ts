import AsyncStorage from "@react-native-async-storage/async-storage";

export default interface User {
    id: number;
    name: string;
}

const getUser = async () => {
    const id = await AsyncStorage.getItem('@user_id');
    const name = await AsyncStorage.getItem('@user_name');

    if (id === null || name === null) return null;

    return {
        id: parseInt(id as string),
        name: name,
    }
}

const setUser = async (name: string, id: number) => {
    await AsyncStorage.setItem('@user_id', id.toString());
    await AsyncStorage.setItem('@user_name', name);

    return {
        id: id,
        name: name,
    }
}

export { getUser, setUser, User };
