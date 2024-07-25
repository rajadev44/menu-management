import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="w-svw my-14">
      <Card className='w-full max-w-sm m-auto shadow-xl'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label> 
            <Input
              id='email'
              type='email'
              placeholder='JohnDoe@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' required />
          </div>
        </CardContent>
        <CardFooter>
          <Link to='/dashboard'>
          <Button className='w-full' onClick={()=>{
          }}>Sign in</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
