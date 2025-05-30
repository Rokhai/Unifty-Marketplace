import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function TablePagination({ props }: any) {


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={props.prev_page_url || "#"}
                        onClick={(e) => {
                            e.preventDefault();
                            if (props.prev_page_url) router.get(props.prev_page_url);
                        }}
                    />
                </PaginationItem>
                {props.links
                    .filter((link: any, idx: number) => idx !== 0 && idx !== props.links.length - 1) // Exclude first and last items
                    .map((link: any, idx: number) => (

                        <PaginationItem key={idx}>

                            {link.url ? (

                                <PaginationLink
                                    href={link.url}
                                    isActive={link.active}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get(link.url!);
                                    }}
                                    className='mx-4'
                                >
                                    {link.label}
                                </PaginationLink>
                            ) : (
                                <PaginationEllipsis />
                            )}
                        </PaginationItem>
                    ))}
                <PaginationItem>
                    <PaginationNext
                        href={props.next_page_url || "#"}
                        onClick={(e) => {
                            e.preventDefault();
                            if (props.next_page_url) router.get(props.next_page_url);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}