import toast from "react-hot-toast"
import { logout as logoutApi } from "../../services/apiAuth"

import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"



export function useLogout(){
    const navigate = useNavigate()
    const queryClient=useQueryClient()
    const { mutate : logout ,isLoading}=useMutation({
        mutationFn:logoutApi,
        onSuccess:()=>{
            queryClient.removeQueries()
            toast.success('logged out successfully')
            navigate('/login',{replace:true})
        },
        onError:()=>{
            toast.error('could not logeed out')
        }
    })

    return {logout,isLoading}
}