import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { RiskLevels } from "../mockData"
import Plus from "./icons/Plus"
import Input from "./ui/Input"
import SelectInput from "./ui/SelectInput"
import Textarea from "./ui/Textarea"
import Button from "./ui/Button"

interface AddModalProps {
    riskLevels: RiskLevels[],
    departments: string[]
}

const AddModal = ({ riskLevels, departments }: AddModalProps) => {
    const { t } = useTranslation()
    const wrapperClass = "flex flex-col flex-wrap gap-2"

    return (
        <form className='flex flex-wrap justify-between items-center p-5 gap-3'>
            {/* ВЫБОР ПРОВЕРКИ */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <ul className="hidden">
                    {/* поменять на проверки!!!! */}
                    {departments.map((department) => {
                        return <li key={department}>{department}</li>
                    })
                    }

                </ul>
                <Input
                    type={'text'}
                    labelText={t('table.inspection')}
                    id={'inspection'}
                    placeholder="Название проверки"
                    required={true} />
            </div>

            {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
            <Input
                type={'date'}
                labelText={t('table.startInspectionDate')}
                id={'date-start'}
                widthClass={'w-[45%]'}
                required={true} />

            {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
            <Input
                type={'date'}
                labelText={t('table.endInspectionDate')}
                id={'date-end'}
                widthClass={'w-[45%]'}
                required={true} />

            {/* НАРУШЕНИЕ */}
            <Textarea
                labelText={t('table.violation')}
                name={'violation'}
                placeholder={t('addModal.violationPlaceholder')}
                rows={5}
                required={true}
                widthClass={'w-full'} />

            {/* РЕКОМЕНДАЦИЯ */}
            <Textarea
                labelText={t('table.recommendation')}
                name={'recommendation'}
                placeholder={t('addModal.recommendationPlaceholder')}
                rows={5}
                required={true}
                widthClass={'w-full'} />

            {/* УРОВНИ РИСКА */}
            <SelectInput
                labelText={t('table.riskLevel')}
                name={'risk-level'}
                optionsArrayData={riskLevels}
                widthClass={'w-[45%]'}
                translateFn={(word) => t(`riskLevels.${word}`)}
                required={true} />

            {/* ПЛАНОВАЯ ДАТА */}
            <Input
                type={'date'}
                labelText={t('table.scheduledDate')}
                id={'sheduled-date'}
                widthClass={'w-[45%]'}
                required={true} />

            {/* ОТВЕТСТВЕННОЕ ССП */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <SelectInput labelText={t('table.responsibleDepartment')} name={'department'} optionsArrayData={departments} required={true} />
                <Button
                    type="button"
                    className="text-accent bg-accent/10 border-accent hover:bg-field-bg">
                    <Plus className="w-4 h-4 text-accent" />
                    {t('add')}
                </Button>
            </div>

            {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <Input type={'text'} labelText={t('table.responsiblePerson')} id={'responsible'} placeholder={t('addModal.responsiblePerson')} required={true} />
                <Button
                    type="button"
                    className="text-accent bg-accent/10 border-accent hover:bg-field-bg">
                    <Plus className="w-4 h-4 text-accent" />
                    {t('add')}
                </Button>
            </div>
        </form>
    )
}

export default AddModal