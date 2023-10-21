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
export const APP_WHITE = '#fff'
export const APP_ORANGE = '#f2622e'
export const APP_BLUE = '#034aa6'
export const APP_BLACK = '#222'
export const APP_GRAY = '#666'
export const APP_ACCENT_LIGHT = APP_BLUE
export const APP_ACCENT_DARK = APP_ORANGE
