var styles = {
  progressBar: {
    // backgroundColor: '#ed1c24',
    backgroundColor: 'transparent',
    position: 'relative',
    height: 10,
    width: '100%',
    borderRadius: '10px',
    // border: '1px solid #333'
  },
  filler: {
    backgroundColor: '#B3BEC6',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
    width: '50%',
  },
}

const ProgressBar = (props) => {
  return(
    <div className='progress-bar' style={styles.progressBar}>
      <Filler percentage={props.percentage} />
    </div>
  );
}

const Filler = (props) => {
  const percent = props.percentage > 100 ? 100 : props.percentage;
  // return <div className='filler' style={styles.filler} />
  return <div className='filler' style={{
    backgroundColor: '#B3BEC6',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in',
    width: `${percent}%`,
  }} />
  // return(
  //   <div className='filler' style={{width: `${props.percentage}%`}}>
  //     {isNaN(props.percentage)
  //       ? '0'
  //         : props.percentage}
  //   </div>
  // )
}

const Charts = () => {
  let proposals = {
    "Oranges": 2,
    "Apples": 1,
    "Mangoes": 1
  }
  let totalVotes = Object.values(proposals).reduce((a, c) => a + c)
  let percentage = 100

  return (
    <div>
      <h1>Vote Portal</h1>
      <span>Your vote has been recorded on chain.</span>

      <ul>
        {Object.keys(proposals).map(proposal => {
          let pct = proposals[proposal] / totalVotes
          // <li>{proposal}: {proposals[proposal]}</li>
          return (
            <li>{proposal}: - {pct} - <ProgressBar percentage={pct * 100} /></li>
          )
        })}
      </ul>

      {/* <ProgressBar percentage={percentage} /> */}
    </div>
  )
}

export default Charts
