


export default function Contact(){
    return(<>
    <section className="mt-6 flex justify-center items-center ">
        <div className="w-full lg:w-1/2">
        <h1 className="font-bold text-3xl text-pink-800 mb-8 italic ">Get in Touch...</h1>
        <form className="flex flex-col gap-4">
            <div>
                <input type="text" className="form-control w-full" placeholder="your name" />
            </div>
            <div>
                <textarea className="form-control w-full" placeholder="tell us your problem..."></textarea>
            </div>
        </form>
        </div>
    </section>
    </>)
}