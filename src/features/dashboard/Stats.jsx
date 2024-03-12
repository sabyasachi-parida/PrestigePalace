import React from 'react'
import Stat from './Stat';
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers';

export default function Stats({bookings,confirmedStays,numDays,cabinCount}) {

    const numBookings=bookings.length;
     const sales=bookings.reduce((acc,cur)=>acc+cur.totalPrice,0);
     const checkins=confirmedStays.length;
    const occupation=confirmedStays.reduce((acc,curr)=>acc+curr.numNights,0)/(numDays*cabinCount)
    

    





  return (<>
     <Stat title='Bookings' value={numBookings} color='blue' icon={<HiOutlineBriefcase/>}/>
     <Stat title='sales' value={formatCurrency(sales)} color='green' icon={<HiOutlineBanknotes/>}/>
     <Stat title='CheckIn' value={checkins} color='indigo' icon={<HiOutlineCalendarDays/>}/>
     <Stat title='Occupancy rate ' value={Math.round(occupation*100)} color='yellow' icon={<HiOutlineChartBar/>}/>
     
  
  
  
  </>
   
  )
}
 


