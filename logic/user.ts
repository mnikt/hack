import AsyncStorage from "@react-native-async-storage/async-storage";

export default interface User {
    id: number;
    name: string;
}

let userCache: User | null = null;

const getUser = async () => {
    if (userCache) return userCache;

    const id = await AsyncStorage.getItem('@user_id');
    const name = await AsyncStorage.getItem('@user_name');

    if (id === null || name === null) return null;

    userCache = {
        id: parseInt(id as string),
        name: name,
    }

    return userCache;
}

const setUser = async (name: string, id: number) => {
    await AsyncStorage.setItem('@user_id', id.toString());
    await AsyncStorage.setItem('@user_name', name);

    userCache = {
        id: id,
        name: name,
    }

    return userCache;
}

export { getUser, setUser, User };
