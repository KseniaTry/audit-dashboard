export type Statuses = 'open' | 'overdue' | 'closed' | 'removed'
export type RiskLevels = 'high' | 'medium' | 'low'
export type VARIANTS = 'danger' | 'warning' | 'success' | 'neutral'

export const RISK_LEVELS: RiskLevels[] = ['low', 'medium', 'high']
export const STATUSES: Statuses[] = ['open', 'overdue', 'closed', 'removed']
export const DEPARTMENTS: string[] = [
    "IT-отдел",
    "АХО",
    "Группа регистрации",
    "Департамент изъятого имущества",
    "Департамент казначейства",
    "Департамент мониторинга рисков",
    "Маркетинг и PR-служба",
    "Отдел взыскания задолженности",
    "Отдел кадрового учета и подбора персонала (HR)",
    "Отдел клиентского сервиса и контроля качества",
    "Отдел логистики и оценки имущества",
    "Отдел страхования",
    "Служба внутреннего аудита",
    "Служба комплаенс-контроля",
    "Сопровождение сделок",
    "Управление безопасности",
    "Управление бухгалтерского учета и отчетности",
    "Управление продаж и партнерских программ",
    "Управление риск-менеджмента",
    "Управление фондирования и связей с инвесторами",
    "Финансово-аналитический департамент",
    "Юридический департамент"
];

export type Issue = {
    id: number,
    inspection: string,
    startInspectionDate: string,
    endInspectionDate: string,
    auditViolation: string,
    recommendation: string,
    status: Statuses,
    riskLevel: RiskLevels,
    responsibleDepartment: string[],
    responsiblePerson: string[],
    scheduledDate: string,
    executionDate: string | null
}

export const mockIssues: Issue[] = [
    // --- ИНСПЕКЦИЯ 1: Аудит мониторинга предметов лизинга (3 нарушения) ---
    {
        id: 1,
        inspection: "Аудит мониторинга предметов лизинга (Автотранспорт)",
        startInspectionDate: "2026-08-10",
        endInspectionDate: "2026-08-14",
        auditViolation: "У 15 грузовых автомобилей в лизинге по договору с ООО 'Транс-Логистик' отключены или неисправны GPS-трекеры.",
        recommendation: "Направить лизингополучателю требование о восстановлении связи и провести внеплановый выездной осмотр техники.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Департамент мониторинга рисков", "Управление безопасности"],
        responsiblePerson: ["Иванов И.И.", "Сидоров С.С."],
        scheduledDate: "2026-09-15",
        executionDate: null
    },
    {
        id: 11,
        inspection: "Аудит мониторинга предметов лизинга (Автотранспорт)",
        startInspectionDate: "2026-08-10",
        endInspectionDate: "2026-08-14",
        auditViolation: "ООО 'СпецАвтоДвиж' сдало в сублизинг 3 самосвала без письменного согласия лизингодателя.",
        recommendation: "Направить официальную претензию о нарушении условий договора и потребовать расторжения договора сублизинга.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Департамент мониторинга рисков", "Юридический департамент"],
        responsiblePerson: ["Иванов И.И.", "Смирнов Ю.Б."],
        scheduledDate: "2026-09-20",
        executionDate: null
    },
    {
        id: 12,
        inspection: "Аудит мониторинга предметов лизинга (Автотранспорт)",
        startInspectionDate: "2026-08-10",
        endInspectionDate: "2026-08-14",
        auditViolation: "Выявлен факт изменения фактического места базирования 5 автобусов без уведомления (выехали за пределы разрешенного региона).",
        recommendation: "Запросить у клиента объяснительную записку и заключить дополнительное соглашение на изменение географии эксплуатации.",
        status: "closed",
        riskLevel: "medium",
        responsibleDepartment: ["Департамент мониторинга рисков"],
        responsiblePerson: ["Петрова А.В."],
        scheduledDate: "2026-09-05",
        executionDate: "2026-09-03"
    },
    // --- ИНСПЕКЦИЯ 2: Проверка страхования портфеля спецтехники (КАСКО) (3 нарушения) ---
    {
        id: 2,
        inspection: "Проверка страхования портфеля спецтехники (КАСКО)",
        startInspectionDate: "2026-08-17",
        endInspectionDate: "2026-08-20",
        auditViolation: "Выявлено 7 договоров лизинга экскаваторов с истекшим сроком действия полисов КАСКО.",
        recommendation: "Активировать процедуру автоматического пролонгирования страховки силами лизингодателя с выставлением счета клиентам.",
        status: "closed",
        riskLevel: "medium",
        responsibleDepartment: ["Отдел страхования", "Сопровождение сделок"],
        responsiblePerson: ["Петрова А.В."],
        scheduledDate: "2026-08-25",
        executionDate: "2026-08-24"
    },
    {
        id: 13,
        inspection: "Проверка страхования портфеля спецтехники (КАСКО)",
        startInspectionDate: "2026-08-17",
        endInspectionDate: "2026-08-20",
        auditViolation: "В 4 договорах страхования неверно указана выгодоприобретающая сторона (указан клиент вместо лизинговой компании).",
        recommendation: "Направить мотивированное письмо в страховую компанию для выпуска аддендума об изменении выгодоприобретателя.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Отдел страхования"],
        responsiblePerson: ["Петрова А.В."],
        scheduledDate: "2026-09-10",
        executionDate: null
    },
    {
        id: 14,
        inspection: "Проверка страхования портфеля спецтехники (КАСКО)",
        startInspectionDate: "2026-08-17",
        endInspectionDate: "2026-08-20",
        auditViolation: "Страховой брокер предоставил некорректный расчет тарифа по франшизе для башенных кранов, занизив премию.",
        recommendation: "Произвести доначисление страховой премии и подписать скорректированный акт сверки с брокером.",
        status: "closed",
        riskLevel: "low",
        responsibleDepartment: ["Отдел страхования", "Финансово-аналитический департамент"],
        responsiblePerson: ["Тихонов И.А."],
        scheduledDate: "2026-09-01",
        executionDate: "2026-08-30"
    },

    // --- ИНСПЕКЦИЯ 3: Аудит соблюдения требований ПОД/ФТ (2 нарушения) ---
    {
        id: 3,
        inspection: "Аудит соблюдения требований ПОД/ФТ (Росфинмониторинг)",
        startInspectionDate: "2026-08-03",
        endInspectionDate: "2026-08-07",
        auditViolation: "Несвоевременная отправка отчетов об операциях обязательного контроля по сделкам возвратного лизинга.",
        recommendation: "Обновить программный модуль выгрузки в личном кабинете РФМ и провести переаттестацию сотрудников комплаенс.",
        status: "overdue",
        riskLevel: "high",
        responsibleDepartment: ["Служба комплаенс-контроля"],
        responsiblePerson: ["Козлов В.П.", "Григорьев Д.А."],
        scheduledDate: "2026-08-31",
        executionDate: null
    },
    {
        id: 15,
        inspection: "Аудит соблюдения требований ПОД/ФТ (Росфинмониторинг)",
        startInspectionDate: "2026-08-03",
        endInspectionDate: "2026-08-07",
        auditViolation: "Отсутствует ежеквартальная проверка клиентов по санкционным спискам за 2-й квартал текущего года.",
        recommendation: "Запустить ретроспективный скрипт проверки базы контрагентов по актуальным перечням террористов/экстремистов.",
        status: "overdue",
        riskLevel: "high",
        responsibleDepartment: ["Служба комплаенс-контроля", "IT-отдел"],
        responsiblePerson: ["Козлов В.П.", "Федоров А.М."],
        scheduledDate: "2026-08-25",
        executionDate: null
    },

    // --- ИНСПЕКЦИЯ 4: Анализ работы с дебиторской задолженностью (2 нарушения) ---
    {
        id: 4,
        inspection: "Анализ работы с дебиторской задолженностью и цессии",
        startInspectionDate: "2026-08-24",
        endInspectionDate: "2026-08-28",
        auditViolation: "Задержка запуска процедуры изъятия имущества по договорам с просрочкой платежа более 90 дней.",
        recommendation: "Ускорить передачу дел в юридический департамент и инициировать досудебное изъятие предметов лизинга.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Отдел взыскания задолженности", "Юридический департамент"],
        responsiblePerson: ["Морозов К.Э."],
        scheduledDate: "2026-10-01",
        executionDate: null
    },
    {
        id: 16,
        inspection: "Анализ работы с дебиторской задолженностью и цессии",
        startInspectionDate: "2026-08-24",
        endInspectionDate: "2026-08-28",
        auditViolation: "Не отправлены досудебные претензии по 14 клиентам мелкого и микробизнеса со сроком долга от 30 до 60 дней.",
        recommendation: "Автоматизировать веерную отправку претензий через личный кабинет СЭД и Почту России.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Отдел взыскания задолженности"],
        responsiblePerson: ["Морозов К.Э."],
        scheduledDate: "2026-09-15",
        executionDate: null
    },

    // --- ИНСПЕКЦИЯ 5: Инспекция штрафстоянок (1 нарушение) ---
    {
        id: 5,
        inspection: "Инспекция хранения изъятого имущества на штрафстоянках",
        startInspectionDate: "2026-07-15",
        endInspectionDate: "2026-07-17",
        auditViolation: "На стоянке хранения изъятых легковых авто отсутствуют акты приема-передачи материальных ценностей подрядчиком.",
        recommendation: "Провести инвентаризацию стоянки и обязать подрядчика подписать акты под угрозой расторжения договора.",
        status: "closed",
        riskLevel: "low",
        responsibleDepartment: ["Департамент изъятого имущества", "АХО"],
        responsiblePerson: ["Васильев Н.О."],
        scheduledDate: "2026-08-10",
        executionDate: "2026-08-08"
    },

    // --- ИНСПЕКЦИЯ 6: Аудит процесса скоринга (3 нарушения) ---
    {
        id: 6,
        inspection: "Аудит процесса скоринга и одобрения лизинговых сделок",
        startInspectionDate: "2026-08-11",
        endInspectionDate: "2026-08-14",
        auditViolation: "В модуле автоматической проверки БКИ некорректно учитываются поручительства бенефициаров малого бизнеса.",
        recommendation: "Скорректировать скоринговую модель в ERP-системе для снижения доли необоснованных отказов.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Управление риск-менеджмента", "IT-отдел"],
        responsiblePerson: ["Павлова Е.Д.", "Федоров А.М."],
        scheduledDate: "2026-09-20",
        executionDate: null
    },
    {
        id: 17,
        inspection: "Аудит процесса скоринга и одобрения лизинговых сделок",
        startInspectionDate: "2026-08-11",
        endInspectionDate: "2026-08-14",
        auditViolation: "Обнаружены обходы андеррайтинга: 5 сделок одобрены менеджерами вручную без согласования с комитетом.",
        recommendation: "Заблокировать техническую возможность ручного переопределения (override) статуса скоринга без подписи Директора по рискам.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Управление риск-менеджмента", "Служба комплаенс-контроля"],
        responsiblePerson: ["Павлова Е.Д.", "Козлов В.П."],
        scheduledDate: "2026-09-25",
        executionDate: null
    },
    {
        id: 18,
        inspection: "Аудит процесса скоринга и одобрения лизинговых сделок",
        startInspectionDate: "2026-08-11",
        endInspectionDate: "2026-08-14",
        auditViolation: "Используются устаревшие коэффициенты финансовой устойчивости отраслей сельского хозяйства (докризисные маркеры).",
        recommendation: "Провести рекалибровку весов макроэкономических факторов в скоринговой карте АПК.",
        status: "closed",
        riskLevel: "medium",
        responsibleDepartment: ["Управление риск-менеджмента"],
        responsiblePerson: ["Павлова Е.Д."],
        scheduledDate: "2026-09-01",
        executionDate: "2026-08-31"
    },
    // --- ИНСПЕКЦИЯ 7: Проверка чистоты сделок недвижимости (2 нарушения) ---
    {
        id: 7,
        inspection: "Проверка чистоты сделок финансового лизинга недвижимости",
        startInspectionDate: "2026-09-01",
        endInspectionDate: "2026-09-03",
        auditViolation: "Отсутствие выписки из ЕГРН в юридическом досье по крупному строящемуся объекту (складской комплекс).",
        recommendation: "Запросить актуальные сведения из Росреестра и прикрепить скан-копии в карточку сделки CRM.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Юридический департамент"],
        responsiblePerson: ["Смирнов Ю.Б."],
        scheduledDate: "2026-09-10",
        executionDate: null
    },
    {
        id: 19,
        inspection: "Проверка чистоты сделок финансового лизинга недвижимости",
        startInspectionDate: "2026-09-01",
        endInspectionDate: "2026-09-03",
        auditViolation: "В договоре купли-продажи земельного участка под ТЦ отсутствует пункт о проверке скрытых обременений продавца.",
        recommendation: "Разработать дополнительное соглашение к договору купли-продажи с жесткими штрафными гарантиями продавца.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Юридический департамент", "Сопровождение сделок"],
        responsiblePerson: ["Смирнов Ю.Б."],
        scheduledDate: "2026-09-18",
        executionDate: null
    },
    // --- ИНСПЕКЦИЯ 8: Аудит маркетинговых программ (1 нарушение) ---
    {
        id: 8,
        inspection: "Аудит маркетинговых программ с автодилерами (Субсидии)",
        startInspectionDate: "2026-07-20",
        endInspectionDate: "2026-07-25",
        auditViolation: "Расчет скидок по совместной программе с брендом HAVAL производился по устаревшим прайс-листам.",
        recommendation: "Аннулировать ошибочные калькуляции, обновить тарифную сетку и сделать перерасчет маржинальности.",
        status: "removed",
        riskLevel: "low",
        responsibleDepartment: ["Управление продаж и партнерских программ"],
        responsiblePerson: ["Тихонов И.А."],
        scheduledDate: "2026-08-15",
        executionDate: null
    },
    // --- ИНСПЕКЦИЯ 9: Проверка регистрации предметов лизинга (2 нарушения) ---
    {
        id: 9,
        inspection: "Проверка регистрации предметов лизинга в госорганах",
        startInspectionDate: "2026-08-05",
        endInspectionDate: "2026-08-07",
        auditViolation: "Выявлено 4 полуприцепа, не поставленных лизингополучателем на временный учет в ГИБДД в течение 10 дней.",
        recommendation: "Выставить штрафные санкции согласно договору и обязать клиента предоставить СТС.",
        status: "closed",
        riskLevel: "low",
        responsibleDepartment: ["Сопровождение сделок", "Группа регистрации"],
        responsiblePerson: ["Дмитриева М.В."],
        scheduledDate: "2026-08-20",
        executionDate: "2026-08-19"
    },
    {
        id: 20,
        inspection: "Проверка регистрации предметов лизинга в госорганах",
        startInspectionDate: "2026-08-05",
        endInspectionDate: "2026-08-07",
        auditViolation: "Два речных судна-буксира не внесены своевременно в Государственный судовой реестр после подписания актов.",
        recommendation: "Срочно направить комплект документов в Администрацию речного бассейна для завершения регистрации.",
        status: "closed",
        riskLevel: "high",
        responsibleDepartment: ["Сопровождение сделок", "Юридический департамент"],
        responsiblePerson: ["Дмитриева М.В.", "Смирнов Ю.Б."],
        scheduledDate: "2026-08-22",
        executionDate: "2026-08-21"
    },
    // --- ИНСПЕКЦИЯ 10: Лизинговые сделки с госучастием (2 нарушения) ---
    {
        id: 10,
        inspection: "Аудит лизинговых сделок с государственным участием (ЛК-Субсидии Минпромторга)",
        startInspectionDate: "2026-08-12",
        endInspectionDate: "2026-08-14",
        auditViolation: "Пакет документов на получение государственной субсидии по колесной технике сформирован с нарушением требований Минпромторга.",
        recommendation: "Срочно пересобрать отчетность по льготному лизингу во избежание отказа в компенсации выпадающих доходов.",
        status: "overdue",
        riskLevel: "high",
        responsibleDepartment: ["Финансово-аналитический департамент"],
        responsiblePerson: ["Яковлев С.Н.", "Кузнецов Е.В."],
        scheduledDate: "2026-09-01",
        executionDate: null
    },
    {
        id: 21,
        inspection: "Аудит лизинговых сделок с государственным участием (ЛК-Субсидии Минпромторга)",
        startInspectionDate: "2026-08-12",
        endInspectionDate: "2026-08-14",
        auditViolation: "Копии паспортов транспортных средств (ПТС) по льготным сделкам не заверены печатью установленного образца.",
        recommendation: "Переподписать архив скан-копий усиленной ЭЦП контролера и повторно загрузить в систему Минпромторга.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Финансово-аналитический департамент", "Группа регистрации"],
        responsiblePerson: ["Яковлев С.Н."],
        scheduledDate: "2026-09-10",
        executionDate: null
    },
    // --- НОВЫЕ ПОВТОРЯЮЩИЕСЯ И ОДИНОЧНЫЕ ИНСПЕКЦИИ (id 22 - 27) ---
    // --- ИНСПЕКЦИЯ 11: Технический аудит медицинского оборудования (2 нарушения) ---
    {
        id: 22,
        inspection: "Технический аудит переданного в лизинг медицинского оборудования",
        startInspectionDate: "2026-09-07",
        endInspectionDate: "2026-09-11",
        auditViolation: "Медицинский центр (лизингополучатель) пропустил плановое ТО томографа, нарушив гарантийный регламент завода.",
        recommendation: "Направить требование о немедленном вызове сертифицированного инженера для проведения регламентных работ.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Департамент мониторинга рисков"],
        responsiblePerson: ["Иванов И.И."],
        scheduledDate: "2026-09-25",
        executionDate: null
    },
    {
        id: 23,
        inspection: "Технический аудит переданного в лизинг медицинского оборудования",
        startInspectionDate: "2026-09-07",
        endInspectionDate: "2026-09-11",
        auditViolation: "Отсутствуют копии лицензий у персонала клиники, допущенного к эксплуатации лизинговых рентген-аппаратов.",
        recommendation: "Запросить официальные заверенные копии дипломов и сертификатов специалистов медицинского центра.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Сопровождение сделок"],
        responsiblePerson: ["Дмитриева М.В."],
        scheduledDate: "2026-09-30",
        executionDate: null
    },
    // --- ИНСПЕКЦИЯ 12: Валютный контроль и ВЭД (3 нарушения) ---
    {
        id: 24,
        inspection: "Контроль валютных рисков при импорте китайских станков",
        startInspectionDate: "2026-09-14",
        endInspectionDate: "2026-09-16",
        auditViolation: "В спецификациях к международному контракту не зафиксирован жесткий коридор кросс-курса юань/рубль, что несет риски убытков.",
        recommendation: "Инициировать подписание допсоглашения с фиксацией защитной валютной оговорки.",
        status: "open",
        riskLevel: "high",
        responsibleDepartment: ["Финансово-аналитический департамент"],
        responsiblePerson: ["Кузнецов Е.В."],
        scheduledDate: "2026-09-28",
        executionDate: null
    },
    {
        id: 25,
        inspection: "Контроль валютных рисков при импорте китайских станков",
        startInspectionDate: "2026-09-14",
        endInspectionDate: "2026-09-16",
        auditViolation: "Обнаружена задержка предоставления справок о подтверждающих документах (СПД) в уполномоченный банк.",
        recommendation: "Предоставить документы в валютный контроль банка до конца текущей недели во избежание штрафа.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["Финансово-аналитический департамент", "Служба комплаенс-контроля"],
        responsiblePerson: ["Кузнецов Е.В.", "Григорьев Д.А."],
        scheduledDate: "2026-09-22",
        executionDate: null
    },
    {
        id: 26,
        inspection: "Контроль валютных рисков при импорте китайских станков",
        startInspectionDate: "2026-09-14",
        endInspectionDate: "2026-09-16",
        auditViolation: "Отсутствует страхование груза (морской фрахт оборудования) на этапе транспортировки из порта Шанхая.",
        recommendation: "В срочном порядке оформить разовый страховой полис логистического риска Cargo.",
        status: "closed",
        riskLevel: "high",
        responsibleDepartment: ["Отдел страхования"],
        responsiblePerson: ["Петрова А.В."],
        scheduledDate: "2026-09-17",
        executionDate: "2026-09-16"
    },
    // --- ИНСПЕКЦИЯ 13: Одиночная инспекция ИТ (1 нарушение) ---
    {
        id: 27,
        inspection: "Аудит информационной безопасности личного кабинета лизингополучателя",
        startInspectionDate: "2026-09-21",
        endInspectionDate: "2026-09-23",
        auditViolation: "Логи веб-сервера личного кабинета хранятся в открытом виде без шифрования конфиденциальных персональных данных.",
        recommendation: "Настроить маскирование чувствительных полей (номера паспортов, телефоны) и включить шифрование лог-файлов.",
        status: "open",
        riskLevel: "medium",
        responsibleDepartment: ["IT-отдел"],
        responsiblePerson: ["Федоров А.М."],
        scheduledDate: "2026-10-15",
        executionDate: null
    }
];
