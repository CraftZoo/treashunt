import { Link } from '@remix-run/react'

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'

import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'

import DeletePuzzleDialog from './DeletePuzzleDialog'

export { action } from './DeletePuzzleDialog'

interface PuzzleActionMenuProps {
  puzzleId: string
}

const PuzzleActionMenu = ({ puzzleId }: PuzzleActionMenuProps) => {
  const actionsLabel = 'Actions'
  const deleteLabel = "Supprimer l'énigme"
  const editLabel = "Modifier l'énigme"

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Menu>
        <Tooltip label={actionsLabel} placement="top">
          <MenuButton
            as={IconButton}
            icon={<MoreHorizontal />}
            variant="link"
            aria-label={actionsLabel}
            height="min-content"
          />
        </Tooltip>

        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/puzzles/${puzzleId}`}
            icon={<Edit size={14} />}
          >
            {editLabel}
          </MenuItem>
          <MenuItem icon={<Trash2 size={14} />} onClick={onOpen}>
            {deleteLabel}
          </MenuItem>
        </MenuList>
      </Menu>

      <DeletePuzzleDialog
        puzzleId={puzzleId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default PuzzleActionMenu
