import React, { useState } from 'react'
import Modal from '../../ui/Modal'
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeletecabin";
import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers"
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from './useCreateCabin';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr ;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const StyledButton=styled.div`
  display:flex;
  gap:1rem;

`



const CabinRow = ({cabin}) => {
  const {id:cabinId,name,maxCapacity,regularPrice,discount,image,description}=cabin;
  
  const {isDeleting,deleteCabin}=useDeleteCabin();
  const {isCreating,createCabin}=useCreateCabin();
  
  function handleDuplicate(){
    createCabin({
      name:`copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,

    })
  }
  return (<>
<Table.Row role='row'>
<Img src={image}/>
<Cabin>{name}</Cabin>
<div >Fits Up To {maxCapacity}</div>
<Price>{formatCurrency(regularPrice)}</Price>
 { discount ?  <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
<StyledButton>
  <button onClick={handleDuplicate} disabled={isCreating}> <HiSquare2Stack/> </button>


<Modal>
   <Modal.Open opens='edit'>
  <button onClick={()=>setShowForm((show)=>!show)}><HiPencil/></button>
  </Modal.Open>
  <Modal.Window name="edit">
  <CreateCabinForm cabinToEdit={cabin}/>
</Modal.Window>




<Modal.Open opens="delete" >
<button  disabled={isDeleting}><HiTrash/></button>
</Modal.Open>
  <Modal.Window name="delete">
    <ConfirmDelete
    resourceName="cabins"
    disabled={isDeleting}
    onConfirm={()=>{
     
      deleteCabin(cabinId)}}
    />
  </Modal.Window>
</Modal>


{/* <Menus.Menu>
  <Menus.Toggle id={cabinId}/>
  <Menus.List id={cabinId}>
  <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate}>duplicate</Menus.Button>
  <Menus.Button icon={< HiPencil/>} onClick={()=>setShowForm((show)=>!show)}>edit</Menus.Button>
  <Menus.Button icon={<HiTrash/>}>delete</Menus.Button>

  </  Menus.List>
</Menus.Menu> */}

</StyledButton>
</Table.Row>

</> )
}

export default CabinRow