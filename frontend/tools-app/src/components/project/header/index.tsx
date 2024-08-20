import Logo from "../logo"
import { ModeToggle } from "@/components/ui/theme-toggle"

export default function Header() {
    return(
<div className="nav-bar bg-primary-foreground/20 backdrop-blur-md h-16 flex flex-row items-center justify-between w-full fixed z-10 p-6">
        <Logo></Logo>
        <div className="right-container">
          <ModeToggle />
        </div>
      </div>
    )
}
