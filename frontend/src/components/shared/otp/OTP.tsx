import React, { type ChangeEvent, type RefObject } from 'react'

interface OTPProps {
    rootRef: RefObject<(HTMLInputElement | null)[]>
    disabled: boolean
    onComplete?(): void
    length: number
}

function OTP({ rootRef, disabled, onComplete , length}: OTPProps) {
    
    const onData = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let value = e?.target?.value;
        const index = Number(e.target.getAttribute('data-index'));

        if (+value > 9) {
            value = (+value % 10) + '';
            e.target.value = value;
        }

        if (index === rootRef.current.length - 1) {
            onComplete?.()
        } else if (value !== '' && +value >= 0) {
            rootRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.key === "Backspace") {
            if (e.target instanceof HTMLInputElement) {
                const index = Number(e.target.getAttribute('data-index'))
                e.target.value = ''
                rootRef.current[index - 1]?.focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const data = e.clipboardData.getData('text/plain');
        if (!isNaN(+data)) {
            rootRef.current.forEach((ref, i) => {
                if (ref) {
                    ref.value = data[i]
                }
            })
        }
    }
    return (

        <div className='flex justify-around my-4 '>
            {
                Array(length).fill(null).map((_, i) => <input
                    disabled={disabled}
                    data-index={i}
                    type='number'
                    onChange={onData}
                    onKeyUp={handleKeyDown}
                    onPaste={handlePaste}
                    className='border-2 border-gray-400 h-15 w-15 rounded-xl t remove-arrow focus-visible:shadow-sm text-center text-3xl text-gray-600'
                    ref={(r) => { rootRef.current[i] = r }}
                />)
            }
        </div>
    )
}

export default OTP
