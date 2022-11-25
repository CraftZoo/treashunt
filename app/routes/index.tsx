import QRCode from 'qrcode'

type PuzzleApi = {
  id: string
  slug: string
  title: string
}

const puzzles: Array<PuzzleApi> = [
  {
    id: 'puzzles-001',
    slug: 'slug-puzzles-001',
    title: 'This is the first puzzle',
  },
  {
    id: 'puzzles-002',
    slug: 'slug-puzzles-002',
    title: 'This is the second puzzle',
  },
]

const generateQr = async (slug: string) => {
  try {
    return await QRCode.toDataURL(slug)
  } catch (err) {
    console.error(err)
  }
}

const Index = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Puzzles list</h1>
      <ul>
        {puzzles.map(puzzle => (
          <li key={puzzle.id}>
            <Puzzle {...puzzle} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type PuzzleProps = PuzzleApi
const Puzzle = ({ slug, title }: PuzzleProps) => {
  const src = generateQr(slug)
  const alt = `QR Code of "${title}" puzzle`

  return (
    <article>
      <img src={src} height={100} width={100} alt={alt} />
      <p>
        <a href={slug}>{title}</a>
      </p>
    </article>
  )
}

export default Index
