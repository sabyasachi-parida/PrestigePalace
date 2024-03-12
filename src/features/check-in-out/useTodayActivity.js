import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getStaysTodayActivity } from '../../services/apiBookings'

export default function useTodayActivity() {


 const {isLoading,data:activities}=useQuery({
    queryFn:getStaysTodayActivity,
    queryKey:['today-activity']
})

  return {activities,isLoading}
    
  
}
