import {useEffect, useRef} from 'react';

export default function useRenderCount() {
    const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current += 1;
    });
    return renderCount.current;
}