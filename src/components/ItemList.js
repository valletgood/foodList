import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TripStateContext } from '../App'
import MyButton from './MyButton'

const ItemList = (selectFood) => {

    const data = useContext(TripStateContext)
    const foodOption = selectFood.selectFood
    const foodList = data.filter((it) => it.food === foodOption)
    const navigate = useNavigate();

    return (
        <div className='ItemList'>
            <div>
                {foodList.map((it, idx) => (
                    <p>
                        {/* <img src={it.img} />  */}
                        <span onClick={() => navigate(`/Item/${it.id}`)}>{it.title}</span>
                        <span onClick={() => navigate(`/Item/${it.id}`)}> {it.area}</span>
                        <MyButton text={'수정하기'} onClick={() => navigate(`/Edit/${it.id}`)} />
                    </p>
                ))}
            </div>
        </div>
    )
}

export default ItemList




