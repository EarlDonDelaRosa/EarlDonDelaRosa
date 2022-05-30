import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFunction = () => {
    const urlUser = 'http://localhost:3000/UserList';
    const urlStock = 'http://localhost:3000/StockList';
    const [data, setData] = useState([]);
    const [stock, setStock] = useState([]);
    const [current, setCurrent] = useState([]);
    const [search, setSearch] = useState('');
    const [searchStock, setSearchStock] = useState('');
    const [newTransaction, setNewTransaction] = useState([]);
    const [newCash, setNewCash] = useState([]);
    const [showAddCash, setShowAddCash] = useState(false);
    const [showBuy, setShowBuy] = useState(false);
    const [updateID, setUpdateID] = useState();
    const [unit, setUnit] = useState();
    const nav = useNavigate();

    useEffect(() => {
        axios.get(urlStock)
        .then(res => {
            setStock(res.data)
            // console.log(res.data)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(urlUser)
        .then(res => {
            setData(res.data)
            // console.log(res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        nav('/')
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleAddCash = () => {
        setShowAddCash(true)
    }

    const closeAddModal = () => {
        setShowAddCash(false);
        // const idx = localStorage.getItem('index');
        // axios.get('http://localhost:3000/UserList/' + idx)
        // .then(res => {
        //     console.log('EDIT', res.data)
        //     setNewCash(res.data)
        // })
    }

    const handleConfirmAdd = () => {
        const cash = parseFloat(localStorage.getItem('balancecash')) + parseFloat(newCash)
        console.log(cash)
        localStorage.setItem('balancecash', cash)
        // axios.put('http://localhost:3000/UserList/' + newIdx, [...data, {balancecash: newAddCash}])
        // .then(res => { 
        //     console.log(res)
        // })
        // .catch(err => console.error(err))
        setShowAddCash(false);
        // window.location.reload(false);
    }

    const handleOnAdd = (e) => {
        setNewCash(e.target.value)
        console.log(newCash)
    }

    const goToStocks = () => {
        nav('/stock')
    }

    const goToUser = () => {
        nav('/user')
    }

    const handleStockSearch = (e) => {
        setSearchStock(e.target.value)
    }

    const handleBuy = (id) => {
        console.log(id)
        setUpdateID(id)
        setShowBuy(true);
        axios.get('http://localhost:3000/StockList/' + id)
        .then(res => {
            console.log('BUY', res.data)
            setNewTransaction(res.data)
        })
        .catch(err => console.error(err))
    }

    const closeBuyModal = () => {
        setShowBuy(false);
    }

    const handleConfirmBuy = () => {
        const index = parseFloat(localStorage.getItem('index')) + 1
        setCurrent(data[index-1])
        console.log('current', current)
        axios.put('http://localhost:3000/UserList/'+ index, {
            ...current,
            transactions: {
                ...newTransaction,
                // id: data[index-1].transactions.length
            }
        })
        .then(res => { 
            console.log(res)
        })
        .catch(err => console.error(err))
        setShowBuy(false);
    }

    const handleOnBuyUnit = (e) => {
        setUnit(e.target.value)
    }

    return {
        data,
        search,
        stock,
        unit,
        searchStock,
        handleLogout,
        handleSearch,
        handleAddCash,
        showAddCash,
        closeAddModal,
        handleConfirmAdd,
        handleOnAdd,
        goToStocks,
        goToUser,
        handleStockSearch,
        handleBuy,
        showBuy,
        closeBuyModal,
        handleConfirmBuy,
        handleOnBuyUnit
    }
}

export default useFunction