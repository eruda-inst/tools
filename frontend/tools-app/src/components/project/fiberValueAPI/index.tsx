type FiberProps = {
    currentPrice: number;
}

import { Skeleton } from "@/components/ui/skeleton";

export default function FiberValue({currentPrice}: FiberProps){
    if(!currentPrice){
        return(
            <div className="main-value text-4xl  w-full h-min flex flex-row justify-left items-center gap-4">
                <span className="translate-y-1">R$</span> 
                  <Skeleton className="bg-primary/20 h-9 w-[120px]"/>
            </div>
        )
    }
    return(
        <div className="main-value text-4xl  w-full h-min flex flex-row justify-left items-center gap-4">
        <span className="translate-y-1">R$</span> 
                <span className="translate-y-1">
                  {currentPrice}
                </span>
              </div>
    )
    
}