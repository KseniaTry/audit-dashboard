interface ClassName {
    className: string
}

const Download = ({ className }: ClassName) => (
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
            d="m12 15.985 3.182-3.182-1.06-1.06-1.372 1.371V5.25h-1.5v7.864l-1.371-1.371-1.061 1.06L12 15.985Zm0-2.121Z"
            clipRule="evenodd"
        />
        <path fill="currentColor" d="M18 17.25v1.5H6v-1.5h12Z" />
    </svg>
)
export default Download
