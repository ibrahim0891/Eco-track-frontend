import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

export function ForgetPassword({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Ecotrack</span>
            </a>
            <h1 className="text-xl font-bold">Forget Password</h1>
            
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </Field>
          <Field>
            <Button type="submit">Reset Password</Button>
          </Field>
                  
        </FieldGroup>
        <div className="flex items-center justify-center py-16 ">
            <Link to="/auth/login">
                <Button variant={'ghost'} className={'hover:underline cursor-pointer'}> Back to Login </Button>
            </Link>
        </div>
      </form>
      
    </div>
  );
}
