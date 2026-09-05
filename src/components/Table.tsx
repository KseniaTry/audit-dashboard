
import Cards from "./Cards"

const Table = () => {
    return (
        <>
            <section>
                <div className="p-4 max-w-4xl mx-auto">
                    {/* заголовок таблицы */}
                    <div className='hidden md:grid w-max grid-cols-[80px_180px_120px_120px_120px_120px_120px_120px_120px] bg-gray-100 p-4 rounded-t-xl font-semibold text-gray-700 border-b border-gray-200 text-sm'>
                        <div>№</div>
                        <div>Проверка</div>
                        <div>Нарушение</div>
                        <div>Рекомендация</div>
                        <div>Статус</div>
                        <div>Уровень риска</div>
                        <div>Ответственное ССП</div>
                        <div>Ответственное лицо</div>
                        <div>Плановый срок исполнения</div>
                        <div>Фактический срок исполнения</div>
                    </div>
                    {/* карточки проверки 1 */}
                    <Cards />
                </div>
            </section>
        </>
    )
}
export default Table