import Logo from "@/components/project/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import PageBackground from "@/components/project/pageBackgorund";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="page-body w-100 p-5">
      <div className="nav-bar flex flex-row items-center justify-between w-100 ">
        <Logo></Logo>
        <div className="right-container">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        <ModeToggle />
        </div>
      </div>
      <main className="flex h-90 flex-col items-center justify-between p-24">
        <PageBackground text="Home" />
      </main>
    </div>
  );
}
