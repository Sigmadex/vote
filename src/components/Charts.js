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

const Charts = ({proposals3}) => {
  let proposals = {
    "Oranges": 2,
    "Apples": 1,
    "Mangoes": 1
  }
  // console.log(proposals3)
  let totalVotes = Object.values(proposals).reduce((a, c) => a + c)
  let percentage = 100
  let mostVoted = ''
  if (proposals3.length) {

    let voteCounts = proposals3.map(proposal => Number(proposal.voteCount._hex))
    // console.log(voteCounts)

    // console.log(proposals3);
    // mostVoted = proposals3.sort((a, b) => b[1] - a[1]).shift()[0]
  }

    // Object.keys(proposals).map((proposal, i) => {
    //   let pct = proposals[proposal] / totalVotes
    //   return (
    //     <div key={i} style={{display: 'inline-block', marginBottom: 4}}>
    //       <div style={{width: '150px', float: 'left', textAlign: 'left'}}>
    //         Option {proposal}
    //       </div>
    //       <div style={{width: '45px', float: 'left', textAlign: 'left', fontWeight: 600}}>
    //         {parseInt(pct * 100)}%
    //       </div>
    //       <div style={{width: '267px', float: 'left'}}>
    //         {/* TODO: - Align vertically */}
    //         <div style={{marginTop: 5}}>
    //           <ProgressBar percentage={pct * 100} />
    //         </div>
    //       </div>
    //     </div>
    //   )
    // })

  return (
    <div>
        {proposals3.map((proposal, index) => {
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

    // TODO: - Most votes needs heavier font weight (if voteCount === mostVotes, font is bold)

    /* 
        {proposals.map((proposal, index) => {
          const name = parseName(parseBytes(proposal.name));
          const voteCount = proposal.voteCount._hex;
          return (
            <div key={index} style={{ padding: '1rem 0' }}>
              🗳 {name} - {Number(voteCount)}
              <button
                style={{ marginLeft: '2em' }}
                onClick={() => voteProposal(index)}
              >
                Vote
              </button>
            </div>
          );
        })}
    */
    // {proposals3.map((proposal, index) => {  
    //   const name = proposal.name 
    //   return (
    //     <h3>{name}</h3>
    //   )
    // })}

    // Object.keys(proposals).map((proposal, i) => {
    //   let pct = proposals[proposal] / totalVotes
    //   return (
    //     <div key={i} style={{display: 'inline-block', marginBottom: 4}}>
    //       <div style={{width: '150px', float: 'left', textAlign: 'left'}}>
    //         Option {proposal}
    //       </div>
    //       <div style={{width: '45px', float: 'left', textAlign: 'left', fontWeight: 600}}>
    //         {parseInt(pct * 100)}%
    //       </div>
    //       <div style={{width: '267px', float: 'left'}}>
    //         {/* TODO: - Align vertically */}
    //         <div style={{marginTop: 5}}>
    //           <ProgressBar percentage={pct * 100} />
    //         </div>
    //       </div>
    //     </div>
    //   )
    // })

    // proposals3.map((proposal, i) => {
    //   let pct = proposal[1] / totalVotes
    //   return (
    //     <div key={i} style={{display: 'inline-block', marginBottom: 4}}>
    //       <div style={{width: '150px', float: 'left', textAlign: 'left', fontWeight: proposal[0] === mostVoted ? 'bold' : 'normal'}}>
    //         Option {proposal[0]}
    //       </div>
    //       <div style={{width: '45px', float: 'left', textAlign: 'left', fontWeight: 600}}>
    //         {parseInt(pct * 100)}%
    //       </div>
    //       <div style={{width: '267px', float: 'left'}}>
    //         {/* TODO: - Align vertically */}
    //         <div style={{marginTop: 5}}>
    //           <ProgressBar percentage={pct * 100} />
    //         </div>
    //       </div>
    //     </div>
    //   )
    // })