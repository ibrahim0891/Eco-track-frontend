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
import { firebaseErrorMessages } from "@/constants/firebaseErrorMessages";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export function SignupForm({ ...props }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [passwordError, setPasswordError] = useState(null);

    const auth = useAuth();

    const handleSignup = (e) => {
        e.preventDefault();
        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const minLength = /^.{6,}$/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        if (email && password && name && photoURL) {
            if (!hasUppercase.test(password)) {
                setPasswordError(
                    "Password must have at least one uppercase letter."
                );
                return;
            }
            if (!hasLowercase.test(password)) {
                setPasswordError(
                    "Password must have at least one lowercase letter."
                );
                return;
            }
            if (!minLength.test(password)) {
                setPasswordError(
                    "Password must be at least 6 characters long."
                );
                return;
            }
            if (!hasSpecialChar.test(password)) {
                setPasswordError(
                    "Password must have at least one special character."
                );
                return;
            }

            auth.createUser(email, password, name, photoURL);
            {
                auth.error &&
                    toast.error(
                        firebaseErrorMessages[auth.error?.code] ||
                            "An unexpected error occurred. Please try again."
                    );
            }
        } else {
            toast.error("Please fill in all fields.");
        }
    };

    const handleGoogleLogin = () => {
        auth.googleSignIn();
    };
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Join Eco track today</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignup}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor='name'>Full Name</FieldLabel>
                            <Input
                                id='name'
                                type='text'
                                placeholder='John Doe'
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='email'>Email</FieldLabel>
                            <Input
                                id='email'
                                type='email'
                                placeholder='m@example.com'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FieldDescription>
                                We'll never share your email with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='photoURL'>
                                Photo URL
                            </FieldLabel>
                            <Input
                                id='photoURL'
                                type='url'
                                placeholder='https://example.com/photo.jpg'
                                required
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                            <FieldDescription>
                                Provide a link to your profile picture.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='password'>Password</FieldLabel>
                            <Input
                                id='password'
                                type='password'
                                placeholder='••••••••'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && (
                                <FieldDescription className={"text-red-500"}>
                                    {passwordError}
                                </FieldDescription>
                            )}
                        </Field>

                        <FieldGroup>
                            <Field>
                                <Button type='submit'>
                                    {auth.loading
                                        ? "Please wait..."
                                        : "Create Account"}
                                </Button>
                                <Button
                                    variant='outline'
                                    type='button'
                                    onClick={() => {
                                        handleGoogleLogin();
                                    }}
                                >
                                    Sign up with Google
                                </Button>
                                <FieldDescription className='px-6 text-center'>
                                    Already have an account?{" "}
                                    <Link to='/auth/login'>Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
