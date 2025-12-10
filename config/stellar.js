import { Server, Networks } from 'stellar-sdk';

export const STELLAR_SERVER = new Server('https://horizon.stellar.org');
export const STELLAR_WALLET = process.env.STELLAR_RECEIVE_WALLET; // Receiving wallet address
export const STELLAR_NETWORK = Networks.PUBLIC;