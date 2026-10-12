import { useTranslation } from "react-i18next"
import Download from "./icons/Download"
import Plus from "./icons/Plus"
import Button from "./ui/Button"
import { ModalActiveType } from "../const"

interface HeaderData {
    onModalOpen: (type: ModalActiveType) => void
}

const Header = ({ onModalOpen }: HeaderData) => {
    const { t } = useTranslation()
    const reportIconClass = "text-text-main w-[30px] h-[30px]"

    return (
        <header className='p-4 bg-light border-b border-b-border-warm'>
            <div className='flex flex-wrap items-center justify-between gap-3 md:gap-2'>
                {/* ЛОГО */}
                <div className='flex flex-nowrap items-center justify-between gap-1 w-full lg:w-auto md:gap-3 lg:w-auto'>
                    <div className='flex justify-center items-center w-[20px] h-[20px] bg-accent text-text-light p-4'>
                        <p>{t('logoTitle')}</p>
                    </div>
                    <p className='text-[11px] tracking-widest uppercase md:text-[15px]'>{t('headerTitle')}</p>
                </div>
                {/* КНОПКИ */}
                <div className='flex gap-2 flex-wrap md:flex-nowrap'>
                    <Button
                        type='button'
                        variant="secondary"
                        onClick={() => onModalOpen('add')}
                        className="w-full sm:w-auto">
                        <Plus className='text-text-light w-[30px] h-[30px]' />
                        {t('add')}
                    </Button>

                    <Button
                        type='button'
                        className="border-none w-full sm:w-auto"
                        onClick={() => onModalOpen('departmentReport')}>
                        <Download className={reportIconClass} />
                        {t('reports.reportForDepartments')}
                    </Button>

                    <Button
                        type='button'
                        className="border-none w-full sm:w-auto"
                        onClick={() => onModalOpen('managementReport')}>
                        <Download className={reportIconClass} />
                        {t('reports.reportForManagement')}
                    </Button>
                </div>
            </div>

        </header>
    )
}

export default Header