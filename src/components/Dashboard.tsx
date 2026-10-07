import { RISK_LEVELS, STATUSES, Issue } from '../const'
import { mockIssues } from '../mocks'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import { RootState } from "../store"
import { useEffect } from "react"
import { setAllIssues } from "../slices/issuesSlice"
import { format } from 'date-fns';
import Analytics from './Analytics'
import Header from './Header'
import AddModal from './AddModal'
import ChangeModal from './ChangeModal'
import DepartmentReport from './DepartmentReport'
import Modal from './ui/Modal'
import ManagementReport from './ManagementReport'
import Table from './Table'
import Filters from './Filters'

const Dashboard = () => {
    const { t } = useTranslation()
    const titleWrapperClass = "flex flex-wrap flex-col-reverse px-4 mt-4"
    const titleClass = "text-[40px] w-full max-[768px]:text-[23px]"
    const secondTitleClass = "text-[13px] tracking-widest uppercase font-semibold text-[#1E40AF] max-[768px]:text-[10px]"

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllIssues(mockIssues))
    }, [dispatch])

    const allIssues = useSelector((state: RootState) => state.issues.issuesEntites)

    const allInspections = allIssues.map((issue: Issue) => issue.inspection)
    const uniqueInspections = [...new Set(allInspections)]
    const departments = useSelector((state: RootState) => state.issues.departments)
    const allYears = allIssues.map((issue: Issue) => format(new Date(issue.startInspectionDate), "yyyy"))
    const years = [...new Set(allYears)]

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
            <Analytics
                riskLevels={RISK_LEVELS}
                statuses={STATUSES}
                years={years} />
            <Filters
                inspections={uniqueInspections}
                statuses={STATUSES}
                riskLevels={RISK_LEVELS}
                departments={departments} />
            <Table
                allIssues={allIssues} />
            {/* МОДАЛКИ */}
            <Modal
                isOpen={false}
                onClose={closeModal}
                title={t('managementReport.title')}
                modalType='report'
                submitButtonTitle={t('download')}
                onSubmit={submitModal}
                children={<ManagementReport statuses={STATUSES} />}
                position='bottom' />

            <Modal
                isOpen={false}
                onClose={closeModal}
                title={t('departmentReport.title')}
                modalType='report'
                submitButtonTitle={t('download')}
                onSubmit={submitModal}
                children={<DepartmentReport departments={departments} />}
                position='bottom' />

            <Modal
                isOpen={false}
                onClose={closeModal}
                title={t('changeModal.title')}
                modalType='change'
                submitButtonTitle={t('save')}
                onSubmit={submitModal}
                children={<ChangeModal />}
                position='bottom' />

            <Modal
                isOpen={false}
                onClose={closeModal}
                title={t('addModal.title')}
                modalType='new'
                submitButtonTitle={t('add')}
                onSubmit={submitModal}
                children={<AddModal riskLevels={RISK_LEVELS} departments={departments} />}
                size='full' />
        </>
    )
}

export default Dashboard