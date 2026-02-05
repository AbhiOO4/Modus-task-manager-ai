import React from 'react'
import { X } from 'lucide-react' 

function Modal({open, onClose, children}) {
  return (
    //backdrop
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center trasition-colors ${open? 'visible bg-black/30': 'invisible'}`}>
          <div onClick={e=> e.stopPropagation()} className={`bg-base-100 rounded-xl shadow p-6 transition-all ${open? 'scale-100 opacity-100': 'scle-125 opacity-0'  }`}>
                <button onClick={onClose} className='absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-gray-100'><X/></button>
              {children}
          </div>
    </div>
  )
}

export default Modal
