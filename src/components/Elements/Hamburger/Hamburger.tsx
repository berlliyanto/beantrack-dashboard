import { useEffect, useRef, useState } from "react"

const Hamburger = () => {
    const line1 = useRef<HTMLDivElement>(null);
    const line2 = useRef<HTMLDivElement>(null);
    const line3 = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenHamburger = () => {
        setIsOpen((state) => !state);
    }

    useEffect(() => {
        if(isOpen) {
            line1.current?.classList.add('rotate-45');
            line2.current?.classList.add('opacity-0');
            line3.current?.classList.add('-rotate-45');
            line1.current?.classList.add('translate-y-[6px]');
            line3.current?.classList.add('-translate-y-[6px]');
        } else {
            line1.current?.classList.remove('rotate-45');
            line2.current?.classList.remove('opacity-0');
            line3.current?.classList.remove('-rotate-45');
            line1.current?.classList.remove('translate-y-[6px]');
            line3.current?.classList.remove('-translate-y-[6px]');
        }
    }, [isOpen])

    return (
        <div onClick={handleOpenHamburger}
        className="flex flex-col gap-1 justify-center items-center w-[40px] h-[40px] bg-primary rounded-[8px] cursor-pointer duration-300 hover:bg-emerald-900">
            <div className="w-[20px] h-[2px] bg-white duration-300" ref={line1}></div>
            <div className="w-[20px] h-[2px] bg-white duration-300" ref={line2}></div>
            <div className="w-[20px] h-[2px] bg-white duration-300" ref={line3}></div>
        </div>
    )
}

export default Hamburger;