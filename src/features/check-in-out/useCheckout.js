import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout (){

    const queryClient=useQueryClient();
    const navigate= useNavigate();
    const {mutate:checkout,isLoading:isCheckingOut}= useMutation({
        mutationFn:(bookingId)=>updateBooking(bookingId,{
            status:'checked-out',
          
        }
        ),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({active:true});
            toast.success(`Booking # ${data.id} successfully checked out`);
            navigate('/');
        },
        onError:()=>{
            toast.error(`there was an error while checkng out`)
        }
     })
     return { checkout,isCheckingOut}
}