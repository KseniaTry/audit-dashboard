interface SwitchData {
    text: string,
    id: string,
    name: string
}

const Switch = ({ text, id, name }: SwitchData) => {
    return (
        <label className='flex justify-start items-center flex-wrap cursor-pointer' htmlFor={id} >
            <input className="sr-only peer" id={id} name={name} type="checkbox"></input>
            <div className={`relative border w-[49px] h-[23px] rounded-xl border-border-warm bg-border-warm 
                               peer-checked:bg-accent peer-checked:border-accent transition-colors duration-200
                                after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:w-[20px] after:h-[19px] after:bg-base-btn-bg after:border 
                                after:rounded-full after:border-field-bg peer-checked:after:translate-x-6 after:transition-transform after:duration-200`}></div>
            <span className="ml-5 text-text-muted tracking-wide font-semibold ">{text}</span>
            {/* добавить смену текста если выбран чекбокс */}
        </label>
    )
}

export default Switch