import React, { useContext, useEffect, useState } from "react";
import useForm from "./useForm";
import validate from "./validateUser";
import StyleContext from './StyleContext';
import useFunction from "./useFunction";
import { Button, Modal } from "react-bootstrap";

function UserPage() {
    const urlUser = 'http://localhost:3000/UserList';
    const urlStock = 'http://localhost:3000/StockList';
    const {
        userData
    } = useForm(validate);
    const {
        data,
        unit,
        search,
        handleLogout,
        handleSearch,
        handleAddCash,
        showAddCash,
        closeAddModal,
        handleConfirmAdd,
        handleOnAdd,
        goToStocks
    } = useFunction();
    const value = useContext(StyleContext);
    const userTransactions = JSON.parse(localStorage.getItem('data'))
    const userCash = JSON.parse(localStorage.getItem('balancecash').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))

    console.log(userTransactions)

    return (
        <React.Fragment>
            <div className='App'>
                <div className='row' style={value}>
                    <div className='col-9' align='left'>
                        <h4 className="m-4">
                            Welcome { localStorage.getItem('firstname') }
                        </h4>
                    </div>
                    <div className='col-3' align='right'>
                        <button 
                            className='btn btn-secondary m-4'
                            onClick={handleLogout}
                            >Logout
                        </button>
                    </div>
                </div>
                <div className='form-floating m-4'>
                    <input type="text" 
                        className='form-control'
                        placeholder='Search transactions'
                        name='search'
                        onChange={handleSearch}
                    />
                    <label className=''>Search transactions</label>
                </div>
                <div className="row">
                    <div className="col-md-8" align='right'>
                        <h5>Balance Cash amount:  ${userCash}</h5>
                    </div>
                    <div className="col-md-2" align='left'>
                        <button 
                            onClick={handleAddCash}
                            className="btn btn-success">
                            Add cash
                        </button>
                    </div>
                    <div className="col-md-2" align='left'>
                        <button 
                            onClick={goToStocks}
                            className="btn btn-warning">
                            Go to Stocks
                        </button>
                    </div>
                </div>
                    {/* Modal */}
                    <Modal
                        show={showAddCash}
                        onHide={closeAddModal}
                        backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Add cash?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            Balance Cash amount:  ${userCash}
                        </div>
                        <div>
                            <div className='form-floating col-4 mb-3'>
                            <input type="number" 
                                className='form-control'
                                placeholder='Add amount'
                                name='addamount'
                                // value={userInput.username}
                                onChange={handleOnAdd}
                            />
                            <label>
                                Amount
                            </label>
                            </div>
                        </div>
                        {/* <div>
                            Total amount:  ${userCash}
                        </div> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAddModal}>Cancel</Button>
                        <Button variant="primary" onClick={handleConfirmAdd}>Add</Button>
                    </Modal.Footer>
                    </Modal>
                    {/* Modal */}
                    <div>
                        <hr />
                        <label htmlFor="id" className='col-md-2'>Company</label>
                        <label htmlFor="albumId" className='col-md-2'>Transaction number</label>
                        <label htmlFor="quantity" className='col-md-2'>Buy date</label>
                        <label htmlFor="quantity" className='col-md-2'>Buy unit(s)</label>
                        <label htmlFor="quantity" className='col-md-2'>Cost price</label>
                        <label htmlFor="quantity" className='col-md-2'>Total cost</label>
                        <hr />
                    </div>
                    <div>
                    {
                        userTransactions.transactions.filter((item) => {
                            if (search == '') {
                                return item
                            } else if (item.company.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            } else if (item.date.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            } else if (item.amount.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            } else if (item.transnumber.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }
                        }).map((item, index) => (
                            <div className='mb-3' key={index}>
                                <label className='col-md-2'>{item.company}</label>
                                <label className='col-md-2'>{item.transnumber}</label>
                                <label className='col-md-2'>{item.date}</label>
                                <label className='col-md-2'>{item.unit}</label>
                                <label className='col-md-2'>${item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</label>
                                <label className='col-md-2'>${((item.amount)*(item.unit)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</label>
                            </div>
                        ))
                    }
                    </div>
            </div>
        </React.Fragment>
    )
}

export default UserPage