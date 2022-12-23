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

import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'

import type { Puzzle } from '~/models/puzzle.server'

import DeletePuzzleDialog from './DeletePuzzleDialog'

export { action } from './DeletePuzzleDialog'

interface PuzzleActionMenuProps {
  puzzle: Pick<Puzzle, 'id' | 'slug'>
}

const PuzzleActionMenu = ({ puzzle }: PuzzleActionMenuProps) => {
  const actionsLabel = 'Actions'
  const previewLabel = "Prévisualiser l'énigme"
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
            target="_blank"
            to={`/puzzles/${puzzle.slug}`}
            icon={<Eye size={14} />}
          >
            {previewLabel}
          </MenuItem>
          <MenuItem
            as={Link}
            to={`/admin/puzzles/${puzzle.id}`}
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
        puzzleId={puzzle.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default PuzzleActionMenu
