import { useEffect } from 'react'

import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import type { EditorEvents } from '@tiptap/react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import EditorField from './EditorField'
import EditorToolbar from './EditorToolbar'

export type EditorProps = {
  value: string
  placeholder?: string
  onChange: (value: EditorEvents['update']) => void
} & BoxProps

const Editor = ({ value, placeholder, onChange, ...rest }: EditorProps) => {
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
    onUpdate: onChange,
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
      <EditorToolbar editor={editor} />
      <EditorField editor={editor} />
    </Box>
  )
}

export default Editor
