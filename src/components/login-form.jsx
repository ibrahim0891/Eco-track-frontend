import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { firebaseErrorMessages } from "@/constants/firebaseErrorMessages";

export function LoginForm({ className, ...props }) {
    const auth = useAuth();

    const handleGoogleLogin = () => {
        auth.googleSignIn();
    };

    const [email  , setEmail ] = useState()
    const [password , setPassword] = useState() 

    const handleLogin = (e) => {
        e.preventDefault();
        if(!email || !password) {
            return;
        }
        auth.login(email, password)
        
    }
    

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                    required 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <div className='flex items-center'>
                                    <FieldLabel htmlFor='password'>
                                        Password
                                    </FieldLabel>
                                    <Link
                                        to='/auth/forgot-password'
                                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Field>
                            
                            <p>
                                {auth.error && (
                                    <span className='text-sm text-red-600'>
                                        {firebaseErrorMessages[auth.error?.code] ||
                                            "An unexpected error occurred. Please try again."}
                                    </span>
                                )}
                            </p>
                                
                            <Field>
                                <Button type='submit' onClick={ (e)=> handleLogin(e)}> 
                                    {auth.loading ? "Logging in..." : "Login"}
                                </Button>
                                <Button
                                    variant='outline'
                                    type='submit'
                                    onClick={() => {
                                        handleGoogleLogin();
                                    }}
                                >
                                    Login with Google
                                </Button>
                                <FieldDescription className='text-center'>
                                    Don&apos;t have an account?{" "}
                                    <Link to='/auth/register'>Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
