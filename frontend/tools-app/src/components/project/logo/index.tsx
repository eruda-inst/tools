import { Container } from "postcss"
import "./_Logo.scss"

export default function Logo() {
    return(
        <div className="logo-container">
            <a href="/">
            <h1 className="accent-text header-logo text-4xl" style={{ color: 'hsl(var(--accent))'}}>toolbox</h1>
            <h1 className="accent-text header-logo text-4xl overlay" style={{ color: 'hsl(var(--foreground))'}}>toolbox</h1>
            </a>
        </div>
    )
}