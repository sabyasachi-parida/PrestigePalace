import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import UpdateUserDataForm from "./UpdateUserDataForm";
import { updateCurrentUser } from "../../services/apiAuth";




export function useUpdateUser(){

    
    
    
    const queryClient=useQueryClient();
    const{mutate:updateUser,isLoading:isUpdating}=useMutation({
        mutationFn:updateCurrentUser,
        onSuccess : ()=>{
            toast.success("userdata successfully updated ");
        
            queryClient.invalidateQueries({queryKey:['user']})
   
},
onError:(err)=>toast.error(err.message)
});

return {updateUser , isUpdating};
} 