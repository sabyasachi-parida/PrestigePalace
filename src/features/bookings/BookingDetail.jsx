import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare ,HiTrash} from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBookings";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const{isDeleting,deleteBooking}=useDeleteBooking()
   const{checkout,isCheckingOut}=useCheckout()
  const navigate=useNavigate();
  const{isLoading,error,booking}=useBooking();
  const moveBack = useMoveBack();
  if(isLoading) return <Spinner/>
  if(!booking) return <Empty resourceName='booking'/>
  
  const {status, id:bookingId}=booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {status === 'unconfirmed' &&  <Button onClick={()=>navigate(`/checkin/${bookingId}`)}>
         check in </Button> 
}
           {status === 'checked-in' &&  <Button icon={<HiArrowUpOnSquare/>} onClick={()=>{checkout(bookingId)}} disabled={isCheckingOut}>
           check out </Button> 
  }
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      <Modal>

      <Modal.Open opens='delete'>
      <Button variation='danger'>
        delete booking 
      </Button>
     </Modal.Open>
     <Modal.Window name='delete'>
        <ConfirmDelete resourceName='booking' onConfirm={()=>{ deleteBooking(bookingId,{
          onSettled:()=>navigate(-1)
        });
       
           
        }} disabled={isDeleting}/>
       </Modal.Window>



      </Modal>

  





      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
