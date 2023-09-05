import { useState, useEffect, useRef } from 'react';
// import 'intersection-observer';


const useNearScreen = (externalRef?: React.MutableRefObject<HTMLDivElement | null> | null) => {
    const [isNearScreen, setIsNearScreen] = useState(false);
    const refDiv = useRef<HTMLDivElement | null>(null);
    let element = externalRef ? externalRef : refDiv;
    console.log(element?.current);
    useEffect(()=>{
        const onChange: IntersectionObserverCallback = (entries, observer ) => {
            const el = entries[0];
            if (el.isIntersecting) {
                setIsNearScreen(true);
                observer.disconnect();
            }
        };

        if (element && element.current) {
            const observer = new IntersectionObserver(onChange, {
                rootMargin: '100px'
            });
            observer.observe(element.current);
        };
        
    }, []);

    return {isNearScreen, element};
};

export default useNearScreen;


        // Promise.resolve(
        //     typeof IntersectionObserver !== 'undefined' 
        //         ? IntersectionObserver
        //         : import('intersection-observer')
        // ).then(()=> {
        //     observer = new IntersectionObserver(onChange, {
        //         rootMargin: '100px'
        //     });
        // })
        // useEffect(() => {
        //     let observer
        
        //     const element = externalRef ? externalRef.current : fromRef.current
        
        //     const onChange = (entries, observer) => {
        //       const el = entries[0]
        //       if (el.isIntersecting) {
        //         setShow(true)
        //         once && observer.disconnect()
        //       } else {
        //         !once && setShow(false)
        //       }
        //     }
        
        //     Promise.resolve(
        //       typeof IntersectionObserver !== 'undefined'
        //         ? IntersectionObserver
        //         : import('intersection-observer')
        //     ).then(() => {
        //       observer = new IntersectionObserver(onChange, {
        //         rootMargin: distance
        //       })
          
        //       if (element) observer.observe(element)
        //     })
        
        //     return () => observer && observer.disconnect()
        //   })