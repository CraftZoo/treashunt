import type { BoxProps } from '@chakra-ui/react'
import { Box, Divider, MenuItem } from '@chakra-ui/react'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import type { EditorEvents } from '@tiptap/react'
import { EditorContent as TipTapEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  LineChart,
  ListOrdered,
  ListPlus,
  Quote,
} from 'lucide-react'
import Heading from '@tiptap/extension-heading'
import EditorOptionButton from '~/components/atoms/EditorOptionButton'
import EditorOptionMenu from '~/components/atoms/EditorOptionMenu'
import EditorOptionsWrapper from '~/components/atoms/EditorOptionsWrapper'

export type EditorContentProps = {
  value: string
  placeholder?: string
  onUpdate: (value: EditorEvents['update']) => void
} & BoxProps

const EditorContent = ({
  value,
  placeholder,
  onUpdate,
  ...rest
}: EditorContentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Insérer votre texte',
      }),
    ],
    onUpdate,
    autofocus: true,
    content: value,
  })

  useEffect(() => {
    editor && editor.setOptions({ content: value })
  }, [editor, value])

  if (!editor) {
    return null
  }

  return (
    <Box position="relative" p={4} {...rest} bg="white">
      <EditorOptionsWrapper>
        <EditorOptionMenu>
          <EditorOptionButton
            as={MenuItem}
            aria-label="Définir un titre de premier niveau"
            icon={<Heading1 />}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
          />
          <EditorOptionButton
            as={MenuItem}
            aria-label="Définir un titre de deuxième niveau"
            icon={<Heading2 />}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
          />
          <EditorOptionButton
            as={MenuItem}
            aria-label="Définir un titre de troisème niveau"
            icon={<Heading3 />}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 3 }).run()
            }
          />
          <EditorOptionButton
            as={MenuItem}
            aria-label="Définir un titre de quatrième niveau"
            icon={<Heading4 />}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          />
        </EditorOptionMenu>

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
          icon={<LineChart />}
          isActive={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <Divider orientation="vertical" />
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
      </EditorOptionsWrapper>

      <TipTapEditor editor={editor} />
    </Box>
  )
}

export default EditorContent
