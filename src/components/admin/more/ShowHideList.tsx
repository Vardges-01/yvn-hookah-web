import { ChevronUp, ChevronDown } from 'lucide-react'

export const ShowHideList = ({title,isOpen, handleClick}) => {
  return (
    <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <button
      onClick={() => handleClick(!isOpen)}
      className="text-gray-400 hover:text-white"
    >
      {isOpen ? (
        <ChevronUp className="w-6 h-6" />
      ) : (
        <ChevronDown className="w-6 h-6" />
      )}
    </button>
  </div>
  )
}
