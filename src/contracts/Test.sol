// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {
    struct Voter {
        uint256 weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
        address delegate; // person delegated to
        uint256 vote; // index of the voted proposal
    }

    struct Option {
        bytes32 name; // short name (up to 32 bytes)
        uint256 voteCount; // number of accumulated votes
    }

    // struct inside a struct 
    struct Proposal {
        string id;
        // string description;
        // string url;
        // bool done;
        // string[] options;
        Option[] options; // mapping(uint => Option[]) options;
    }

    address public chairperson;
    // map of proposals (proposal ID is the key, proposal struct is the value)
    mapping(string => Proposal) public proposals;
    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    constructor() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
    }

    /* Functions */
    function addOptionToProposal(string memory id, bytes32 option) public {
        proposals[id].options.push(Option({name: option, voteCount: 0}));
    }

    function getProposalOptions(string memory id) external view returns (Option[] memory) {
        Option[] memory items = new Option[](proposals[id].options.length);
        for (uint i = 0; i < proposals[id].options.length; i++) {
            items[i] = proposals[id].options[i];
        }
        return items;
    }

    // function giveRightToVote()
    // function delegate()
    // function vote()
}