import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegUserMutation } from "@/features/api/authApi"
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSingupInput] = useState({
    name: "",
    email: "",
    password: "",

  });
  const [loginInput,setLonginInput]= useState({
    email: "",
    password: "",
  });

  const [regUser ,{data:regData,error:regError,isLoading:regIsLoading,isSuccess:regIsSuccess}] = useRegUserMutation();
  const [loginUser, {data:logInData,error:logInError,isLoading:logInIsLoading,isSuccess:logInIsSuccess}] = useLoginUserMutation();

  const navigate = useNavigate();


  const changeInputHandler = (e,type) => {
    const {name,value} = e.target;
    if(type === "signup"){
      setSingupInput({...signupInput,[name]:value});
    }else{
      setLonginInput({...loginInput,[name]:value});
    }
  };

  const handleReg = async (type) => {
    const inputData = type === "signup"? signupInput : loginInput;
    const action = type === "signup" ? regUser : loginUser;
    await action(inputData);

  };

  useEffect(() =>{
    if(regIsSuccess && regData){
      toast.success(regData.message || "Singup successful.");
    }
    if(regError){
      toast.error(regError.data.message || "Signup Failed");
    }
    if(logInError){
      toast.error(logInError.data.message || "Login Failed");
    }
    if(logInIsSuccess && logInData){
      toast.success(logInData.message || "Login successful.");
      navigate("/")
    }
    if(logInError){
      toast.error(logInError.data.message || "login Failed");
    }
  },[
    logInData,
    logInIsLoading,
    logInError,
    regData,
    regError,
    regIsLoading
  ]);

  return (
  <div className="flex justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">LogIn</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl">Signup</CardTitle>
            <CardDescription>
              Create a new account and click signup when you are done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="name" value={signupInput.name} onChange={(e) => changeInputHandler(e,"signup")} placeholder="Enter Your Name" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={signupInput.email} onChange={(e) => changeInputHandler(e,"signup")}   placeholder="abcd@gmail.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" value={signupInput.password} onChange={(e) => changeInputHandler(e,"signup")}  name="password" placeholder="Password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={regIsLoading} onClick= {() => handleReg("signup")}>
              {
                regIsLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                  
                ): "Signup"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl">Login</CardTitle>
            <CardDescription>
              Login your password here. After signup you will be logged in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={loginInput.email} onChange={(e) => changeInputHandler(e,"login")}  id="email" placeholder="abcd@gmail.com" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" value={loginInput.password} onChange={(e) => changeInputHandler(e,"login")} id="password" placeholder="Password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled = {logInIsLoading} onClick= {() => handleReg("login")}>
              {
                logInIsLoading ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                  </>
                  
                ): "Login"
              }
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default Login;