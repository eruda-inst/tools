import { Container } from "postcss"
import "./_Logo.scss"

export default function Logo() {
    return(
        <div className="logo-container">
            <h1 className="beastly header-logo text-4xl" style={{ color: 'hsl(var(--accent))'}}>Tools</h1>
            <h1 className="beastly header-logo text-4xl overlay" style={{ color: 'hsl(var(--foreground))'}}>Tools</h1>
        </div>
    )
}