import { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TripDispatchContext, TripStateContext } from '../App'
import MyButton from '../components/MyButton'
import MyHeader from '../components/MyHeader'


const Edit = () => {

    const data = useContext(TripStateContext)
    const { onEdit } = useContext(TripDispatchContext)
    const { id } = useParams()
    const navigate = useNavigate();
    const titleRef = useRef();

    const contentRef = useRef();

    const [originData, setOriginData] = useState()

    const [title, setTitle] = useState('')

    const [food, setFood] = useState();
    // const [img, setImg] = useState();
    const [content, setContent] = useState('');

    const [area, setArea] = useState('');

    const changeSubmit = () => {
        if (title.length < 1) {
            titleRef.current.focus();
        }
        else if (content.length < 1) {
            contentRef.current.focus();
        }

        else {
            onEdit(originData.id, food, area, content, title)
            alert('저장이 완료되었습니다.')
        }
        navigate('/', { replace: true })
    }

    useEffect(() => {
        if (data.length >= 1) {
            const targetItem = data.find((it) => parseInt(it.id) === parseInt(id))
            if (targetItem) {
                setTitle(targetItem.title)
                setFood(targetItem.food)
                setArea(targetItem.area)
                setContent(targetItem.content)
                setOriginData(targetItem)
            }
        }
        else {
            alert('없는 일기입니다.')
            navigate('/', { replace: true })
        }
    }, [])

    return (
        <div className='Edit'>
            <MyHeader headText={'맛집을 수정할까요?'}
                leftChild={
                    <MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />
                } />
            <section>
                <h4>이름은 무엇인가요?</h4>
                <input ref={titleRef} className='input_title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            </section>
            <section>
                <h4>위치는 어디인가요?</h4>
                <input className='input_area' type='text' value={area} onChange={(e) => setArea(e.target.value)} />
            </section>
            <section>
                <h4>어떤 종류의 음식인가요?</h4>
                <section className='input_box'>
                    <select className='input_food' value={food} onChange={(e) => setFood(e.target.value)}>
                        <option value='한식'>한식</option>
                        <option value='일식'>일식</option>
                        <option value='양식'>양식</option>
                        <option value='중식'>중식</option>
                        <option value='카페'>카페</option>
                    </select>
                </section>
            </section>
            <section>
                <h4>링크를 남겨주세요!</h4>
                <textarea ref={contentRef} className='input_content' value={content} onChange={(e) => setContent(e.target.value)} />
            </section>
            <section className='footer'>
                <MyButton text={'취소하기'} type={'negative'} onClick={() => navigate(-1)} />
                <MyButton text={'수정하기'} type={'positive'} onClick={changeSubmit} />
            </section>
        </div>
    )
}

export default Edit