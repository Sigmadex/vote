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
  let mostVoted = [] // stores indexes of proposals with most votes
  let mostVotes = 0
  let voteCounts = 0
  let totalVotes = 0

  if (proposals.length) {
    voteCounts = proposals.map(proposal => Number(proposal.voteCount._hex))
    mostVotes = voteCounts.sort((a, b) => b - a)[0]
    totalVotes = voteCounts.reduce((a, c) => a + c)
    for (let i = 0; i < proposals.length; i++) {
      if (Number(proposals[i].voteCount._hex) === mostVotes) {
        mostVoted.push(i)
      }
    }
  }

  return (
    <div>
      {proposals.map((proposal, index) => {
        const name = parseName(parseBytes(proposal.name))
        const pct = Number(proposal.voteCount._hex) / totalVotes
        return (
          <div key={index} style={{display: 'inline-block', marginBottom: 4}}>
            <div style={{width: '150px', float: 'left', textAlign: 'left', fontWeight: mostVoted.includes(index) ? 600 : 'normal'}}>
              Option {name}
            </div>
            <div style={{width: '45px', float: 'left', textAlign: 'left', fontWeight: 600}}>
              {parseInt(pct * 100)}%
            </div>
            <div style={{width: '267px', float: 'left'}}>
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