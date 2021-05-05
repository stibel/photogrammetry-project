import { useContext } from "react";

export const useCustomContext = (context) => {
    const ctx = useContext(context)

    if (!ctx)
        throw new Error('No context provided')

    return ctx
}