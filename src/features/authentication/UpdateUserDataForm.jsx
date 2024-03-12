import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const{updateUser,isUpdating}=useUpdateUser();
    
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if(!fullName) return 
    updateUser({fullName,avatar,},{
      onSuccess:()=>{
        setAvatar(null);
        e.target.reset();
      }
    })
  }
  function handleClick(){
    setFullName(currentFullName);
    setAvatar(avatar);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled  />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          disabled={isUpdating}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" disabled={isUpdating}  variation="secondary" onClick={handleClick}>
          Cancel
        </Button>
        <Button disabled={isUpdating} >Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
