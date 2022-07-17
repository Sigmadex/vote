<img src="https://user-images.githubusercontent.com/33762147/155625647-55c69f06-e0ea-44a8-a425-7aa086c329c5.png" style="border-radius:50%;width:72px;">

# React Front-End for Voting Interface

## Summary

This application enables select whitelisted wallet addresses to vote on a proposal.

## How it Works

A user will be able to connect their wallet and place a vote on if their wallet address is whitelisted in the smart contract. Votes will be stored on-chain in an array that can be called through Web3 API.

The voting interface consists of 2 elements:

* React front-end
  *  For interacting with the voting smart contract (client side)
     * Submitting a vote
     * Viewing statistics
  * Statistics panel (admin side)
     * Associate wallet ID with vote and weight
* Smart contract itself
  * Verifying eligibility 
  * Storing votes
  * Supplying stats
  * Add weighted parameters
  * Ending voting session

## Proposed Flow Diagram

<div align="center">

![index](https://user-images.githubusercontent.com/33762147/174503642-b17d0abd-690b-4e96-82dd-aa9269936eed.png)

 </div>
 
## Figma Design

![2022-06-15_18-15-53](https://user-images.githubusercontent.com/33762147/173963247-a91c26a9-c0fe-482b-ac37-f6dce3f24001.jpg)
