import { chakra, Box } from '@chakra-ui/react'

import type { Editor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'

const StyledEditor = chakra(EditorContent, {
  baseStyle: {
    '.ProseMirror': {
      '.is-empty::before': {
        content: 'attr(data-placeholder)',
        float: 'left',
        color: 'gray.400',
        pointerEvents: 'none',
        height: 0,
      },
      p: 2,
      '> * + *': {
        marginTop: '0.75em',
      },
      '&:focus': {
        outline: 'none',
      },
      h1: {
        fontSize: '1.875rem',
      },
      h2: {
        fontSize: '1.875rem',
      },
      h3: {
        fontSize: '1.5rem',
      },
      h4: {
        fontSize: '1.25rem',
      },
      h5: {
        fontSize: '1.125rem',
      },
      'h1, h2, h3, h4,  h5, h6 ': {
        lineHeight: '1.1',
        fontWeight: '700',
      },
      'ul, ol': {
        padding: '0 1.2rem',
      },
      code: {
        bg: 'rgba(arsenic, 0.1)',
        color: 'arsenic',
      },
      pre: {
        bg: 'gray.800',
        color: 'white',
        padding: '0.75rem 1rem',
        rounded: 'lg',
        whiteSpace: 'pre-wrap',
        code: {
          color: 'inherit',
          p: 0,
          background: 'none',
          fontSize: '0.8rem',
        },

        '.hljs-comment, .hljs-quote': {
          color: 'arsenic',
        },

        '.hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class':
          {
            color: '#F98181',
          },

        '.hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params':
          {
            color: '#FBBC88',
          },

        '.hljs-string, .hljs-symbol, .hljs-bullet': {
          color: '#B9F18D',
        },

        '.hljs-title, .hljs-section': {
          color: '#FAF594',
        },

        '.hljs-keyword, .hljs-selector-tag': {
          color: '#70CFF8',
        },

        '.hljs-emphasis': {
          fontStyle: 'italic',
        },

        '.hljs-strong': {
          fontWeight: 700,
        },
      },
      blockquote: {
        pl: 4,
        borderLeft: '2px solid rgba(13, 13, 13, 0.1)',
      },
      img: {
        maxW: 'full',
        h: 'auto',
      },
      mark: {
        bg: '#FAF594',
      },
      hr: {
        border: 'none',
        borderTop: '2px solid rgba(#0D0D0D, 0.1)',
        margin: '2rem 0',
      },
    },
  },
})

interface EditorFieldProps {
  editor: Editor
}

const EditorField = ({ editor }: EditorFieldProps) => {
  return (
    <Box
      bg="white"
      p={2}
      minH={48}
      border="1px solid"
      borderColor="gray.100"
      borderBottomRadius="xl"
      borderTopWidth={0}
    >
      <StyledEditor editor={editor} />
    </Box>
  )
}

export default EditorField
