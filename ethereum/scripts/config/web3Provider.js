import { ethers } from 'ethers'

let provider

if (typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum)
}

export default provider
