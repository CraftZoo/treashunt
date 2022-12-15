import { Divider } from '@chakra-ui/react'

import type { Editor } from '@tiptap/react'
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  ListOrdered,
  ListPlus,
  Pilcrow,
  Quote,
  Redo,
  SeparatorHorizontal,
  Underline,
  Undo,
} from 'lucide-react'

import EditorOptionButton from '~/components/atoms/EditorOptionButton'
import EditorOptionsWrapper from '~/components/atoms/EditorOptionsWrapper'

interface EditorToolbarProps {
  editor: Editor
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <EditorOptionsWrapper>
      <EditorOptionButton
        aria-label="Mettre en gras"
        icon={<Bold />}
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <EditorOptionButton
        aria-label="Mettre en italic"
        icon={<Italic />}
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <EditorOptionButton
        aria-label="Mettre en souligné"
        icon={<Underline />}
        isActive={editor.isActive('underline')}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <Divider orientation="vertical" />
      <EditorOptionButton
        isActive={editor.isActive('heading', { level: 1 })}
        aria-label="Définir un titre de premier niveau"
        icon={<Heading1 />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />
      <EditorOptionButton
        isActive={editor.isActive('heading', { level: 2 })}
        aria-label="Définir un titre de deuxième niveau"
        icon={<Heading2 />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />
      <EditorOptionButton
        isActive={editor.isActive('heading', { level: 3 })}
        aria-label="Définir un titre de troisème niveau"
        icon={<Heading3 />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      />
      <EditorOptionButton
        isActive={editor.isActive('heading', { level: 4 })}
        aria-label="Définir un titre de quatrième niveau"
        icon={<Heading4 />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      />
      <EditorOptionButton
        aria-label="Définir un paragraphe"
        icon={<Pilcrow />}
        isActive={editor.isActive('paragraph')}
        onClick={() => editor.chain().focus().setParagraph().run()}
      />
      <EditorOptionButton
        aria-label="Définir une liste à puce"
        icon={<ListPlus />}
        isActive={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <EditorOptionButton
        aria-label="Définir une liste ordonnée"
        icon={<ListOrdered />}
        isActive={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <Divider orientation="vertical" />
      <EditorOptionButton
        aria-label="Définir un bloc de code"
        icon={<Code />}
        isActive={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      <EditorOptionButton
        aria-label="Définir une citation"
        icon={<Quote />}
        isActive={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <EditorOptionButton
        aria-label="Définir une règle horizontale"
        icon={<SeparatorHorizontal />}
        onClick={() => editor.chain().setHorizontalRule().run()}
      />
      <Divider orientation="vertical" />

      <EditorOptionButton
        aria-label="Revenir en arrière"
        icon={<Undo />}
        onClick={() => editor.chain().undo().run()}
      />
      <EditorOptionButton
        aria-label="Revenir en avant"
        icon={<Redo />}
        onClick={() => editor.chain().redo().run()}
      />
    </EditorOptionsWrapper>
  )
}

export default EditorToolbar
