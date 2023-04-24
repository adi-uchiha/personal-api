'use client'

import { signIn } from "next-auth/react"
import { FC, useState } from "react"
import GoogleSvg from "./GoogleSvg"
import Button from "./ui/Button"
import { toast } from "./ui/Toast"

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      // console.log(error)
      toast({
        title: 'Error Sigining In',
        message: 'Please try again',
        type: 'error'
      })
    }
  }

  return <Button onClick={signInWithGoogle} isLoading={isLoading}>
    {isLoading ? null : (<GoogleSvg />)}
    Sign In</Button>
}

export default SignInButton