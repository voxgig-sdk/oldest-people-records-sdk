
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OldestPeopleRecordsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OldestPeopleRecordsSDK.test()
    equal(null !== testsdk, true)
  })

})
