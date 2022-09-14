var styles = {
  progressBar: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: 10,
    width: '100%',
    borderRadius: '10px',
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
  return (
    <div
      className='filler'
      style={{
        backgroundColor: '#B3BEC6',
        height: '100%',
        borderRadius: 'inherit',
        transition: 'width .2s ease-in',
        width: `${percent}%`,
      }}
    />
  )
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
    // TODO: - Most votes needs heavier font weight
    Object.keys(proposals).map((proposal, i) => {
      let pct = proposals[proposal] / totalVotes
      return (
        <div key={i} style={{display: 'inline-block', marginBottom: 7}}>
          <div style={{width: '150px', float: 'left', textAlign: 'left'}}>
            Option {proposal}
          </div>
          <div style={{width: '45px', float: 'left', textAlign: 'left', fontWeight: 600}}>
            {parseInt(pct * 100)}%
          </div>
          <div style={{width: '267px', float: 'left'}}>
            {/* TODO: - Align vertically */}
            <div style={{marginTop: 5}}>
              <ProgressBar percentage={pct * 100} />
            </div>
          </div>
        </div>
      )
    })

  )
}

export default Charts
