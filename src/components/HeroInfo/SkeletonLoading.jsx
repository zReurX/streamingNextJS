import { Skeleton } from "@/components/ui/skeleton"

function SkeletonLoading() {
  return (
    <div className="flex flex-col space-y-2 w-full md:max-w-[500px]">
        <Skeleton className="h-[20px] grow mx-2 rounded-md" />
        <Skeleton className="h-[20px] grow mx-2 rounded-md" />
        <Skeleton className="h-[40px] grow mx-2 rounded-md" />
        <Skeleton className="h-[60px] grow mx-2 rounded-md" />
    </div>
  )
}

export default SkeletonLoading