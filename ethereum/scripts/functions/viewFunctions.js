import { ethers } from 'ethers'
import { jsonRpcProvider } from '../config/jsonRpcProvider'
import contractABI from '../abi/sessions.json'
import { contractAddress } from '../config/contractDetails'

const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  jsonRpcProvider
)

export async function isUserRegistered(userAddress) {
  return await contract.isUserRegistered(userAddress)
}

export async function getGroupById(groupId) {
  return await contract.getGroupById(groupId)
}

export async function isUserPartOfGroup(userAddress, groupId) {
  return await contract.isUserPartOfGroup(userAddress, groupId)
}

export async function getGroupMembershipOfUser(userAddress) {
  return await contract.getGroupMembershipOfUser(userAddress)
}

export async function getGroupsOfTherapist(therapistAddress) {
  return await contract.getGroupsOfTherapist(therapistAddress)
}

export async function getGroupMembers(groupId) {
  return await contract.getGroupMembers(groupId)
}

export async function getGeneralUserUsername(userAddress) {
  return await contract.getGeneralUserUsername(userAddress)
}

export async function getModerator(modAddress) {
  return await contract.getModerator(modAddress)
}

export async function getTherapist(therapistAddress) {
  return await contract.getTherapist(therapistAddress)
}

export async function getGroupsByTag(tag) {
  return await contract.getGroupsByTag(tag)
}

export async function getGroupCountByTag(tag) {
  return await contract.getGroupCountByTag(tag)
}
