import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TripDispatchContext, TripStateContext } from '../App'
import MyButton from '../components/MyButton'
import MyHeader from '../components/MyHeader'

const Item = () => {
    const { onRemove } = useContext(TripDispatchContext)
    const [selectItem, setSelectItem] = useState();
    const [itemTitle, setItemTitle] = useState();
    const [itemArea, setItemArea] = useState();
    const [itemFood, setItemFood] = useState();
    const [itemContent, setItemContent] = useState();
    const navigate = useNavigate()
    const data = useContext(TripStateContext)
    const { id } = useParams();
    useEffect(() => {
        if (data.length >= 1) {
            const foodItem = data.find((it) => parseInt(it.id) === parseInt(id))
            setItemTitle(foodItem.title)
            setItemArea(foodItem.area)
            setItemFood(foodItem.food)
            setItemContent(foodItem.content)
            setSelectItem(foodItem)
        }
    }, [])

    console.log(selectItem)

    const handleRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(selectItem.id)
            navigate('/')
        } else {
            alert('신중히...')
        }
    }

    // const handleLink = () => {
    //     if()
    // }

    return (
        <div className='Item'>
            <MyHeader headText={'기록'}
                leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
                rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/Edit/${id}`)} />} />
            <div className='detail_item'>
                이름은 무엇인가요?
                <div className='item_title'>
                    {itemTitle}
                </div>
                위치는 어디인가요?
                <div className='item_area'>
                    {itemArea}
                </div>
                어떤 종류의 음식인가요?
                <div className='item_food'>
                    {itemFood}
                </div>
                링크를 남겨주세요!
                <textarea className='item_content' value={itemContent} onClick={() => window.open(`${itemContent}`, '_blank')}>
                </textarea>
            </div>
            <div className='footer'>
                <MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />
                <MyButton text={'삭제하기'} type={'negative'} onClick={handleRemove} />
            </div>
        </div>
    )
}

export default Item