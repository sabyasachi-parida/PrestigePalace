import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";




export function useUpdateSetting(){

    
    
    
    const queryClient=useQueryClient();
    const{mutate:updateSetting,isLoading:isUpdating}=useMutation({
        mutationFn:({newCabinData})=>updateSettingApi(newCabinData),
        onSuccess : ()=>{
            toast.success("settings updated succesfully ");
            queryClient.invalidateQueries({queryKey:['settings']})
   
},
onError:(err)=>toast.error(err.message)
});

return {updateSetting , isUpdating};
} 