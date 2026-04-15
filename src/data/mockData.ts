import type { Review } from '../types'

export const MOCK_DATA: Review[] = [
  {
    id: 1,
    type: 'album',
    album: 'In Rainbows',
    artist: 'Radiohead',
    text: 'Mergulho profundo na melancolia imersiva. Uma obra-prima de produção. Cuidado com o oxigênio! A transição rítmica em "15 Step" ainda quebra minha mente.',
    sentiment: 'MELANCOLIA',
    icon: '💧',
    rating: 5,
    username: 'GalacticVibe',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/4c/cb/4a4ccbb2-b67f-4b07-dded-d39b8b1effa6/191428135080.jpg/400x400cc.jpg',
    xp: 45
  },
  {
    id: 2,
    type: 'track',
    album: 'Nights',
    collectionName: 'blonde.',
    artist: 'Frank Ocean',
    text: 'A batida dessa track viaja no espaço tempo em que estou agora. Som absurdo.',
    sentiment: 'NOSTALGIA',
    icon: '🚀',
    rating: 5,
    username: 'StarBoy_BR',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7f/8a/40/7f8a403d-946d-9f67-888e-5543494e3046/190758758131.jpg/400x400cc.jpg',
    xp: 30
  }
]
