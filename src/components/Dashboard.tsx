import Table from './Table'
import Filters from './Filters'
import { mockIssues, RISK_LEVELS, STATUSES, DEPARTMENTS } from '../mockData'
import Analytics from './Analytics'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import AddModal from './AddModal'
import ChangeModal from './ChangeModal'
import DepartmentReport from './DepartmentReport'
import Modal from './ui/Modal'
import ManagementReport from './ManagementReport'

const Dashboard = () => {
    const { t } = useTranslation()
    const titleWrapperClass = "flex flex-wrap flex-col-reverse px-4 mt-4"
    const titleClass = "text-[40px] w-full max-[768px]:text-[23px]"
    const secondTitleClass = "text-[13px] tracking-widest uppercase font-semibold text-[#1E40AF] max-[768px]:text-[10px]"

    const closeModal = () => {
        console.log('closed!')
    }

    const submitModal = () => {
        console.log('submit')
    }

    return (
        <>
            <Header />
            <div className={titleWrapperClass}>
                <h1 className={titleClass}>{t('mainTitle')}</h1>
                <h2 className={secondTitleClass}>{t('secondTitle')}</h2>
            </div>
            <Analytics riskLevels={RISK_LEVELS} statuses={STATUSES} years={[2023, 2024, 2025, 2026]} />
            <Filters inspections={mockIssues} />
            <Table />
            {/* МОДАЛКИ */}
            <Modal isOpen={false} onClose={closeModal} title={t('managementReport.title')} modalType='report'
                submitButtonTitle={t('download')} onSubmit={submitModal}
                children={<ManagementReport statuses={STATUSES} />} position='bottom' />

            <Modal isOpen={false} onClose={closeModal} title={t('departmentReport.title')} modalType='report'
                submitButtonTitle={t('download')} onSubmit={submitModal}
                children={<DepartmentReport departments={DEPARTMENTS} />} position='bottom' />

            <Modal isOpen={true} onClose={closeModal} title={t('changeModal.title')} modalType='change'
                submitButtonTitle={t('save')} onSubmit={submitModal}
                children={<ChangeModal />} position='bottom' />

            <Modal isOpen={false} onClose={closeModal} title={t('addModal.title')} modalType='new'
                submitButtonTitle={t('add')} onSubmit={submitModal}
                children={<AddModal riskLevels={RISK_LEVELS} departments={DEPARTMENTS} />} size='full' />
        </>
    )
}

export default Dashboard