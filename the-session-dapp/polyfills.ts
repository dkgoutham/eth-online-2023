import { Buffer } from 'buffer'

let value
if (typeof window !== 'undefined')
  value = window.Buffer = window.Buffer ?? Buffer
