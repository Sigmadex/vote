// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Proposals {
  string[] public createdProposals;

  function getProposals() view public returns(string[] memory) {
    return createdProposals;
  }

  function create(string calldata _description) external {
    createdProposals.push(_description);
  }
}
