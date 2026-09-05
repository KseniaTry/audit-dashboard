export type Mock = {
    id: number,
    inspection: string,
    auditViolation: string,
    recommendation: string,
    status: 'open' | 'in_progress' | 'overdue' | 'closed' | 'removed',
    riskLevel: 'high' | 'medium' | 'low',
    responsibleUnit: string,
    responsiblePerson: string,
    scheduledDate: string,
    executionDate: string | null
}

export const mockIssues: Mock[] = [
    {
        id: 1,
        inspection: "Аудит информационной безопасности 2026",
        auditViolation: "Отсутствие двухфакторной аутентификации (2FA) для администраторов CRM-системы",
        recommendation: "Разработать и внедрить модуль 2FA для всех учетных записей с правами администратора",
        status: "in_progress",
        riskLevel: "high",
        responsibleUnit: "Департамент IT и ИБ",
        responsiblePerson: "Александр Волков",
        scheduledDate: "2026-09-15",
        executionDate: ""
    },
    {
        id: 2,
        inspection: "Плановая финансовая проверка (Q2)",
        auditViolation: "Нарушение лимитов кассовых операций в филиале №3",
        recommendation: "Провести повторный инструктаж кассиров и установить жесткий автоматический лимит в ПО",
        status: "closed",
        riskLevel: "medium",
        responsibleUnit: "Бухгалтерия и учет",
        responsiblePerson: "Елена Смирнова",
        scheduledDate: "2026-08-20",
        executionDate: "2026-08-18"
    },
    {
        id: 3,
        inspection: "Проверка соблюдения трудового законодательства",
        auditViolation: "Графики отпусков сотрудников отдела продаж на 2026 год не утверждены в установленный законом срок",
        recommendation: "Сформировать, согласовать с профсоюзом и утвердить графики отпусков",
        status: "overdue",
        riskLevel: "low",
        responsibleUnit: "HR-департамент",
        responsiblePerson: "Наталья Козлова",
        scheduledDate: "2026-08-01",
        executionDate: null
    },
    {
        id: 4,
        inspection: "Технологический аудит производства",
        auditViolation: "Использование несертифицированных смазочных материалов на конвейерной линии №2",
        recommendation: "Изъять несертифицированные материалы, закупить компоненты согласно регламенту поставщика",
        status: "open",
        riskLevel: "high",
        responsibleUnit: "Служба главного инженера",
        responsiblePerson: "Дмитрий Петров",
        scheduledDate: "2026-10-10",
        executionDate: null
    },
    {
        id: 5,
        inspection: "Экологический контроль",
        auditViolation: "Превышение норм шума в ночное время у границы санитарно-защитной зоны (складской комплекс)",
        recommendation: "Установить шумозащитные экраны в зоне погрузочно-разгрузочных работ",
        status: "removed",
        riskLevel: "medium",
        responsibleUnit: "Административно-хозяйственный отдел",
        responsiblePerson: "Игорь Соколов",
        scheduledDate: "2026-07-15",
        executionDate: null
    },
    {
        id: 6,
        inspection: "Аудит информационной безопасности 2026",
        auditViolation: "Хранение резервных копий исходного кода на незашифрованном внешнем носителе",
        recommendation: "Перенести бэкапы в защищенное облачное хранилище с шифрованием на стороне клиента",
        status: "closed",
        riskLevel: "high",
        responsibleUnit: "Департамент IT и ИБ",
        responsiblePerson: "Антон Морозов",
        scheduledDate: "2026-08-25",
        executionDate: "2026-08-24"
    }
];
