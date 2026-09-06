
import Cards from "./Cards"
import { useTranslation } from "react-i18next"

const Table = () => {
    const { t } = useTranslation()

    return (
        <>
            <section>
                <div className="p-4 max-w-4xl mx-auto">
                    {/* заголовок таблицы */}
                    <div className='hidden break-words md:grid w-max grid-cols-[40px_120px_180px_180px_100px_100px_120px_120px_100px_100px] bg-gray-100 p-4 rounded-t-xl font-bold text-gray-700 border-b border-gray-200 text-[12px]'>
                        <div className="px-1">{t('table.number')}</div>
                        <div className="px-1">{t('table.inspection')}</div>
                        <div className="px-1">{t('table.violation')}</div>
                        <div className="px-1">{t('table.recommendation')}</div>
                        <div className="px-1">{t('table.status')}</div>
                        <div className="px-1">{t('table.riskLevel')}</div>
                        <div className="px-1">{t('table.responsibleUnit')}</div>
                        <div className="px-1">{t('table.responsiblePerson')}</div>
                        <div className="px-1">{t('table.scheduledDate')}</div>
                        <div className="px-1">{t('table.executionDate')}</div>
                    </div>
                    {/* карточки проверки 1 */}
                    <Cards />
                </div>
            </section>
        </>
    )
}
export default Table