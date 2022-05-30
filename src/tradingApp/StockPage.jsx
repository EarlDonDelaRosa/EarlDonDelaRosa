import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import StyleContext from "./StyleContext";
import useFunction from "./useFunction";

function StockPage() {
    const {
        stock,
        goToUser,
        handleStockSearch,
        searchStock,
        handleBuy,
        handleLogout,
        showBuy,
        closeBuyModal,
        handleConfirmBuy,
        handleOnBuyUnit
    } = useFunction();
    const value = useContext(StyleContext);
    const userCash = JSON.parse(localStorage.getItem('balancecash').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))


    return (
        <React.Fragment>
            <div className='App'>
                <div className='row' style={value}>
                    <div className='col-9' align='left'>
                        <h4 className="m-4">
                            Stock Market
                        </h4>
                    </div>
                    <div className='col-1' align='right'>
                        <button 
                            className='btn btn-secondary m-4'
                            onClick={goToUser}
                            >Back
                        </button>
                    </div>
                    <div className='col-2' align='right'>
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
                        placeholder='search'
                        name='search'
                        onChange={handleStockSearch}
                    />
                    <label className=''>Search transactions</label>
                </div>
                <div>
                    <hr />
                    <label htmlFor="id" className='col-md-2'>Company</label>
                    <label htmlFor="albumId" className='col-md-2'>Currency</label>
                    <label htmlFor="quantity" className='col-md-2'>Market Price(USD)</label>
                    <label htmlFor="quantity" className='col-md-1'>Action</label>
                    <hr />
                </div>
                <div>
                    {
                        stock.filter((item) => {
                            if (searchStock == '') {
                                return item
                            } else if (item.displayName.toLowerCase().includes(searchStock.toLowerCase())) {
                                return item
                            } else if (item.currency.toLowerCase().includes(searchStock.toLowerCase())) {
                                return item
                            }
                        }).map((item, index) => (
                            <div className='mb-3' key={index}>
                                <label className='col-md-2'>{item.company}</label>
                                <label className='col-md-2'>{item.currency}</label>
                                <label className='col-md-2'>${item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</label>
                                <button 
                                    onClick={() => handleBuy(item.id)}
                                    className='btn btn-success col-md-1'
                                    >Buy
                                </button>
                            </div>
                        ))
                    }
                </div>
                {/* Modal */}
                <Modal
                    show={showBuy}
                    onHide={closeBuyModal}
                    backdrop="static"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Buy stock?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="mb-3">
                        Balance Cash amount:  ${userCash}
                    </h5>
                    <div>
                        <div className='form-floating col-4 mb-3'>
                        <input type="number" 
                            className='form-control'
                            placeholder='Unit'
                            name='unit'
                            onChange={handleOnBuyUnit}
                        />
                        <label>
                            Unit(s)
                        </label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeBuyModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleConfirmBuy}>Buy</Button>
                </Modal.Footer>
                </Modal>
                {/* Modal */}
            </div>
        </React.Fragment>
    )
}

export default StockPage