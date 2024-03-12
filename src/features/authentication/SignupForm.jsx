import { useForm } from 'react-hook-form';

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
 const{signup,isLoading}=useSignup()
  const{register,formState,getValues,handleSubmit,reset}=useForm();
  const{errors} = formState;

  function onSubmit({email,fullName,password}){ 
    signup({fullName,email,password},
      {
        onSettled:reset,

      }
      )

  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" disabled={isLoading} id="fullName" {...register('fullName',{
          required:'this field is required '
        })}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email"disabled={isLoading} id="email" {...register('email',{
          required:'this field is required ',pattern:{
           value:  /\S+@\S+\.\S+/,
           message:'please provide a valid email address',
          }
        })}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={isLoading} type="password" id="password" {...register('password',{
          required:'this field is required ',
          minLength:{
            value:8,
            message:'Password needs to be minimunof 8 characters',
          }
        })}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input disabled={isLoading} type="password" id="passwordConfirm" {...register('passwordConfirm',{
          required:'this field is required ',
          validate:(value)=> value ===  getValues().password || 'password didnot matched'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
