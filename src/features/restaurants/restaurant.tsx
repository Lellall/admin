import { AddSquare, Calendar2, Clock, More, ShoppingCart } from 'iconsax-react';
import ReusableCard from './components/card';
import rose from '../../assets/rose-petals.svg'
import main from '../../assets/scattered-forcefields.svg'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Restaurant = () => {
    const navigate = useNavigate();

    const newTep = () => {
       const id =  uuidv4();
       navigate(`/restaurant/${id}`)
    }
    return (
        <div>
            <div className="flex  h-[250px] rounded-lg bg-gray-50 w-[1100px] mx-auto items-center gap-6 ">
                <div className="bg-greenn-900 h-[230px] rounded-lg w-1/2 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${main})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}>
                    <div className="container mx-auto px-4 text-center" >
                        <h1 className="text-2xl font-bold text-[#0E5D37] mb-4">
                            Experience the convenience you deserve with Lellall.
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Get all you want in one store!
                        </p>
                        <button className="bg-[#0E5D37] text-white py-2 px-4 rounded hover:bg-green-700">
                            Get Started
                        </button>
                    </div>
                </div>
                <div
                    className="bg-greenn-900 h-[230px] rounded-lg w-1/2 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${rose})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <h1 className="text-2xl font-bold text-white">
                        CAFÉ DIMANCHE
                    </h1>
                </div>

            </div>

            <div onClick={newTep} className="flex cursor-pointer justify-center items-center gap-6 mt-4">
                <ReusableCard
                    className="flex justify-center border items-center rounded-md"
                    noBg={true}
                    bgColor="#F3FAF5"
                >
                    <AddSquare
                        size="50"
                        color="#0E5D37"
                        variant="Bold"
                    />
                </ReusableCard>

                <ReusableCard>
                    <div className="flex p-4 justify-between">
                        <div>
                            <div className="text-white text-2xl semi-bold ">Monday</div>
                        </div>
                        <div>
                            <More size="22" className='mt-1 cursor-pointer' color="#fff" />
                        </div>
                    </div>
                    <div className="flex p-4 mt-4">
                        <div>
                            <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className='ml-2'>
                            <div className="text-white text-1xl semi-bold ">32 item listed</div>
                        </div>
                    </div>
                    <div className="flex  px-4">
                        <div>
                            <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Created on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 px-4">
                        <div>
                            <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Order Delivered on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                </ReusableCard>
                <ReusableCard>
                    <div className="flex p-4 justify-between">
                        <div>
                            <div className="text-white text-2xl semi-bold ">Monday</div>
                        </div>
                        <div>
                            <More size="22" className='mt-1 cursor-pointer' color="#fff" />
                        </div>
                    </div>
                    <div className="flex p-4 mt-4">
                        <div>
                            <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className='ml-2'>
                            <div className="text-white text-1xl semi-bold ">32 item listed</div>
                        </div>
                    </div>
                    <div className="flex  px-4">
                        <div>
                            <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Created on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 px-4">
                        <div>
                            <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Order Delivered on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                </ReusableCard>
            </div>
            <div className="flex justify-center items-center gap-6 mt-4">
                <ReusableCard>
                    <div className="flex p-4 justify-between">
                        <div>
                            <div className="text-white text-2xl semi-bold ">Monday</div>
                        </div>
                        <div>
                            <More size="22" className='mt-1 cursor-pointer' color="#fff" />
                        </div>
                    </div>
                    <div className="flex p-4 mt-4">
                        <div>
                            <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className='ml-2'>
                            <div className="text-white text-1xl semi-bold ">32 item listed</div>
                        </div>
                    </div>
                    <div className="flex  px-4">
                        <div>
                            <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Created on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 px-4">
                        <div>
                            <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Order Delivered on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                </ReusableCard>
                <ReusableCard>
                    <div className="flex p-4 justify-between">
                        <div>
                            <div className="text-white text-2xl semi-bold ">Monday</div>
                        </div>
                        <div>
                            <More size="22" className='mt-1 cursor-pointer' color="#fff" />
                        </div>
                    </div>
                    <div className="flex p-4 mt-4">
                        <div>
                            <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className='ml-2'>
                            <div className="text-white text-1xl semi-bold ">32 item listed</div>
                        </div>
                    </div>
                    <div className="flex  px-4">
                        <div>
                            <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Created on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 px-4">
                        <div>
                            <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Order Delivered on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                </ReusableCard>
                <ReusableCard>
                    <div className="flex p-4 justify-between">
                        <div>
                            <div className="text-white text-2xl semi-bold ">Monday</div>
                        </div>
                        <div>
                            <More size="22" className='mt-1 cursor-pointer' color="#fff" />
                        </div>
                    </div>
                    <div className="flex p-4 mt-4">
                        <div>
                            <ShoppingCart variant="Bold" size="25" color="#fff" />
                        </div>
                        <div className='ml-2'>
                            <div className="text-white text-1xl semi-bold ">32 item listed</div>
                        </div>
                    </div>
                    <div className="flex  px-4">
                        <div>
                            <Clock variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Created on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 px-4">
                        <div>
                            <Calendar2 variant="Bold" size="25" color="#fff" />
                        </div>
                        <div>
                            <div className="text-white ml-2 text-1xl semi-bold ">
                                Order Delivered on Mon 04, 2024
                            </div>
                        </div>
                    </div>
                </ReusableCard>
            </div>

        </div>
    )
}

export default Restaurant;