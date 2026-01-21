import React from 'react'

export default function Button({name,className,submit , onClick}) {
  return (
   <button onClick={onClick} className={`rounded-md transition-all duration-200 px-3 py-1 ${className}`} type={submit}>{name}</button>
  )
}
