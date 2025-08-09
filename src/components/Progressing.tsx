function Progressing(){
    return <>
        <div  className="grid w-full h-full items-center justify-items-center">
            <div className="justify-items-center" >
                <div className="block loader loader-shadow"></div>
                <p className="block mt-6 text-lg text-cyan-400 neon-text-cyan animate-pulse">
                    Generating your pamphlet...
                </p>
            </div>
          
        </div>
    </>
}
export default Progressing;