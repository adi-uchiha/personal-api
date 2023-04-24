'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import GoogleSvg from './GoogleSvg'
import Button from './ui/Button'
import { toast } from './ui/Toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        message: 'There was an error logging in with Google',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
        isLoading={isLoading}
        type='button'
        className='max-w-sm w-full bg-slate-200'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {isLoading ? null : (
          <GoogleSvg />
        )}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm
