function Modal({displayModal, toggleModal}) {
  return (
    <div
      className='modal'
      style={{display: displayModal ? 'block' : 'none'}}
      onClick={() => toggleModal(!displayModal)}
    >
      <div className='modal-content' style={{textAlign: 'center'}}>
        <span>
          <img
            style={{width: '32px', height: '32px', marginBottom: 20}}
            alt='Warning'
            src='/images/warning.svg'
          />
        </span>
        <span style={{width: 218}}>
          This wallet does not hold a vote NFT.
        </span>
      </div>
    </div>
  )
}

export default Modal