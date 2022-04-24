/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoyalty = /* GraphQL */ `
  query GetLoyalty($customer: String) {
    getLoyalty(customer: $customer) {
      points
      level
      remainingPoints
    }
  }
`;
export const getFlight = /* GraphQL */ `
  query GetFlight($id: ID!) {
    getFlight(id: $id) {
      id
      departureDate
      departureAirportCode
      departureAirportName
      departureCity
      departureLocale
      arrivalDate
      arrivalAirportCode
      arrivalAirportName
      arrivalCity
      arrivalLocale
      ticketPrice
      ticketCurrency
      flightNumber
      seatAllocation
      seatCapacity
      createdAt
      updatedAt
    }
  }
`;
export const listFlights = /* GraphQL */ `
  query ListFlights(
    $filter: ModelFlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        departureDate
        departureAirportCode
        departureAirportName
        departureCity
        departureLocale
        arrivalDate
        arrivalAirportCode
        arrivalAirportName
        arrivalCity
        arrivalLocale
        ticketPrice
        ticketCurrency
        flightNumber
        seatAllocation
        seatCapacity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      status
      outboundFlight {
        id
        departureDate
        departureAirportCode
        departureAirportName
        departureCity
        departureLocale
        arrivalDate
        arrivalAirportCode
        arrivalAirportName
        arrivalCity
        arrivalLocale
        ticketPrice
        ticketCurrency
        flightNumber
        seatAllocation
        seatCapacity
        createdAt
        updatedAt
      }
      paymentToken
      checkedIn
      customer
      createdAt
      bookingReference
      updatedAt
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        paymentToken
        checkedIn
        customer
        createdAt
        bookingReference
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFlightBySchedule = /* GraphQL */ `
  query GetFlightBySchedule(
    $departureAirportCode: String
    $arrivalAirportCodeDepartureDate: ModelFlightByDepartureScheduleCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getFlightBySchedule(
      departureAirportCode: $departureAirportCode
      arrivalAirportCodeDepartureDate: $arrivalAirportCodeDepartureDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        departureDate
        departureAirportCode
        departureAirportName
        departureCity
        departureLocale
        arrivalDate
        arrivalAirportCode
        arrivalAirportName
        arrivalCity
        arrivalLocale
        ticketPrice
        ticketCurrency
        flightNumber
        seatAllocation
        seatCapacity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBookingByStatus = /* GraphQL */ `
  query GetBookingByStatus(
    $customer: String
    $status: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getBookingByStatus(
      customer: $customer
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        paymentToken
        checkedIn
        customer
        createdAt
        bookingReference
        updatedAt
      }
      nextToken
    }
  }
`;
