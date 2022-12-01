import { useNavigate } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

type GoBackButtonProps = {
  children: React.ReactNode
}
const GoBackButton = ({ children }: GoBackButtonProps) => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <button onClick={goBack}>
      <ArrowLeft />
      {children}
    </button>
  )
}

export default GoBackButton
