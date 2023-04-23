'use client'

import { createApiKey } from "@/helpers/create-api-key";
import { revokeApiKey } from "@/helpers/revoke-api-key";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import Button from "./ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { toast } from "./ui/Toast";

interface ApiKeyOptionsProps {
  apiKeyId: string
  apiKeyKey: string
}

const ApiKeyOptions:FC<ApiKeyOptionsProps> = ({apiKeyId, apiKeyKey}) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
  const [isRevoking, setIsRevoking] = useState<boolean>(false)
  const router = useRouter()

  const createNewApiKey = async () => {
    setIsCreatingNew(true)
    try {
      await revokeApiKey({keyId: apiKeyId})
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: "Error Creating API Key",
        message: 'Please try again',
        type: 'error'
      })
    }
    finally{
      setIsCreatingNew(false)
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true)
    try {
      await revokeApiKey({keyId: apiKeyId})
      router.refresh()
    } catch (error) {
      toast({
        title: "Error revoking API Key",
        message: 'Please try again',
        type: 'error'
      })
    }
    finally{
      setIsRevoking(false)
    }
  }

  return <DropdownMenu>
    <DropdownMenuTrigger
      disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>
            {isCreatingNew ? 'Creating New key': isRevoking ? 'Revoking' : 'Options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4 " />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=> {navigator.clipboard.writeText(apiKeyKey)
        toast({
          title:'Copied',
          message: 'API Key is copied to your clipboard',
          type: 'success'
        })
        }}>
            Copy
        </DropdownMenuItem>

        <DropdownMenuItem onClick={createNewApiKey}>
          Create New Key
        </DropdownMenuItem>

        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke Key
        </DropdownMenuItem>
      </DropdownMenuContent>
  </DropdownMenu>
}

export default ApiKeyOptions