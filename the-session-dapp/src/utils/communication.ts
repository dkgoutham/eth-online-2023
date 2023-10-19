/*   // Import Push SDK & Ethers
  import { PushAPI } from '@pushprotocol/restapi';
  import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
  import { ethers } from 'ethers';

  // Creating a random signer from a wallet, ideally this is the wallet you will connect
  const signer = ethers.Wallet.createRandom();

  // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
  const userAlice = await PushAPI.initialize(signer, { env: 'staging' });
  
  // This will be the wallet address of the recipient 
  const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

  // Send a message to Bob
  const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
    content: "Gm gm! It's a me... Mario"
  });

  // Create Socket to Listen to incoming messages
  const pushSDKSocket = createSocketConnection({
    user: signer.wallet,
    socketType: 'chat',
    socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
    env: 'staging',
  });

  // React to message payload getting received
  pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => {
    console.log(message);
  }); */

export const push = () => {}
