import styled from "styled-components";
import toast from "react-hot-toast";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";



function CreateCabinForm({cabinToEdit={}}) {
  const {id:editId,...editValues}=cabinToEdit;
  const isEditSession=Boolean(editId);

  const {register,handleSubmit,reset,getValues,formState }=useForm({
       defaultValues: isEditSession ? editValues:{}
  });
  const {errors}=formState;

  const queryClient=useQueryClient();


  function onSubmit(data){
    mutate({...data, image : data.image[0]});
    
  }
  function onError(errors){

  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="cabin name" error={errors?.name?.message}>
        
        <Input  disabled={isCreating} type="text" id="name" {...register("name",
        {
          required:"this field is required"
        })} />
      </FormRow>

      <FormRow label="maximumCapacity" error={errors?.maxCapacity?.message}>
        
        <Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity",{
          required:"this field is required",
          min:{
            value:1,
            message:"capacity should be at least 1"
          },
        })}/>
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
      
        <Input type="number" id="regularPrice"
        disabled={isCreating} {...register("regularPrice",{
          required:"this field is required",
          min:{
            value:1,
            message:"capacity should be at least 1"
          },
        })}/>
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        
        <Input type="number" id="discount" disabled={isCreating} defaultValue={0} {...register("discount",{
          required:"this field is required",
          validate:(value)=> value < getValues().regularPrice || 'discount should be less than the regular price'
        })}/>
      </FormRow>

      <FormRow label="descriptionForWebsite" error={errors?.description?.message}>
        
        <Textarea type="number" id="description" disabled={isCreating} defaultValue=""{...register("description",
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
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditSession? "Edit cabin" : "Create  Cabin" }</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
