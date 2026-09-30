import { useTranslation } from "react-i18next"
import SelectInput from "./ui/SelectInput"

interface DepartmentReportData {
    departments: string[]
}

const DepartmentReport = ({ departments }: DepartmentReportData) => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col flex-wrap p-5 gap-4">
            <p className="tracking-wide">{t('departmentReport.text')}</p>
            <SelectInput labelText={t('table.responsibleDepartment')} name={'department'} optionsArrayData={departments} widthClass={'w-full'} required={true} />
        </div>
    )
}

export default DepartmentReport