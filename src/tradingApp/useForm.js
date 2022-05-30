import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (validate) => {
    const urlUser = 'http://localhost:3000/UserList';
    const urlStock = 'http://localhost:3000/StockList';
    const [data, setData] = useState([]);
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        loginValid: false,
        firstname: ''
    })
    const [userData, setUserData] = useState();
    const [errors, setErrors] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        axios.get(urlUser)
        .then(res => {
            setData(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleOnSignIn = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setErrors(validate(data, userInput))
        if (userInput.loginValid === true) {
            nav('/user')
        }
        localStorage.setItem('firstname', userInput.firstname)
        localStorage.setItem('index', userInput.index)
        localStorage.setItem('data', JSON.stringify(data[userInput.index]))
        localStorage.setItem('balancecash', JSON.stringify(data[userInput.index].balancecash))
    }

    return {
        data,
        userInput,
        errors,
        userData,
        // firstname,
        handleOnSignIn,
        handleSignIn
    }
}

export default useForm