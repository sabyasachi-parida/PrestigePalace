import toast from "react-hot-toast";
import { useUpdateSetting } from "../settings/useUpdateSetting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin (){

    const queryClient=useQueryClient();
    const navigate= useNavigate();
    const {mutate:checkin,isLoading:isCheckingIn}= useMutation({
        mutationFn:({bookingId,breakfast})=>updateBooking(bookingId,{
            status:'checked-in',
            isPaid:"true",
            ...breakfast,
        }
        ),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({active:true});
            toast.success(`Booking # ${data.id} successfully checked in `);
            navigate('/');
        },
        onError:()=>{
            toast.error(`there was an error while checkng in`)
        }
     })
     return { checkin,isCheckingIn}
}