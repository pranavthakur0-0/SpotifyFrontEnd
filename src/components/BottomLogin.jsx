export default function BottomLogin(){
    return (
        <>
            <div className="w-full px-5 py-3 bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white z-20 flex justify-between">
                <div className="flex-1">
                    <p className="uppercase font-spotifyLight text-[0.75rem] tracking-widest">Preview of Spotify</p>
                    <p className="font-spotifyBook">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
                </div>
                <button className="bg-white text-black py-3 px-8 rounded-full cursor-pointer hover:scale-105 transition-transform ease-in-out">Sign up for free</button>
            </div>
        </>
    )
}