import { useRef } from 'react'

import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useTransition } from '@remix-run/react'

import type { AlertDialogProps } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import Button from '~/components/atoms/Button'
import Form from '~/components/atoms/Form'
import { deletePuzzle } from '~/models/puzzle.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const puzzleId = formData.get('id')

  if (typeof puzzleId !== 'string') return json({}, { status: 400 }) // TODO: toast error management

  await deletePuzzle(puzzleId)

  return json({})
}

interface DeletePuzzleDialogProps {
  puzzleId: string
  isOpen: AlertDialogProps['isOpen']
  onClose: AlertDialogProps['onClose']
}
const DeletePuzzleDialog = ({
  puzzleId,
  isOpen,
  onClose,
}: DeletePuzzleDialogProps) => {
  const transition = useTransition()
  const isLoading = Boolean(transition.submission)

  const cancelRef = useRef<HTMLButtonElement>(null)
  const puzzleTitle = "Intitulé de l'énigme"

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Supprimer « {puzzleTitle} »
          </AlertDialogHeader>

          <AlertDialogBody>
            Êtes vous sur de vouloir supprimer cette énigme ? <br />
            Vous ne pourrez pas annuler cette action par la suite.
          </AlertDialogBody>

          <AlertDialogFooter gap={2}>
            <Button
              size="md"
              ref={cancelRef}
              variant="outline"
              onClick={onClose}
              ml={3}
            >
              Annuler
            </Button>
            <Form method="delete" display="flex">
              <input type="hidden" name="id" value={puzzleId} readOnly />
              <Button
                type="submit"
                variant="destructive"
                size="md"
                disabled={isLoading}
              >
                {isLoading ? 'Suppression en cours...' : 'Supprimer'}
              </Button>
            </Form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeletePuzzleDialog
