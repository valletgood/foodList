import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemList from '../components/ItemList'
import MyButton from '../components/MyButton'
import MyHeader from '../components/MyHeader'

const Home = () => {

    const navigate = useNavigate();
    const [country, setCountry] = useState('오늘은 무엇을 먹어볼까요?')

    const [food, setFood] = useState()
    const handleFood = (e) => {

        if (e.target.value === '한식') {
            setFood('한식')
        } else if (e.target.value === '일식') {
            setFood('일식')
        } else if (e.target.value === '양식') {
            setFood('양식')
        } else if (e.target.value === '중식') {
            setFood('중식')
        } else {
            setFood('카페')
        }
        setCountry(
            [e.target.name] = e.target.value
        )
    }

    return (
        <div className='home'>
            <div className='countryBtn'>
                <button className='Korea' value={'한식'} onClick={handleFood}>한식</button>
                <button className='Japan' value={'일식'} onClick={handleFood}>일식</button>
                <button className='America' value={'양식'} onClick={handleFood}>양식</button>
                <button className='China' value={'중식'} onClick={handleFood}>중식</button>
                <button className='Coffee' value={'카페'} onClick={handleFood}>카페</button>
            </div>
            <MyHeader headText={country} rightChild={<MyButton text={'추가하기'} type={'positive'} onClick={() => navigate('/New')} />} />
            <ItemList selectFood={food} />
        </div>
    )
}

export default Home;