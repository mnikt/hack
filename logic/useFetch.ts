import {getUser} from "@/logic/user";
import {useState} from "react";


const backendURL: string = "http://20.86.144.2:8000";

type hookArgs = {
    initLoading?: boolean,
}

type fetchArgs = {
    method?: "GET" | "POST",
    body?: any,
    contentType?: string,
    includeCredentials?: boolean
}

export default function useFetch<T>(args: hookArgs = {}): [T | undefined, boolean, string | null, (endpoint: string, args?: fetchArgs) => void] {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(args.initLoading || false);
    const [error, setError] = useState<string | null>(null);

    const _fetch = async (endpoint: string, args: fetchArgs = {}) => {
        const url = backendURL + '/' + endpoint;
        const method = args.method || "GET";
        const body = args.body ? JSON.stringify(args.body) : null;
        const contentType = args.contentType || "application/json";
        const includeCredentials = args.includeCredentials || true;

        let user_id = "";
        if (includeCredentials){
            const user = await getUser();

            if (!user?.id) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }
            user_id = user.id.toString();
        }

        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': contentType,
                'Authentication': user_id
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => setData(data)).catch(error => setError(error.message)).finally(() => setLoading(false));
    }

    return [
        data,
        loading,
        error,
        _fetch
    ]
}