import { IMessageIPFS, MessageWithCID, PushAPI } from '@pushprotocol/restapi'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import { providers } from 'ethers'
import { getSigner, getWeb3 } from '.'
import { PUSH_ENV } from '@/config'

export class Push {
  signer: providers.JsonRpcSigner
  user: PushAPI | null = null
  _socket: unknown | null = null

  constructor() {
    try {
      if (!window.ethereum) throw new Error("We couldn't start Push")
      const provider = getWeb3(window.ethereum)
      this.signer = getSigner(provider)
    } catch (err) {
      throw err
    }
  }

  async initPush() {
    const push = await PushAPI.initialize(this.signer, { env: PUSH_ENV })
    if (!push) throw new Error('Push is null')
    this.user = push
  }

  async initSocket(address: string) {
    const pushSDKSocket = createSocketConnection({
      user: address,
      socketType: 'chat',
      socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
      env: PUSH_ENV,
    })
    if (!pushSDKSocket) throw new Error('Push Socket is null')
    pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
      console.log(message)
    })
    this._socket = pushSDKSocket
  }

  async sendMessage(recipientAddress: string, message: string) {
    if (!this.user) return
    const messageSent: MessageWithCID = await this.user.chat.send(
      recipientAddress,
      {
        content: message,
      }
    )
    return messageSent
  }

  async getChat(recipient: string): Promise<IMessageIPFS[]> {
    if (!this.user) return []
    const chat = await this.user.chat.history(recipient)
    return chat
  }
  // TODO Group Logic
}
