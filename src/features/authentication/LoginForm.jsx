import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { login } from "../../services/apiAuth";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("sabya123@gmail.com");
  const [password, setPassword] = useState("87654321");
  const{login,isLoading}=useLogin()

  function handleSubmit(e) {
 e.preventDefault();
 if(!email || !password ) return ;
   login({email,password},{
    onSettled:()=>{
      setEmail('');
      setPassword('');
    }
   })

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoading}>{isLoading ? <SpinnerMini/> : 'log in ' }</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
