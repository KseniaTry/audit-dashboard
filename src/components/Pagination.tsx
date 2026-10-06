
import Button from "./ui/Button"

interface PaginationData {
    currentPage: number,
    totalPages: number,
    itemsPerPage: number
}

const Pagination = ({ currentPage, totalPages, itemsPerPage }: PaginationData) => {
    const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1)
    console.log(totalPagesArray)
    return (
        <div>
            <ul className="flex justify-center md:justify-end ">
                {totalPagesArray.map((page) => {
                    const isActive = currentPage === page
                    return (<li key={page}>
                        <Button
                            type="button"
                            variant="neutral"
                            isActive={isActive}
                            className="opacity-60 bg-transparent text-[13px] border-none px-2 py-0"
                        >{page}</Button></li>
                    )
                })}
            </ul>
        </div>
    )

}

export default Pagination