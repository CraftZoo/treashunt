import { useEffect } from 'react'

import { useToast as useChakraToast } from '@chakra-ui/react'

import type { MessagePayload } from '~/session.server'

export const useToast = (toastMessage: MessagePayload | null) => {
  const toast = useChakraToast()

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    toast({ isClosable: true, ...toastMessage })
  }, [toastMessage, toast])
}
