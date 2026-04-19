import { ADJECTIVES, NOUNS } from '../constants'

export function generateRandomName(): string {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)]
    const num = Math.floor(Math.random() * 999)
    return `${adj}${noun}${num}`
}
