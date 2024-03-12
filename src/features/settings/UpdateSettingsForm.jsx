import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from "../../ui/Spinner"
import {useUpdateSetting} from "./useUpdateSetting"

function UpdateSettingsForm() {
  const {isLoading,error,settings:{maxBookingLength,maxGuestsPerBooking,minBookingLength,breakfastPrice}={}}=useSettings();
 
const {isUpdating,updateSetting}=useUpdateSetting();
function handleUpdate(e,field){
  const {value}= e.target;
  if(!value) return ;
 updateSetting({ [field] : value })
   
}
  
  if(isLoading) return <Spinner/>
  return (
    <Form >
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={minBookingLength} onBlur={(e)=>handleUpdate(e,"minBookingLength")} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}   />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
