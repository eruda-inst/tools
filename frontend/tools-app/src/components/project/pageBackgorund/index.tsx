import "./_PageBackground.scss"
type LogoProps ={ 
    text: string;
}
export default function PageBackground({text} : LogoProps) {
    return(
        <div className="text-container background-text text-primary/10">
            {text}
        </div>
    )
}