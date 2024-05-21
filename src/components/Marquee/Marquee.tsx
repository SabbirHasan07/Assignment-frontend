import Marquee from "react-fast-marquee";
 

const MarqueeCard =()=>{
    return(
       <div className="bg-gray-700 mt-2 px-2 text-white py-2">
         <Marquee className=" text-2xl font-bold">
            Welcome to My Pokémon Hub, the ultimate destination for Pokémon enthusiasts! Our website is designed to cater to fans of all ages, offering a comprehensive database of Pokémon, trading cards, and related content. Whether you're a seasoned trainer or a newcomer to the world of Pokémon, you'll find a wealth of information and resources here.
        </Marquee>
       </div>

    )
}

export default MarqueeCard;