import "./_PageBackground.scss"
type LogoProps ={ 
    text: string;
}
export default function PageBackground({text} : LogoProps) {
    return(
        <div className="text-container accent-text" style={{ color: 'hsl(var(--primary-foreground))'}}>
            {text}
        </div>
    )
}