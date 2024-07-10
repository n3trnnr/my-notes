import React, { useEffect, useState } from 'react';
import styles from './Form.module.css'

const initialState = {
    title: '',
    textContent: '',
    date: '',
    userId: '',
    id: ''
}

const Form = ({ state, dispatchFn, userId }) => {
    const { data, currentData, formValue, isFormValid, isReadyToSubmit } = state
    // console.log('data', data);
    // console.log('formValue', formValue);
    // console.log('isFormValid', isFormValid);
    // console.log('isReadyToSubmit', isReadyToSubmit);
    // console.log('currentData', currentData);

    const [inputValue, setInputValue] = useState({
        ...initialState
    })

    useEffect(() => {
        let clear;
        if (!isFormValid.title || !isFormValid.textContent || !isFormValid.date || !isFormValid.userId) {
            clear = setTimeout(() => {
                dispatchFn({ type: 'RESET_FORM_STATE' })
            }, 2000)
        }
        return () => {
            clearTimeout(clear)
        }
    }, [isFormValid])

    useEffect(() => {
        if (isReadyToSubmit) submit()
    }, [isReadyToSubmit])

    useEffect(() => {
        if (currentData) {
            setInputValue({ ...currentData })
        } else {
            setInputValue({ ...initialState })
        }
    }, [currentData])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const dataForm = Object.fromEntries(formData)

        dispatchFn({ type: 'IS_VALID', payload: currentData ? { ...currentData, ...inputValue } : { ...dataForm, userId } })
    }

    const submit = () => {
        dispatchFn({ type: 'POST', payload: formValue })
        dispatchFn({ type: 'GET' })
        dispatchFn({ type: 'RESET_FORM_STATE' })
        setInputValue({ ...initialState })
    }

    const onChange = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    return (
        <section className={styles['form-wrapper']}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Оглавление
                    <input
                        value={inputValue.title}
                        onChange={(e) => onChange(e)}
                        className={isFormValid.title ? '' : styles['notValid']}
                        type="text"
                        name='title'
                    />
                </label>

                <label>
                    Описание
                    <input
                        value={inputValue.textContent}
                        onChange={onChange}
                        className={isFormValid.textContent ? '' : styles['notValid']}
                        type="textContent"
                        name='textContent'
                    />
                </label>

                <label>
                    Дата
                    <input
                        value={inputValue.date}
                        onChange={onChange}
                        className={isFormValid.date ? '' : styles['notValid']}
                        type="date"
                        name='date'
                    />
                </label>
                <button>Отправить</button>
                {(formValue.userId === '0' || formValue.userId === undefined) && <div style={{ textAlign: 'center' }}>Выберите пользователя</div>}
            </form>
        </section>
    );
}

export default Form;