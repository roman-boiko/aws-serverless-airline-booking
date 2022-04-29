import Loyalty from '../../shared/models/LoyaltyClass'
// @ts-ignore
import { Loading } from 'quasar'

// import { API, graphqlOperation } from 'aws-amplify'
// import { getLoyalty } from './graphql'

import axios from 'axios'
import { Auth } from 'aws-amplify'

/**
 * Loyalty [Vuex Module Action](https://vuex.vuejs.org/guide/actions.html) - fetchLoyalty retrieves current authenticated user loyalty info from Loyalty service.
 *
 * It uses SET_LOYALTY mutation to update Loyalty state with the latest information.
 *
 * It also uses Quasar Loading spinner when fetching data from Loyalty service.
 * @param {object} context - Vuex action context (context.commit, context.getters, context.state, context.dispatch)
 * @param {object} context.commit - Vuex mutation function (context.commit)
 * @returns {promise} - Promise representing updated whether loyalty information has been updated in the store
 * @see {@link SET_LOYALTY} for more info on mutation
 * @example
 * // exerpt from src/pages/Profile.vuw
 * async mounted() {
 *    if (this.isAuthenticated) {
 *        await this.$store.dispatch("loyalty/fetchLoyalty");
 *    }
 * }
 */
export async function fetchLoyalty({ commit, rootGetters }) {
  Loading.show({
    message: 'Loading profile...'
  })

  console.group('store/loyalty/actions/fetchLoyalty')
  try {
    const userCreds = await Auth.currentSession()
    const token = await userCreds.getIdToken().getJwtToken()
    console.log(`token ${token}`)
    const customerId = rootGetters['profile/userAttributes'].sub
    console.log('Fetching loyalty data')
    // const {
    //   // @ts-ignore
    //   data: { getLoyalty: loyaltyData }
    // } = await API.graphql(graphqlOperation(getLoyalty))
    const { data: loyaltyData } = await axios.get(
      'https://pkktzsjec3.execute-api.eu-central-1.amazonaws.com/Prod/' +
        customerId,
      {
        headers: {
          Authorization: token
        }
      }
    )
    const loyalty = new Loyalty(loyaltyData)

    console.log(loyalty)
    commit('SET_LOYALTY', loyalty)

    Loading.hide()
    console.groupEnd()
  } catch (err) {
    Loading.hide()
    throw new Error(err)
  }
}
