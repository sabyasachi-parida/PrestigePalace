
import { useNavigate } from 'react-router-dom'
import {signup as signupApi} from '../../services/apiAuth'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

export function  useSignup(){

    const  navigate=useNavigate();
    const {mutate:signup,isLoading} = useMutation({
        mutationFn:signupApi,
        onSuccess:(user)=>{
            
            toast.success('account created succesfully')
        },
        onError:()=>{
            toast.error('could not create your account')
        }
    })


    return {signup,isLoading}
}