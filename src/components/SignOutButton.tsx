'use client'

import { signIn, signOut } from "next-auth/react"
import { FC, useState } from "react"
import Button from "./ui/Button"
import { toast } from "./ui/Toast"

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signUserOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error Sigining Out',
        message: 'Please try again',
        type: 'error'
      })
    }
  }

  return <Button onClick={signUserOut} isLoading={isLoading}>Sign Out</Button>
}

export default SignOutButton