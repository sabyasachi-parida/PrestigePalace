import React from 'react'
import { useUser } from '../features/authentication/useUser'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Spinner from './Spinner';
import styled from 'styled-components';
const FullPage=styled.div`
  
    height:100vh;
    background-color:var(--color-grey-50);
    display:flex;
    align-items:center;
    justify-content:center;

`
const ProtectedRoute = ({children}) => { 
  const navigate=useNavigate()    
const{user,isLoading,isAuthenticated}=useUser();


useEffect(function(){
  if(!isAuthenticated && !isLoading) navigate('/login')
},[isAuthenticated,isLoading,navigate])

if(isLoading) return <FullPage><Spinner/></FullPage>


  if(isAuthenticated) return <div>{children}</div>
}

export default ProtectedRoute