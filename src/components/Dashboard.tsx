import { RISK_LEVELS, STATUSES, ITEMS_PER_PAGE, DEFAULT_PAGE } from '../const'
import { mockIssues } from '../mocks'
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from 'react-i18next'
import { RootState } from "../store"
import { useEffect, useState } from "react"
import { selectIssuesWithStatuses, setAllIssues, setReportDate } from "../slices/issuesSlice"
import { format } from 'date-fns';
import { ModalActiveType, FilterState, Issue, FiltersData } from '../types'
import Analytics from './Analytics'
import Header from './Header'
import AddModal from './AddModal'
import ChangeModal from './ChangeModal'
import DepartmentReport from './DepartmentReport'
import Modal from './ui/Modal'
import ManagementReport from './ManagementReport'
import Table from './Table'
import Filters from './Filters'
import { divideIssues } from '../utils'

const getFilteredIssues = (issues: Issue[], filters: FilterState): Issue[] => {
    const result = issues.filter((issue: Issue) => {
        if (filters.departments.length > 0) {
            const departmentsMatches = issue.responsibleDepartment.filter((item) => filters.departments.includes(item))
            if (departmentsMatches.length === 0) return false
        }

        if (filters.persons.length > 0) {
            const personsMatches = issue.responsiblePerson.filter((item) => filters.persons.includes(item))
            if (personsMatches.length === 0) return false
        }

        if (filters.inspections.length > 0) {
            if (!filters.inspections.includes(issue.inspection)) return false
        }

        if (filters.inspectionYears.length > 0) {
            const issueYear = format(new Date(issue.startInspectionDate), "yyyy")
            if (!filters.inspectionYears.includes(issueYear)) return false
        }

        if (filters.riskLevels.length > 0) {
            if (!filters.riskLevels.includes(issue.riskLevel)) return false
        }

        if ((issue.status) && filters.statuses.length > 0) {
            if (!filters.statuses.includes(issue.status)) return false
        }

        if (filters.search !== '') {
            const searchText = filters.search.toLowerCase()
            const searchMatches =
                issue.auditViolation.toLowerCase().includes(searchText) ||
                issue.recommendation.toLowerCase().includes(searchText) ||
                issue.inspection.toLowerCase().includes(searchText)
            if (!searchMatches) return false
        }

        return true
    })

    return result
}

const Dashboard = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const initialFiltersState: FilterState = {
        search: '',
        inspections: [],
        persons: [],
        departments: [],
        inspectionYears: [],
        statuses: [],
        riskLevels: []
    }
    const [modalActive, setModalActive] = useState<ModalActiveType>(null)
    const [activeIssueId, setActiveIssueId] = useState<number | null>(null)
    const [filters, setFilters] = useState<FilterState>(initialFiltersState)
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const currentDate = format(Date.now(), "yyyy-MM-dd")
        dispatch(setAllIssues(mockIssues))
        dispatch(setReportDate(currentDate))
    }, [dispatch])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    })

    // ДЛЯ ФИЛЬТРОВ
    // добавление в объект с результатами фильтрации
    const handleFiltersState = (key: keyof FilterState, value: FiltersData | string) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }
    // сброс фильтров
    const handleFiltersReset = () => {
        setFilters(initialFiltersState)
    }

    const allIssues = useSelector(selectIssuesWithStatuses)
    const allInspections = allIssues.map((issue) => issue.inspection)
    const allPersons = allIssues.map((issue) => issue.responsiblePerson)
    const allYears = allIssues.map((issue) => format(new Date(issue.startInspectionDate), "yyyy"))
    const inspections = [...new Set(allInspections)]
    const persons = [...new Set(allPersons.flat())]
    const departments = useSelector((state: RootState) => state.issues.departments)
    const years = [...new Set(allYears)]
    const filteredIssues = getFilteredIssues(allIssues, filters)

    // ДЛЯ ТАБЛИЦЫ ПАГИНАЦИЯ
    const totalPages = Math.ceil(allIssues.length / ITEMS_PER_PAGE)
    // для десктопа
    const handlePaginationClick = (page: number) => {
        setCurrentPage(page)
    }
    // для мобилки и планшета
    const handleShowMoreClick = () => {
        const newCurrentPage = currentPage === totalPages ? currentPage : currentPage + 1
        setCurrentPage(newCurrentPage)
    }

    const visibleIssues = isMobile ?
        divideIssues(filteredIssues, ITEMS_PER_PAGE) :
        filteredIssues.slice(0, ITEMS_PER_PAGE * currentPage)

    // СТИЛИ
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
                filters={filters}
                onChange={handleFiltersState}
                onReset={handleFiltersReset}
                inspections={inspections}
                persons={persons}
                statuses={STATUSES}
                riskLevels={RISK_LEVELS}
                departments={departments}
                years={years} />
            <Table
                issues={visibleIssues}
                onIssueClick={(id) => {
                    setActiveIssueId(id)
                    setModalActive('change')
                }}
                onShowMoreClick={handleShowMoreClick}
                onPaginationClick={handlePaginationClick}
                currentPage={currentPage}
                totalPages={totalPages} />
            {/* МОДАЛКИ */}
            {modalActive === 'managementReport' ?
                <Modal
                    isOpen={modalActive === 'managementReport'}
                    onClose={() => setModalActive(null)}
                    title={t('managementReport.title')}
                    modalType='report'
                    position='bottom' >
                    <ManagementReport statuses={STATUSES} onClose={() => setModalActive(null)} />
                </Modal> : ''
            }

            {modalActive === 'departmentReport' ?
                <Modal
                    isOpen={modalActive === 'departmentReport'}
                    onClose={() => setModalActive(null)}
                    title={t('departmentReport.title')}
                    modalType='report'
                    position='bottom'>
                    <DepartmentReport departments={departments} onClose={() => setModalActive(null)} />
                </Modal> : ''
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
                    position='bottom' >
                    <ChangeModal issueId={activeIssueId} onClose={() => {
                        setModalActive(null)
                        setActiveIssueId(null)
                    }} />
                </Modal> : ''
            }

            {modalActive === 'add' ?
                <Modal
                    isOpen={modalActive === 'add'}
                    onClose={() => setModalActive(null)}
                    title={t('addModal.title')}
                    modalType='add'
                    size='full' >
                    <AddModal riskLevels={RISK_LEVELS} departments={departments} onClose={() => setModalActive(null)} />
                </Modal> : ''
            }
        </>
    )
}

export default Dashboard