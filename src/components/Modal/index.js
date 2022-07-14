import { useState } from 'react'

function Modal({text}) {
  const [modalOpen, toggleModal] = useState(false)

  return (
    <div>
      <button onClick={() => toggleModal(!modalOpen)}>toggle modal</button>
      <div
        className='modal'
        style={{display: modalOpen ? 'block' : 'none'}}
        onClick={() => toggleModal(!modalOpen)}
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <img
              style={{width: '32px', height: '32px'}}
              alt='Warning'
              src='/images/warning.png'
            />
          </div>
          <div className="modal-body">
            <p>
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
