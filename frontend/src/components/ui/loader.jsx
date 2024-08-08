import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

const Loader = ({className}) => {
  return (
    <Loader2Icon className={cn('animate-spin text-primary', className)}></Loader2Icon>
  )
}

export default Loader