
interface ClassName {
    className: string
}

const Plus = ({ className }: ClassName) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        fill="none"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.25 12.75V18h1.5v-5.25H18v-1.5h-5.25V6h-1.5v5.25H6v1.5h5.25Z"
            clipRule="evenodd"
        />
    </svg>
)
export default Plus