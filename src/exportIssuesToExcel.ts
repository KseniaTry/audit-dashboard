import { Issue } from "./types";
import ExcelJS from 'exceljs';
import { format, parseISO } from 'date-fns';

interface exportData {
    issues: Issue[],
    fileName: string,
    translateFn: (key: string, word: string) => string,
}

export const exportToExcel = async ({ issues, fileName, translateFn }: exportData) => {
    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'AuditDashboard';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Поручения', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });
    worksheet.columns = [
        { header: translateFn('table', 'number'), key: 'id', width: 10 },
        { header: translateFn('table', 'inspection'), key: 'inspection', width: 40 },
        { header: translateFn('table', 'violation'), key: 'violation', width: 50 },
        { header: translateFn('table', 'recommendation'), key: 'recommendation', width: 50 },
        { header: translateFn('table', 'status'), key: 'status', width: 20 },
        { header: translateFn('table', 'riskLevel'), key: 'riskLevel', width: 20 },
        { header: translateFn('table', 'responsibleDepartment'), key: 'department', width: 25 },
        { header: translateFn('table', 'responsiblePerson'), key: 'person', width: 25 },
        { header: translateFn('table', 'scheduledDate'), key: 'scheduledDate', width: 20 },
    ];
    const firstRow = worksheet.getRow(1)

    firstRow.eachCell((cell) => {
        cell.font = {
            name: 'Arial',
            size: 14,
            color: { argb: 'FF1F2937' }
        }
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF3F4F6' },
        }
        cell.alignment =
        {
            vertical: 'middle',
            horizontal: 'center'
        };
        cell.border = {
            top: { style: 'thin', color: { argb: 'FF1F2937' } },
            left: { style: 'thin', color: { argb: 'FF1F2937' } },
            bottom: { style: 'thin', color: { argb: 'FF1F2937' } },
            right: { style: 'thin', color: { argb: 'FF1F2937' } }
        }
    })

    issues.forEach((issue, index) => {
        const row = worksheet.addRow({
            id: index + 1,
            inspection: issue.inspection,
            violation: issue.auditViolation,
            recommendation: issue.recommendation,
            status: issue.status ? translateFn('statuses', issue.status) : '',
            riskLevel: translateFn('riskLevels', issue.riskLevel),
            department: issue.responsibleDepartment.join(', '),
            person: issue.responsiblePerson.join(', '),
            scheduledDate: format(parseISO(issue.scheduledDate), 'dd.MM.yyyy')
        })
        row.eachCell((cell) => {
            cell.alignment = { wrapText: true, vertical: 'top' }
        })
    })

    // 1. Получите бинарный буфер файла: 
    const buffer = await workbook.xlsx.writeBuffer();
    // 2. Оберните буфер в объект 
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    // 3. Создайте временную ссылку в памяти браузера через 
    const url = URL.createObjectURL(blob)
    // 4. Создайте виртуальный тег<a>(document.createElement('a')), присвойте ему href со ссылкой, 
    // атрибут download с именем файла(обязательно с расширением.xlsx) и программно кликните по нему(.click()).
    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.download = `${fileName}.xlsx`
    linkElement.click()
    // 5. Важно для чистоты памяти: сразу после клика очистите временную ссылку
    URL.revokeObjectURL(url)
}