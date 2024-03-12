import React, { useState } from 'react'
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CabinTable from './CabinTable';

function AddCabin(){
  return (
    <Modal>
    <Modal.Open opens="cabin-form">
      <Button> add new cabin </Button>
    </Modal.Open>
    <Modal.Window name="cabin-form">
      <CreateCabinForm/>
    </Modal.Window>
    <Modal.Open opens="table">
      <Button> show Table </Button>
    </Modal.Open>
    <Modal.Window name="table">
     <CabinTable/>
    </Modal.Window>



    </Modal>
  )
}


// const AddCabin = () => {
//     const[isOpenModal , setIsOpenModal]=useState(false);
//   return (
//     <div>
//          <Button onClick={()=>setIsOpenModal((show)=>(!show))}>add new cabin</Button>
//          {isOpenModal && <Modal  onCloseModal={()=>setIsOpenModal(false)}><CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/></Modal>}
//     </div>
//   )
// }

export default AddCabin