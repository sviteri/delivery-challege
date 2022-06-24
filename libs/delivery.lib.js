const fs = require('fs')
const _ld = require('lodash')

  /**
   * @Description Get Repository data, from json file
   * @returns {*[]}
   */
function getRepository () {
  let data = []
  try {
    const rawData = fs.readFileSync('repository/payload.json')
    data = JSON.parse(rawData)
  } catch (e) {
    console.log(e, 'getRepository error')
  }
  return data
}

/**
 * @Description Get optimised Delivery Steps List, based by parameters
 * @param data
 * @param maximun_distance
 * @param maximun_distance_between_points
 * @param considerer_traffic
 * @returns {routes[]}
 */
function filterRoutes ({
  data,
  maximun_distance,
  maximun_distance_between_points,
  considerer_traffic,
}) {
  let totalTraveled = 0
  let filters = ['distance']
  if (considerer_traffic)
    filters.push('traffic')
  const stageOne = _ld.orderBy(data, filters,
    ['asc', 'asc'])
  return stageOne.filter((e) => {
    totalTraveled += e.distance

    const valid = maximun_distance_between_points ? e.distance <
      maximun_distance_between_points : true
    return valid &&
      (maximun_distance ? totalTraveled <= maximun_distance : true)
  })
}

/**
 * @Description Get de best Route and order data.
 * @param maximun_distance_between_points
 * @param considerer_traffic
 * @param maximun_distance
 * @returns {{routeId: number, steps: *[]}}
 */
function getBetterRoute ({
  maximun_distance_between_points,
  considerer_traffic,
  maximun_distance,
}) {
  const response = {
    routeId: parseInt(Date.now() + Math.random()), //Genera numero que no se repetirá, emulando un identificador Unico
    steps: [],
  }
  try {
    const data = getRepository()
    response.steps = filterRoutes({
      data,
      maximun_distance,
      maximun_distance_between_points,
      considerer_traffic,
    })
    const total = data.length
    const amountSteps = response.steps.length

    console.log('Summary: ', { total, amountSteps })
  } catch (e) {
    console.log('Error getBetterRoute=> ', e)
  }

  return response
}

module.exports = {
  getBetterRoute,
}