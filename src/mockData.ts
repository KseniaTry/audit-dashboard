export type Mock = {
    id: number,
    inspection: string,
    auditViolation: string,
    recommendation: string,
    status: 'open' | 'in_progress' | 'overdue' | 'closed' | 'removed',
    riskLevel: 'high' | 'medium' | 'low',
    responsibleUnit: string[],
    responsiblePerson: string[],
    scheduledDate: string,
    executionDate: string | null
}

export const mockIssues: Mock[] = [
    {
        id: 1,
        inspection: "Аудит залогового имущества и предметов лизинга (Q2-2026)",
        auditViolation: "Отсутствие актов регулярного осмотра предметов лизинга (строит. техника) по договору №Л-442/26",
        recommendation: "Провести выездной мониторинг, зафиксировать GPS-координаты техники и составить актуальные акты осмотра",
        status: "in_progress",
        riskLevel: "medium",
        responsibleUnit: ["Департамент мониторинга", "Региональный филиал 'Северо-Запад'"],
        responsiblePerson: ["Игорь Николаев", "Максим Петров"],
        scheduledDate: "2026-09-20",
        executionDate: ""
    },
    {
        id: 2,
        inspection: "Внутренний финансовый аудит",
        auditViolation: "Неначисление пеней за просрочку лизинговых платежей более 15 дней по пулу клиентов малого бизнеса",
        recommendation: "Настроить автоматическое выставление претензий и расчет неустойки в ERP-системе согласно договорам",
        status: "overdue",
        riskLevel: "high",
        responsibleUnit: ["Управление казначейства и расчетов"],
        responsiblePerson: ["Светлана Романова"],
        scheduledDate: "2026-08-15",
        executionDate: ""
    },
    {
        id: 3,
        inspection: "Проверка комплаенс и юридических рисков",
        auditViolation: "Договор лизинга №Л-881/25 подписан лизингополучателем без проверки полномочий по уставу (истекла доверенность)",
        recommendation: "Запросить у клиента актуальную доверенность или решение о продлении полномочий генерального директора",
        status: "open",
        riskLevel: "high",
        responsibleUnit: ["Юридический департамент", "Отдел проверки контрагентов"],
        responsiblePerson: ["Олег Виноградов", "Елена Кравцова"],
        scheduledDate: "2026-09-18",
        executionDate: ""
    },
    {
        id: 4,
        inspection: "Аудит системы управления рисками (СУР)",
        auditViolation: "Лимиты на одного лизингополучателя (группу связанных лиц) превышены на 12% по сделке ООО 'Технострой'",
        recommendation: "Вынести сделку на повторный Риск-комитет для согласования индивидуального лимита или реструктуризации",
        status: "closed",
        riskLevel: "high",
        responsibleUnit: ["Департамент рисков"],
        responsiblePerson: ["Екатерина Попова"],
        scheduledDate: "2026-08-30",
        executionDate: "2026-08-28"
    },
    {
        id: 5,
        inspection: "Аудит страхового портфеля (Автолизинг)",
        auditViolation: "Допущена эксплуатация 5 грузовых автомобилей по договору лизинга без оформленных полисов КАСКО на новый период",
        recommendation: "Срочно пролонгировать договоры страхования со страховой компанией и выставить счета лизингополучателю",
        status: "in_progress",
        riskLevel: "high",
        responsibleUnit: ["Отдел страхования имущества", "Управление по работе с клиентами"],
        responsiblePerson: ["Дмитрий Семенов", "Ольга Кузнецова"],
        scheduledDate: "2026-09-12",
        executionDate: ""
    },
    {
        id: 6,
        inspection: "Проверка ИТ-инфраструктуры и защиты персональных данных",
        auditViolation: "Данные анкет поручителей и лизингополучателей хранятся в открытом виде на общем сетевом диске скоринга",
        recommendation: "Ограничить доступ к папке, настроить права согласно ролевой модели и включить логирование обращений к файлам",
        status: "closed",
        riskLevel: "medium",
        responsibleUnit: ["Служба ИТ", "Департамент безопасности"],
        responsiblePerson: ["Андрей Кудрявцев", "Сергей Борзов"],
        scheduledDate: "2026-08-10",
        executionDate: "2026-08-09"
    },
    {
        id: 7,
        inspection: "Налоговый и бухгалтерский аудит",
        auditViolation: "Некорректно применен коэффициент ускоренной амортизации для деревообрабатывающего оборудования 4-й группы",
        recommendation: "Провести пересчет амортизационных отчислений, подать уточненные декларации по налогу на имущество",
        status: "open",
        riskLevel: "medium",
        responsibleUnit: ["Управление бухгалтерского учета"],
        responsiblePerson: ["Татьяна Ильина"],
        scheduledDate: "2026-10-05",
        executionDate: ""
    },
    {
        id: 8,
        inspection: "Аудит процессов изъятия и реализации имущества",
        auditViolation: "Нарушен 10-дневный срок уведомления лизингополучателя о расторжении договора перед изъятием легкового автотранспорта",
        recommendation: "Внести изменения в регламент работы отдела взыскания, добавить автоматические email/SMS нотификации",
        status: "removed",
        riskLevel: "low",
        responsibleUnit: ["Отдел по работе с проблемными активами"],
        responsiblePerson: ["Михаил Зубов"],
        scheduledDate: "2026-07-20",
        executionDate: ""
    },
    {
        id: 9,
        inspection: "Аудит закупочной деятельности (Лизинг оборудования)",
        auditViolation: "Авансовый платеж поставщику оборудования отправлен без получения банковской гарантии возврата аванса",
        recommendation: "Приостановить дальнейшие оплаты до предоставления поставщиком БГ или подписания доп. соглашения",
        status: "overdue",
        riskLevel: "high",
        responsibleUnit: ["Департамент закупок", "Управление логистики"],
        responsiblePerson: ["Елена Воронова", "Илья Зайцев"],
        scheduledDate: "2026-09-01",
        executionDate: ""
    },
    {
        id: 10,
        inspection: "Аудит клиентского сервиса и документооборота",
        auditViolation: "Оригиналы ПТС/ПСМ по 15 закрытым сделкам не переданы бывшим лизингополучателям в течение нормативных 3 дней",
        recommendation: "Уведомить клиентов о готовности документов, организовать отправку курьерской службой",
        status: "closed",
        riskLevel: "low",
        responsibleUnit: ["Отдел сопровождения клиентов"],
        responsiblePerson: ["Анна Киселева"],
        scheduledDate: "2026-08-25",
        executionDate: "2026-08-25"
    }
]