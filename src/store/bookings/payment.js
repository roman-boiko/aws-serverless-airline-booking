import Flight from '../../shared/models/FlightClass' // eslint-disable-line
import { Loading } from 'quasar'
import axios from 'axios'

/**
 *
 * Process Payment function - processPayment calls Payment endpoint to pre-authorize charge upon tokenized payment details
 *
 * @param {object} obj - Object containing params to process payment
 * @param {object} obj.paymentToken - Tokenized payment info
 * @param {object} obj.paymentToken.details - Tokenized payment details including last4, id, etc.
 * @param {object} obj.paymentToken.details.id - Payment token
 * @param {Flight} obj.outboundFlight - Outbound flight
 * @param {string} obj.customerEmail - Customer Email address for payment notification
 * @returns {promise} - Promise representing whether payment was successfully pre-authorized
 * @example
 *   let chargeToken = await processPayment({
 *      paymentToken,
 *      outboundFlight,
 *      customerEmail
 *   });
 */
export async function processPayment({
  paymentToken,
  outboundFlight,
  customerEmail
}) {
  console.group('store/bookings/actions/processPayment')
  Loading.show({
    message: 'Processing payment...'
  })

  if (!paymentToken) throw 'Invalid payment token'

  const chargeData = {
    amount: outboundFlight.ticketPrice,
    currency: outboundFlight.ticketCurrency || 'EUR',
    stripeToken: paymentToken.details.id, // Stripe cardToken ID / or fake one we made :)
    description: `Flight ${outboundFlight.flightNumber}, ${outboundFlight.departureAirportCode}→${outboundFlight.arrivalAirportCode}, ${outboundFlight.departureDate}`,
    email: customerEmail
  }

  // Add mandatory stripe token
  chargeData.stripeToken = paymentToken.details.id

  console.log('Charge data to be passed to /pre-payment: %j', chargeData)
  try {
    const data = await axios.post(
      'https://d3qw2rxhfpzvbb.cloudfront.net/pre-payment',
      chargeData,
      {
        headers: {
          'X-Auth-Payment': 'LdyY8ViS2B6snQBlZgC7'
          //'Authorization': 'Bearer LdyY8ViS2B6snQBlZgC7'
        }
      }
    )
    console.log(data)
    const {
      data: {
        createdCharge: { id: chargeId }
      }
    } = data

    Loading.show({
      message: `Payment authorized successfully id:${chargeId}...`
    })

    console.groupEnd()
    return chargeId
  } catch (err) {
    console.error(err)
    throw err
  }
}
