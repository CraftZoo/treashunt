import type { Document } from '@contentful/rich-text-types'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Text from '../atoms/Text'
import Bold from '../atoms/Bold'

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
  },
}

const RichText = (json: Document) => {
  return documentToReactComponents(json, options)
}

export default RichText
