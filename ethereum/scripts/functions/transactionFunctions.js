import { web3Provider } from '../config/web3Provider'
import contractABI from '../abi/sessions.json'
import { contractAddress } from '../config/contractDetails'

const signer = web3Provider.getSigner()
const contract = new ethers.Contract(contractAddress, contractABI, signer)

export async function addGeneralUser(username) {
  const tx = await contract.addGeneralUser(username, {
    value: ethers.utils.parseEther('0.01'),
  })
  return await tx.wait()
}

export async function addModerator(username, description) {
  const tx = await contract.addModerator(username, description)
  return await tx.wait()
}

export async function addTherapist(
  username,
  speciality,
  medicalLicenseNumber,
  description
) {
  const tx = await contract.addTherapist(
    username,
    speciality,
    medicalLicenseNumber,
    description
  )
  return await tx.wait()
}

export async function createGroup(
  title,
  tag,
  day,
  time,
  duration,
  groupDescription
) {
  const tx = await contract.createGroup(
    title,
    tag,
    day,
    time,
    duration,
    groupDescription
  )
  return await tx.wait()
}

export async function addUserToGroup(userAddress, groupId) {
  const tx = await contract.addUserToGroup(userAddress, groupId)
  return await tx.wait()
}
