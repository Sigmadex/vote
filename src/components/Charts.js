import { parseName, parseBytes } from '../utils';

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

const Charts = ({proposals}) => {
  let totalVotes = Object.values(proposals).reduce((a, c) => a + c)
  let percentage = 100
  let mostVoted = ''
  let voteCounts = 0

  if (proposals.length) {
    console.log(proposals)
    // voteCounts = proposals.map(proposal => Number(proposal.voteCount._hex))
    // mostVoted = proposals.sort((a, b) => b[1] - a[1]).shift()[0]
    // console.log(mostVoted)
  }

  return (
    // TODO: - Most votes needs heavier font weight (if voteCount === mostVotes, font is bold)
    <div>
      {proposals.map((proposal, index) => {
        const name = parseName(parseBytes(proposal.name)) 
        const pct = Number(proposal.voteCount._hex)
          
        return (
          <div key={index} style={{display: 'inline-block', marginBottom: 4}}>
            <div style={{width: '150px', float: 'left', textAlign: 'left'}}>
              Option {name}
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
      })}
    </div>
  )
}

export default Charts