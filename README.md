<img src="https://user-images.githubusercontent.com/33762147/155625647-55c69f06-e0ea-44a8-a425-7aa086c329c5.png" style="border-radius:50%;width:72px;">

# React Front-End for Voting Platform (SEP-002)

## Summary

This application enables select whitelisted wallet addresses to vote on the SEP-002 proposal:
* Launch strategy and options for going to market

## How it Works

A user will be able to connect their wallet and place a vote on if their wallet address is whitelisted in the smart contract. Votes will be stored on-chain in an array that can be called through Web3 API.

The voting interface consists of 2 elements:

* React front-end
  *  For interacting with the voting smart contract
     * Submitting a vote
     * Viewing statistics
* Smart contract itself
  * Verifying eligibility 
  * Storing votes
  * Supplying stats
  * Ending voting session

## Proposed Flow Diagram

![index](https://user-images.githubusercontent.com/33762147/169864155-b5f425c1-09fd-4cbf-bc4c-1fd437cbfe97.png)

## Figma Design

![2022-06-15_18-15-53](https://user-images.githubusercontent.com/33762147/173963247-a91c26a9-c0fe-482b-ac37-f6dce3f24001.jpg)
