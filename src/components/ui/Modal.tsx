import { ReactNode } from "react"
import Close from "../icons/Close"
import { useTranslation } from "react-i18next"
import Button from "./Button"

interface ModalData {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    modalType: 'new' | 'change' | 'report',
    submitButtonTitle: string,
    onSubmit: () => void | Promise<void>,
    children: ReactNode,
    size?: 'full' | 'dynamic',
    position?: 'bottom' | 'center'
}

const Modal = ({ isOpen = true, onClose, title, modalType, submitButtonTitle, onSubmit, children, size = 'dynamic', position = 'center' }: ModalData) => {
    const { t } = useTranslation()
    const openClass = isOpen ? 'flex' : 'hidden'
    const sizeClass = size === 'full' ? 'md:h-[90%]' : 'h-max'
    const positionClass = position === 'center' ? 'items-center' : 'items-end'

    return (
        <div className={`${openClass} fixed inset-0 z-50 ${positionClass} justify-center md:items-center md:p-4 bg-black/20 backdrop-blur-sm`}>
            <div className={`w-full h-full md:w-[50%] ${sizeClass} bg-modal-bg border border-border-warm rounded-xl overflow-y-auto`}>
                {/* ЗАГОЛОВОК */}
                <header className="bg-light p-4 border-b border-b-border-warm">
                    <div className="flex flex-wrap items-center justify-between gap-3 md:gap-2">
                        <div>
                            <p className="tracking-widest uppercase text-[10px] text-accent font-semibold">{t(`modals.${modalType}`)}</p>
                            <h1 className="text-[20px] w-full max-[768px]:text-[23px]">{title}</h1>
                        </div>
                        <Button
                            type='button'
                            className="hover:text-accent border-none bg-transparent hover:bg-transparent"
                            onClick={onClose}>
                            <Close className="text-text-muted hover:text-accent transition-colors h-5 w-5" />
                        </Button>
                    </div>
                </header>
                {/* ТЕЛО */}

                {children}

                {/* ФУТЕР: КНОПКИ */}
                <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                    <Button
                        type='button'
                        onClick={onClose}
                    >
                        {t('cancel')}
                    </Button>
                    {modalType === 'change' ?
                        <Button
                            variant="delete">
                            {t('delete')}
                        </Button> : ''}
                    <Button
                        type='submit'
                        onClick={onSubmit}
                        variant="secondary"
                    >
                        {submitButtonTitle}
                    </Button>
                </footer>
            </div>
        </div>
    )
}

export default Modal