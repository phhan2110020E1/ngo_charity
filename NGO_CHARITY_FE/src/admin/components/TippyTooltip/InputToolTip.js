import { useEffect, useRef } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

function InputToolTip({ content, placement, classBtn, icon, openModal }) {
    const tooltipRef = useRef(null);

    useEffect(() => {
        // Khởi tạo tooltip
        tippy(tooltipRef.current, {
            content: content,
            placement: placement,
        });
    }, [content, placement]);

    return (
        <button onClick={openModal} className={`btn ${classBtn}`} ref={tooltipRef}>
            <i className={icon}></i>
        </button>
    );
}

export default InputToolTip;
