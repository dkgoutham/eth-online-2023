import { IMessageIPFS, MessageWithCID, PushAPI } from '@pushprotocol/restapi'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import { providers } from 'ethers'
import { getSigner, getWeb3 } from '.'
import { EthereumAddress, GroupMessage } from '@/model'
import { PUSH_ENV } from '@/config'

export class Push {
  signer: providers.JsonRpcSigner
  recipient: EthereumAddress
  user: PushAPI | null = null
  socket: unknown | null = null
  messages: GroupMessage[] = []
  loadingMessages = false

  constructor(recipient: EthereumAddress) {
    try {
      if (!window.ethereum) throw new Error("We couldn't start Push")
      const provider = getWeb3(window.ethereum)
      this.signer = getSigner(provider)
      this.recipient = recipient
    } catch (err) {
      throw err
    }
  }

  async initPush() {
    const push = await PushAPI.initialize(this.signer, { env: PUSH_ENV })
    if (!push) throw new Error('Push is null')
    this.user = push
    await this.getChat()
  }

  async initSocket(address: string) {
    const pushSDKSocket = createSocketConnection({
      user: address,
      socketType: 'chat',
      socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
      env: PUSH_ENV,
    })
    if (!pushSDKSocket) throw new Error('Push Socket is null')
    pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message: IMessageIPFS) => {
      this.loadingMessages = true
      // @ts-ignore
      const { messageObj: m } = message
      // @ts-ignore
      this.messages.push({ text: m.content, time: m.timestamp })
      this.loadingMessages = false
    })
    this.socket = pushSDKSocket
  }

  async getChat(): Promise<void> {
    try {
      if (!this.user || !this.recipient)
        throw new Error('User or Recipient is null')
      this.loadingMessages = true
      const chat = await this.user.chat.history(this.recipient)
      console.log(chat)
      this.messages = chat
        .map((m: IMessageIPFS) => {
          // @ts-ignore
          const { content, timestamp } = m.messageObj
          return {
            text: content,
            time: timestamp,
            isSender: false,
          }
        })
        .filter((m) => !!m.text)
      this.loadingMessages = false
    } catch (err) {
      throw err
    }
  }

  async sendMessage(message: string) {
    if (!this.user) return
    const messageSent: MessageWithCID = await this.user.chat.send(
      this.recipient,
      {
        content: message,
      }
    )
    this.messages.push({
      text: message,
      time: messageSent!.timestamp || 0,
      isSender: false,
    })
  }

  // TODO Group Logic
}
