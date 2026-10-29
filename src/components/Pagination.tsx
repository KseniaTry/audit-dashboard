
import Button from "./ui/Button"
import Right from "./icons/Right"
import Left from "./icons/Left"

interface PaginationData {
    currentPage: number,
    totalPages: number,
    onButtonClick: (page: number) => void,
}

const Pagination = ({ currentPage, totalPages, onButtonClick }: PaginationData) => {
    const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1)
    const buttonClass = 'border-none bg-transparent h-5'
    const iconClass = 'text-accent h-4 w-4'
    const leftCurrentPage = currentPage === 1 ? currentPage : currentPage - 1
    const rightCurrentPage = currentPage === totalPages ? totalPages : currentPage + 1

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
                {totalPagesArray.map((page) => {
                    const isActive = currentPage === page
                    return (<li key={page}>
                        <Button
                            type="button"
                            isActive={isActive}
                            onClick={() => onButtonClick(page)}
                            className="text-[13px] border-none px-2 py-0"
                        >{page}</Button></li>
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