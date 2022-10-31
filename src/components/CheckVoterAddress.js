const CheckVoterAddress = ({
  voterAddressToCheck,
  setVoterAddressToCheck,
  checkAddressVoter,
  voterStatus,
}) => {
  const handleNewAddressToCheckVote = (e) => {
    setVoterAddressToCheck(e.target.value);
  };

  if (voterStatus) {
    console.log(voterStatus.voted)
  }

  return (
    <div>
      <h4>Check if an address vote status</h4>
      <div
        style={{
          width: '15em',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <input
          value={voterAddressToCheck}
          onChange={handleNewAddressToCheckVote}
        />
        <button onClick={checkAddressVoter}>Check</button>
      </div>
      {voterStatus !== 'An error has occured' && voterStatus && (
        
        /* 
        <div style={{ paddingTop: '2em' }}>
          <h4>Voter Status</h4>
          <p>Account: {voterAddressToCheck}</p>
          <p>Voted: {voterStatus?.voted?.toString()}</p>
          <p>Vote Weight: {Number(voterStatus?.weight?._hex)}</p>
        </div>
        */

        <div>
          {/* {voterStatus?.voted?.toString()} */}
          {voterStatus?.voted
            ? <h3>Already Voted, Show Results</h3>
            : <h3>Not Voted, Select Proposal</h3>}
        </div>

      )}{' '}
      {voterStatus === 'An error has occured' && <p>{voterStatus}</p>}
    </div>
  );
};

export default CheckVoterAddress;