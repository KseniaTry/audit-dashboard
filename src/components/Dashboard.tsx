import { RISK_LEVELS, STATUSES } from '../const'
import { mockIssues } from '../mocks'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import { RootState } from "../store"
import { useEffect, useState } from "react"
import { selectAllIssues, setAllIssues } from "../slices/issuesSlice"
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
import { ModalActiveType } from '../const'

const Dashboard = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllIssues(mockIssues))
    }, [dispatch])

    const [modalActive, setModalActive] = useState<ModalActiveType>(null)
    const [activeIssueId, setActiveIssueId] = useState<number | null>(null)

    const allIssues = useSelector(selectAllIssues)
    const allInspections = allIssues.map((issue) => issue.inspection)
    const allYears = allIssues.map((issue) => format(new Date(issue.startInspectionDate), "yyyy"))
    const inspections = [...new Set(allInspections)]
    const departments = useSelector((state: RootState) => state.issues.departments)
    const years = [...new Set(allYears)]

    const submitModal = () => {
        console.log('submit')
    }

    const titleWrapperClass = "flex flex-wrap flex-col-reverse px-4 mt-4"
    const titleClass = "md:text-[40px] w-full text-[23px]"
    const secondTitleClass = "md:text-[13px] tracking-widest uppercase font-semibold text-accent text-[10px]"

    return (
        <>
            <Header onModalOpen={(type: ModalActiveType) => setModalActive(type)} />
            <div className={titleWrapperClass}>
                <h1 className={titleClass}>{t('mainTitle')}</h1>
                <h2 className={secondTitleClass}>{t('secondTitle')}</h2>
            </div>
            <Analytics
                riskLevels={RISK_LEVELS}
                statuses={STATUSES}
                years={years} />
            <Filters
                inspections={inspections}
                statuses={STATUSES}
                riskLevels={RISK_LEVELS}
                departments={departments} />
            <Table
                allIssues={allIssues}
                onIssueClick={(id) => {
                    setActiveIssueId(id)
                    setModalActive('change')
                }} />
            {/* МОДАЛКИ */}
            {modalActive === 'managementReport' ?
                <Modal
                    isOpen={modalActive === 'managementReport'}
                    onClose={() => setModalActive(null)}
                    title={t('managementReport.title')}
                    modalType='report'
                    submitButtonTitle={t('download')}
                    onSubmit={submitModal}
                    children={<ManagementReport statuses={STATUSES} />}
                    position='bottom' /> : ''
            }

            {modalActive === 'departmentReport' ?
                <Modal
                    isOpen={modalActive === 'departmentReport'}
                    onClose={() => setModalActive(null)}
                    title={t('departmentReport.title')}
                    modalType='report'
                    submitButtonTitle={t('download')}
                    onSubmit={submitModal}
                    children={<DepartmentReport departments={departments} />}
                    position='bottom' /> : ''
            }

            {modalActive === 'change' && activeIssueId ?
                <Modal
                    isOpen={modalActive === 'change'}
                    onClose={() => {
                        setModalActive(null)
                        setActiveIssueId(null)
                    }}
                    title={t('changeModal.title')}
                    modalType='change'
                    submitButtonTitle={t('save')}
                    onSubmit={submitModal}
                    children={<ChangeModal issueId={activeIssueId} />}
                    position='bottom'
                    activeIssueId={activeIssueId} /> : ''
            }

            {modalActive === 'add' ?
                <Modal
                    isOpen={modalActive === 'add'}
                    onClose={() => setModalActive(null)}
                    title={t('addModal.title')}
                    modalType='add'
                    submitButtonTitle={t('add')}
                    onSubmit={submitModal}
                    children={<AddModal riskLevels={RISK_LEVELS} departments={departments} />}
                    size='full' /> : ''
            }
        </>
    )
}

export default Dashboard