import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { generateRandomName } from '../utils/utils'
import './loginPage.css'

export function LoginPage() {
    const [nickname, setNickname] = useState('')
    const setUsername = useAppStore(state => state.setUsername)
    const navigate = useNavigate()

    const handleLogin = () => {
        if (nickname.trim()) {
            setUsername(nickname.trim())
            navigate('/')
        }
    }

    const handleGenerateRandomName = () => {
        setNickname(generateRandomName())
    }

    return (
        <div className="login-page">
            <div className="login-vinyl-record"></div>
            <div className="login-orbit-ring login-orbit-1"></div>
            <div className="login-orbit-ring login-orbit-2"></div>

            <div className="login-welcome-text">
                <h2>SINTONIZE SUA ÓRBITA</h2>
                <p>O universo é vasto, mas a música nos aproxima. Um espaço seguro projetado estritamente para você expressar as emoções que só as melodias conseguem traduzir. Conecte-se e solte sua voz no vazio.</p>
            </div>

            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Insira o seu ID no espaço</h1>
                    <div className="login-input-wrapper">
                        <input
                            type="text"
                            className="login-input"
                            placeholder="'nickname'"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        <button className="login-dice-btn" onClick={handleGenerateRandomName} title="Gerar ID aleatório">
                            🎲
                        </button>
                    </div>
                    <button className="login-button" onClick={handleLogin}>ENTRAR</button>
                </div>
            </div>
        </div>
    )
}