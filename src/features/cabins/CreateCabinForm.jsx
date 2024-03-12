import styled from "styled-components";
import toast from "react-hot-toast";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from 'react-hook-form';


import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";




function CreateCabinForm({cabinToEdit={},onCloseModal}) {
  const {isCreating ,createCabin}=useCreateCabin();
  const{ isEditing ,editCabin} = useEditCabin()
  const {id:editId,...editValues}=cabinToEdit;
  const isEditSession=Boolean(editId);
  const {register,handleSubmit,reset,getValues,formState }=useForm({
    defaultValues: isEditSession ? editValues:{}
  });
  const {errors}=formState;
  


const isWorking= isCreating || isEditing;  


  function onSubmit(data){

     const image=typeof data.image ==='string' ? data.image : data.image[0];
    if(isEditSession) editCabin({newCabinData :{...data,image},id:editId},{
      onSuccess:()=>reset(),
    });

     else{createCabin({...data, image : image},{
      onSuccess:()=>{reset()
      onCloseModal ?.()},
     });}
    
  }
  function onError(errors){

  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onCloseModal ? "modal":"regular"}>
      <FormRow label="cabin name" error={errors?.name?.message}>
        
        <Input  disabled={isWorking} type="text" id="name" {...register("name",
        {
          required:"this field is required"
        })} />
      </FormRow>

      <FormRow label="maximumCapacity" error={errors?.maxCapacity?.message}>
        
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity",{
          required:"this field is required",
          min:{
            value:1,
            message:"capacity should be at least 1"
          },
        })}/>
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
      
        <Input type="number" id="regularPrice"
        disabled={isWorking} {...register("regularPrice",{
          required:"this field is required",
          min:{
            value:1,
            message:"capacity should be at least 1"
          },
        })}/>
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount",{
          required:"this field is required",
          validate:(value)=> value < getValues().regularPrice || 'discount should be less than the regular price'
        })}/>
      </FormRow>

      <FormRow label="descriptionForWebsite" error={errors?.description?.message}>
        
        <Textarea type="number" id="description" disabled={isWorking} defaultValue=""{...register("description",
        {
          required:"this field is required"
        })} />
      </FormRow>

      <FormRow label="cabin photo" >
       
        <FileInput id="image"  accept="image/*" {...register("image",
        {
          required: isEditSession? false   :"this field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession? "Edit cabin" : "Create  Cabin" }</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
