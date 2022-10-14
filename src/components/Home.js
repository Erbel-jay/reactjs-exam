import {React, useState, useRef, useEffect} from "react";

const Home = () => {
    const inputRef = useRef()
    const [value, setValue] = useState('');
    const [numbers, setNumbers] = useState([])
    const [arrayOfObject, setArrayOfObject] = useState([])
    const [sortedNumbers, setSortedNumbers] = useState('')

    useEffect( () => {
        inputRef.current.focus();
    }, [])

    const handleOnChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
        if(inputValue === ''){
            setNumbers([])
            setArrayOfObject([])
            setSortedNumbers('')
        }
        if(inputValue.search(',') !== -1){
            let acceptedNumbers = []
            let newArray = inputValue.split(',');
            for(let i = 0; i < newArray.length; i++){

                if((newArray[i] < -1000) || (newArray[i] > 1000)){
                    newArray.splice(i, 1)
                }
                setValue(newArray.toString())

                if(newArray[i] !== ''){
                    let number = parseInt(newArray[i])
                    if((number >= -1000) && (number <= 1000)){
                        acceptedNumbers.push(number);
                    }
                }
            }
            setNumbers(acceptedNumbers)
        }
    }

    const handleOnClick = () => {
        const numArray = numbers
        numArray.sort((a, b) => {
            return a - b
        })
        setSortedNumbers(numArray.toString())
        let array = []
        for(let i = 0; i < numArray.length; i++){
            let lastElementIndex = numArray.length -1
            let nextIndex = i + 1


            if(nextIndex <= lastElementIndex){
                array.push(returnDifference(numArray[i], numArray[i+1]))
            }
        }
        setArrayOfObject(array)
    }

    function returnDifference(a, b){
        return {
            element1: a,
            element2: b,
            result: a - b
        }
    }

    const handleClear = () => {
        setValue('')
        setNumbers([])
        setArrayOfObject([])
        setSortedNumbers('')
    }
  

    return(
        <div className="home-main">
            <div className="input-container">
                <input ref={inputRef} placeholder="Input numbers from -1000 to 1000 seperate them by (,)" onChange={handleOnChange} value={value} />
                <button onClick={handleClear}>Clear</button>
            </div>
            <button onClick={handleOnClick}>Submit</button>
            
            {
                sortedNumbers !== '' ?
                <div>Sorted Ascendengly: [{sortedNumbers}]</div>
                : null
            }
            {
                arrayOfObject.length > 0 ?
                <div className="differences-container">
                <div>Differences</div>
                {
                    numbers.length > 1 ?
                    arrayOfObject.map((value, index) => {
                        return(
                            <div key={index}>
                                <span>{value.element1} - {value.element2} = {value.result}</span>
                            </div>
                        );
                    })
                    :
                    <div>You only have a single integer the result is: 0</div>
                }
                </div>
                : null
            }
            
        </div>
    ); 
}

export default Home