'use client'

import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import { FC, FormEvent, useState } from "react";
import CopyButton from "@/components/CopyButton";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { toast } from "@/ui/Toast";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

const RequestApiKey: FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string | null>(null)

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const generatedApiKey = await createApiKey()
      setApiKey(generatedApiKey)
    } catch (error) {
      if(error instanceof Error){
        toast({
          title: 'Error', 
          message: error.message,
          type: 'error'
        })
        return
      }
      toast({
        title: 'IDK',
        message: 'Something went wrong',
        type: 'error'
      })
    } finally {
      setIsCreating(false)
    }
    
  }

  return <div className="container md:max-w-2xl ">
    <div className="flex flex-col gap-6 items-center">
      <Key className="h-12 w-12 text-gray-400 " />
      <LargeHeading>Request your Api Key</LargeHeading>
      <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
    </div>
    <form action="#" onSubmit={createNewApiKey} className='mt-6 sm:flex sm:items-center'>
      <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
        {apiKey ? (<CopyButton type='button' valueToCopy={apiKey} className='absolute inset-y-0 right-0 animate-in fade-in duration-300'/>
        ) : null}
        <Input readOnly value={apiKey ?? ''} placeholder='Request an api key'/>
      </div>
      <div className="flex justify-center mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0 ">
        <Button disabled={!!apiKey} isLoading={isCreating}>Request Key</Button>
      </div>
    </form>
  </div>
}

export default RequestApiKey