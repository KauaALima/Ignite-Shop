import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/modal/carousel'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-auto flex min-h-[600px] w-full max-w-res gap-12">
        <CarouselItem className="flex basis-1/2 flex-col">
          <Skeleton className="h-[600px] w-full bg-gray-600" />
          <div className="mt-2 flex justify-between">
            <Skeleton className="h-[32px] w-[330px] bg-gray-600" />
            <Skeleton className="h-[32px] w-[100px] bg-gray-600" />
          </div>
        </CarouselItem>

        <CarouselItem className="flex basis-1/2 flex-col">
          <Skeleton className="h-[600px] w-full bg-gray-600" />
          <div className="mt-2 flex justify-between">
            <Skeleton className="h-[32px] w-[330px] bg-gray-600" />
            <Skeleton className="h-[32px] w-[100px] bg-gray-600" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
