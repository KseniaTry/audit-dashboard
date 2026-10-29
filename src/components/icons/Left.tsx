
interface ClassName {
    className: string
}

const Left = ({ className }: ClassName) => (
    <svg
        width="48"
        height="48"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.11 8l1.415-1.414 4.95-4.95 1.414 1.414L6.94 8l4.95 4.95-1.414 1.414-4.95-4.95L4.111 8z" fill="currentColor"></path>
    </svg>
)

export default Left




