const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const expectedfavoritenumber = "0"
        const currentfavoritenumber = await simpleStorage.retrieve()
        assert.equal(currentfavoritenumber.toString(), expectedfavoritenumber)
    })

    it("Should update ledger with a new person's favorite number", async function () {
        const keldsfavoritenumber = "20"
        const newentry = await simpleStorage.addPerson(
            "Keld",
            keldsfavoritenumber
        )
        // nameToFavoriteNumber[_name] = _favoriteNumber
        await newentry.wait(1)
        const lookupnumber = await simpleStorage.nameToFavoriteNumber("Keld")
        assert.equal(keldsfavoritenumber, lookupnumber.toString())
    })

    it("Should update favorite number", async function () {
        newFavoriteNumber = "7"
        const storeNewFavorite = await simpleStorage.store(newFavoriteNumber)
        await storeNewFavorite.wait(1)
        const newStoredNumber = await simpleStorage.retrieve()
        assert.equal(newFavoriteNumber, newStoredNumber.toString())
    })
})
