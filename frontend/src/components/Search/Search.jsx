import React from 'react'
import './Search.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import CustomDropdown from '../CustomDropdown/CustomDropdown'

const Search = () => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <section className='box-search-advance'>
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            <div className='box-search shadow-sm'>
                                <div className='item-search'>
                                    <CustomDropdown
                                        label='location'
                                        options={
                                            [
                                                "Toronto, Canada",
                                                "Mumbai, India",
                                                "Hokkaido, Japan",
                                                "Beijing, China"
                                            ]
                                        }
                                    />
                                </div>
                                <div className='item-search item-search-2'>
                                    <label className='item-search-label'>Check In</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}

                                        dateFormat="dd-MMMM-yyyy"
                                    />
                                </div>
                                <div className='item-search item-search-2'>
                                    <label className='item-search-label'>Check Out</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={endDate}
                                        endDate={startDate}

                                        dateFormat="dd-MMMM-yyyy"
                                    />
                                </div>
                                <div className='item-search'>
                                    {/* Make it dynamic */}
                                    <CustomDropdown
                                        label="Guest"
                                        options={[
                                            "2 Adults",
                                            "3 Adults",
                                            "4 Adults"
                                        ]}
                                    />
                                </div>
                                <div className="item-search bd-none">
                                    <Button className="primaryBtn flex-even d-flex justify-content-center">
                                        <i className="bi bi-search me-2"></i> Search
                                    </Button>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Search