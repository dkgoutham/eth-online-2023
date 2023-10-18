import { Client, Conversation } from '@xmtp/xmtp-js'
import { Wallet, HDNodeWallet } from 'ethers'
import { XMTP_ENV, WALLET_TO } from '@/config'

export const createWallet = (provider: any): HDNodeWallet => {
  return Wallet.createRandom(provider ?? null)
}

export const createClient = async (
  wallet: HDNodeWallet | Wallet
): Promise<Client> => await Client.create(wallet, { env: XMTP_ENV })

export const addressExistsOnXMTP = async (
  xmtp: Client,
  walletTo: string = WALLET_TO
): Promise<boolean> => await xmtp.canMessage(walletTo)

export const startConversation = async (
  xmtp: Client,
  walletTo: string = WALLET_TO
): Promise<Conversation | void> => {
  const canMessage = await addressExistsOnXMTP(xmtp, walletTo)
  if (!canMessage) return
  if (xmtp) return await xmtp.conversations.newConversation(walletTo)
}

export const sendMessage = async (
  conversation: Conversation,
  message: string
) => await conversation.send(message)

export const streamMessages = async (xmtp: Client, address: string) => {
  const chatUrl = `https://go.cb-w.com/messaging?address=${address}`
  for await (const message of await xmtp.conversations.streamAllMessages()) {
    return {
      url: chatUrl,
      sender: message.senderAddress,
      content: message.content,
    }
  }
}
