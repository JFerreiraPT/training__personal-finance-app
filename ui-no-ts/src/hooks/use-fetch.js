import { useCallback, useState } from "react"

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const get = useCallback(async(request, functionHandler) => {
        setIsLoading(true);
        setError(null);

        try{
            const response = await fetch(request.url);

            if(!response.ok) {
                throw new Error("Request failed");
            }

            const data = await response.json();

            functionHandler(data);
            setIsLoading(false);
            setError(null);
            
        } catch(err) {
            console.log(err)
            setError(err.message || "Something went Wrong");
        }


    }, []);

    const post = useCallback(async(request, functionHandler) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(request.url, {
                method: request.method,
                body: JSON.stringify(request.body),
                headers: request.headers,
            })

            if(!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            functionHandler(data);

        } catch(err) {
            console.log(err.message);
            setError(err.message || "Something went wrong")
        }
    })



}