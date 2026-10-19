import { useTranslation } from "react-i18next"
import SelectInput from "./ui/SelectInput"
import Button from "./ui/Button"

interface DepartmentReportData {
    departments: string[],
    onClose: () => void
}

const DepartmentReport = ({ departments, onClose }: DepartmentReportData) => {
    const { t } = useTranslation()

    return (
        <form className=''>
            <div className="flex flex-col flex-wrap p-5 gap-4">
                <p className="tracking-wide">{t('departmentReport.text')}</p>
                <SelectInput
                    labelText={t('table.responsibleDepartment')}
                    name={'department'}
                    optionsArrayData={departments}
                    widthClass={'w-full'}
                    required={true} />
            </div>
            {/* ФУТЕР: КНОПКИ */}
            <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                <Button
                    type='button'
                    onClick={onClose}
                >
                    {t('cancel')}
                </Button>
                <Button
                    type='submit'
                    // onClick={onSubmit}
                    variant="secondary"
                >
                    {t('download')}
                </Button>
            </footer>
        </form>
    )
}

export default DepartmentReport