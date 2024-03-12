import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings(){
        const queryclient=useQueryClient();
    const [searchParams]=useSearchParams();
    const filterValue= searchParams.get("status");
    
    const filter = !filterValue || filterValue ===  "all"  ? null :{field:'status',value:filterValue}
   const sortByRaw = searchParams.get("sortBy") || 'startDate-desc'
   const[field,direction]=sortByRaw.split("-");
   const sortBy={field,direction};
// const modifier= direction === "asc" ? 1 : -1;
// const =filteredCabins.sort((a,b)=>(a[field]-b[field]) * modifier );
const page= !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
const { 
    isLoading,
    data:{data:bookings,count}={},
    error,

}=useQuery({
    queryKey:["bookings",filter,sortBy,page],    
    queryFn:()=>getBookings({filter,sortBy,page}),
})

const pageCount=Math.ceil(count/PAGE_SIZE);
if(page < pageCount){

    queryclient.prefetchQuery({
        queryKey:["bookings",filter,sortBy,page+1],
        queryFn:()=>getBookings({filter,sortBy,page:page+1}),
    })
    
}
if(page > 1){

    queryclient.prefetchQuery({
        queryKey:["bookings",filter,sortBy,page-1],
        queryFn:()=>getBookings({filter,sortBy,page:page-1}),
    })
    
}


return {isLoading,error,bookings,count}

}