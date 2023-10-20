import { MessageWithCID, PushAPI } from '@pushprotocol/restapi'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import { providers } from 'ethers'
import { Socket } from 'dgram'
import { getSigner, getWeb3 } from '.'
import { PUSH_ENV } from '@/config'

export class Push {
  signer: providers.JsonRpcSigner
  _push: PushAPI | null = null
  _socket: Socket | null = null

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
    this._push = push
  }

  async initSocket() {
    const pushSDKSocket = createSocketConnection({
      user: await this.signer.getAddress(),
      socketType: 'chat',
      socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
      env: PUSH_ENV,
    })
    if (!pushSDKSocket) throw new Error('PushSDKSocket is null')
    pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
      console.log(message)
    })
  }

  async sendMessage(recipientAddress: string, message: string) {
    if (!this._push) return
    const messageSent: MessageWithCID = await this._push.chat.send(
      recipientAddress,
      {
        content: message,
      }
    )
    return messageSent
  }
}
