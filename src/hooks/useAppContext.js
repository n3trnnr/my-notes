import { useContext } from "react"
import { Context } from "../context/useContext"

export const useAppContext = () => {
    return useContext(Context)
}