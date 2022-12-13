import { useEffect } from 'react'

import type { BoxProps } from '@chakra-ui/react'
import { Box, forwardRef } from '@chakra-ui/react'

import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import EditorField from './EditorField'
import EditorToolbar from './EditorToolbar'

export type EditorProps = {
  value: string
  defaultValue: string
  placeholder?: string
  name: string
  onChange: (value: string) => void
} & BoxProps

const Editor = forwardRef<EditorProps, 'div'>(
  ({ value, defaultValue, name, placeholder, onChange, ...rest }, ref) => {
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
      onUpdate: ({ editor }) => onChange(editor.getHTML()),
      autofocus: true,
      content: defaultValue,
    })

    useEffect(() => {
      editor && editor.commands.setContent(defaultValue)
    }, [editor, defaultValue])

    if (!editor) {
      return null
    }

    return (
      <Box
        position="relative"
        w="full"
        borderRadius="xl"
        boxShadow="sm"
        ref={ref}
        {...rest}
      >
        <input name={name} value={value} readOnly hidden />
        <EditorToolbar editor={editor} />
        <EditorField editor={editor} />
      </Box>
    )
  }
)

export default Editor
