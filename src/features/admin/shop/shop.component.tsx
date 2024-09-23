import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import ShopFrom from "./shop-form"

function Shop() {
  const navigate = useNavigate()

  return (
    <div className="flex items-start flex-col justify-around min-h-[50vh] w-[95%]">
      <div className="flex justify-between w-full">
        <button type="button" className="px-5 py-2" onClick={() => navigate(-1)}>
          <ArrowBack />
        </button>
      </div>

      <ShopFrom mode="update" />
    </div>
  )
}

export default Shop
