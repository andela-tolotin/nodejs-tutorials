'use strict'

const Hoek = require('hoek')

run()

async function run () {
  const timeouts = [10, 600, 200, 775, 125, 990]

  const forResult = await forLoopInSequence(timeouts)
  console.log()

  const reduceResult = await reduceInSequence(timeouts)
  console.log()

  console.log('YES! All done. Here are the results:')
  console.log(forResult)
  console.log(reduceResult)
}

async function forLoopInSequence (timeouts) {
  let result = []

  for (const timeout of timeouts) {
    result.push(await wait(timeout))
  }

  return result
}

async function reduceInSequence (timeouts) {
  return timeouts.reduce(async (carry, timeout) => {
    return [
      ...(await carry),
      await wait(timeout)
    ]
  }, Promise.resolve([]))
}

async function wait (ms) {
  await Hoek.wait(ms)
  console.log(`waited: ${ms}`)

  return ms
}
