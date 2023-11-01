interface NoMesinViewInterface {
    text: string;
}

const NoMesinView:React.FC<NoMesinViewInterface> = ({text}) => {
    return (
        <section className="flex justify-center items-center flex-col gap-5">
            <div className="h-48 w-48 md:w-80 md:h-80">
                <img src="images/bg-nomesin.svg" alt="kopi" />
            </div>
            <h1 className="text-xl md:text-4xl text-slate-600 font-bold">{text}</h1>
        </section>
    )
}

export default NoMesinView;