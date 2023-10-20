import SessionABI from '@/utils/abi/sessions.json'
import { Env } from '@pushprotocol/restapi'

/**
 * Environment
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const WALLET_CONNECT_ID = process.env.NEXT_PUBLIC_WALLET_ID || ''
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
export const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || ''
export const PUSH_ENV = (process.env.NEXT_PUBLIC_PUSH_ENV || 'dev') as Env
export const CONTRACT_ABI = SessionABI
export const TAGLINE = 'we are feeling the same'

/**
 * Colors
 */
export const ACCENT_LIGHT = '#034aa6'
export const ACCENT_DARK = '#f2622e'
