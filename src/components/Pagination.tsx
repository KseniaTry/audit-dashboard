
import Button from "./ui/Button"
import Right from "./icons/Right"
import Left from "./icons/Left"
import { PAGINATION_STUB } from "../const"

interface PaginationData {
    currentPage: number,
    totalPages: number,
    onButtonClick: (page: number) => void,
}

const Pagination = ({ currentPage, totalPages, onButtonClick }: PaginationData) => {
    const buttonClass = 'border-none bg-transparent h-5'
    const iconClass = 'text-accent h-4 w-4'
    const leftCurrentPage = currentPage === 1 ? currentPage : currentPage - 1
    const rightCurrentPage = currentPage === totalPages ? totalPages : currentPage + 1

    const calculatePagesUi = (currentPage: number, totalPages: number): Array<number | string> => {
        if (totalPages <= 10) {
            return Array.from({ length: totalPages }, (_, index) => index + 1)
        } else if (currentPage <= 3) {
            return [1, 2, 3, PAGINATION_STUB, totalPages]
        } else if (currentPage > 3 && currentPage < totalPages - 3) {
            return [1, PAGINATION_STUB, currentPage - 1, currentPage, currentPage + 1, PAGINATION_STUB, totalPages]
        } else if (currentPage === totalPages) {
            return [1, PAGINATION_STUB, currentPage - 2, currentPage - 1, currentPage]
        } else {
            return [1, PAGINATION_STUB, currentPage - 1, currentPage, totalPages]
        }
    }

    const totalPagesArray = calculatePagesUi(currentPage, totalPages)

    return (
        <div className="hidden md:flex md:gap-2">
            <Button
                type='button'
                className={buttonClass}
                onClick={() => onButtonClick(leftCurrentPage)}
                disabled={currentPage === 1}>
                <Left className={iconClass} />
            </Button>
            <ul className="flex gap-1 justify-end ">
                {totalPagesArray.map((page, index) => {
                    const isActive = currentPage === page
                    const uniqueKey = `${page}-${index}`
                    return page === '...' ?
                        (<li key={uniqueKey}>
                            <p className="px-2 text-text-muted">{page} </p>
                        </li>) :
                        (<li key={uniqueKey}>
                            <Button
                                type="button"
                                isActive={isActive}
                                onClick={() => onButtonClick(page as number)}
                                className="text-[13px] border-none px-2 py-0"
                            >{page}</Button>
                        </li>
                        )
                })}
            </ul>
            <Button
                type='button'
                className={buttonClass}
                onClick={() => onButtonClick(rightCurrentPage)}
                disabled={currentPage === totalPages}>
                <Right className={iconClass} />
            </Button>
        </div>
    )
}

export default Pagination