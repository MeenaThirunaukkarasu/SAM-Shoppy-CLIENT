import React, { useState, useEffect } from 'react'

let _card

function Payment() {

    const [loading, setLoading] = useState(true)

    const pay = async () => {

        try {

            const result = await _card.tokenize();
            if (result.status === 'OK') {
                console.log(`Payment token is ${result.token}`);
                console.log(`Payment Successful`)

                // redirect to a success page
            } else {
                let errorMessage = `Tokenization failed with status: ${result.status}`;
                if (result.errors) {
                    errorMessage += ` and errors: ${JSON.stringify(
                        result.errors
                    )}`;
                }

                throw new Error(errorMessage);
            }
        } catch (e) {
            console.error(e);
        }

    }

    const setupPayment = async () => {

      const payments = Square.payments('sandbox-sq0idb-_gtfm7huEf_xA9blXwNY4Q', 'L1AB724TRVQ7A');
    //   const payments = Square.payments('sandbox-sq0idb-RT3u-HhCpNdbMiGg5aXuVg', 'TC4Z3ZEBKRXRH');
        _card = await payments.card()
        await _card.attach('#card-container')
        setLoading(false)

    }

    useEffect(() => {

        document.getElementById("card-container").innerHTML = ""
        setupPayment()

        

    }, [])

    return (
        <div>
            <h1>Payment Page</h1>

            {loading ? <>Loading...</> : <></>}

            <div id="payment-form">
                <div id="payment-status-container"></div>
                <div id="card-container"></div>
                <button id="card-button" type="button" onClick={pay}>Pay</button>
            </div>

        </div>
    )
}

export default Payment