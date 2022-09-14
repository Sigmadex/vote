import { useState } from 'react'

let proposal = {
  options: [
    {
      optionName: 'A',
      optionDescription: ''
    },
    {
      optionName: 'B',
      optionDescription: ''
    },
    {
      optionName: 'C',
      optionDescription: ''
    }
  ]
}

const optionButtonStyles = {
  fontFamily: 'Work Sans',
  width: '142px',
  height: '109px',
  background: '#FFFFFF',
  border: '1px solid #B3BEC6',
  boxShadow: '0px 4px 20px rgba(166, 194, 215, 0.3)',
  borderRadius: '20px',
  cursor: 'pointer',
  color: '#404C55'
}

const disabledOptionButtonStyles = {
  fontFamily: 'Work Sans',
  width: '142px',
  height: '109px',
  background: '#ECF2F5',
  borderStyle: 'none',
  boxShadow: '0px 4px 20px rgba(166, 194, 215, 0.3)',
  borderRadius: '20px',
  cursor: 'not-allowed',
  color: '#B3BEC6'
}

function Test() {
  let [selectedOption, setOption] = useState(null)
  let options = ['A', 'B', 'C']

  function castVote() {
    if (selectedOption) {
      console.log('casting vote for', selectedOption)
    } else {
      alert('Please select an option')
    }
  }

  return (
    <div>
      <h1>Test</h1>
      {options.map((option, i) =>
        <button
          key={i}
          style={optionButtonStyles}
          onClick={() => setOption(option)}
        >
          <div style={{fontWeight: '700', fontSize: '14px'}}>Option</div>
          <div style={{fontWeight: '700', fontSize: '40px'}}>{option}</div>
        </button>
      )}
      Selected option: {selectedOption}
      <button onClick={() => castVote()}>Cast Vote</button>
    </div>
  )
}

export default Test
