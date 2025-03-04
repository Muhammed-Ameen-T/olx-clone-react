import bikewale from '../assets/bikewale.svg'
import cartrade from '../assets/cartrade.svg'
import cartrade_tech from '../assets/cartrade_tech.svg'
import carwale from '../assets/carwale.svg'
import mobility from '../assets/mobility.svg'
import olx from '../assets/olx.svg'

export default function Footer(){
    return (
        <div className="bg-[rgba(0,47,52,1)] text-white py-8 text-center m-0">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-20">
            <img src={cartrade_tech} alt="CarTrade Tech" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={olx} alt="OLX" className="w-12 h-8 md:w-20 md:h-12 lg:w-24 lg:h-16" />
            <img src={carwale} alt="CarWale" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={bikewale} alt="BikeWale" className="w-16 h-10 md:W-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={cartrade} alt="CarTrade" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
            <img src={mobility} alt="Mobility" className="w-16 h-10 md:w-24 md:h-16 lg:w-32 lg:h-24" />
          </div>
          <p className="text-xs">© 2025 OLX Clone. All rights reserved.</p>
        </div>
    )
}