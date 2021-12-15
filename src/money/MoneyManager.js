import Money from "../collections/Money.js"

export default class MoneyManager {
  constructor() {
    this.cachedMoney = new Map()
    this.#load()
    setInterval(this.#saveCachedData.bind(this), 5000)
  }

  async #saveCachedData() {
    this.cachedMoney.forEach((value, key) => {
      Money.updateOne({ userId: key }, { $set: { money: value, userId: key } }, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }).exec()
    })
  }

  /**
   * Make an initial sync with data that is already in database
   *
   * @returns {Promise<void>}
   */
  async #load() {
    const moneyEntries = await Money.find().exec()

    moneyEntries.forEach(entry => {
      this.cachedMoney.set(entry.userId, parseInt(entry.money, 10))
    })
  }

  /**
   * Get money for user
   * @param userId - Discord userId
   * @returns {unknown}
   */
  getMoney(userId) {
    return this.cachedMoney.get(userId) || 0
  }

  incrementMoney(userId, amount) {
    this.cachedMoney.set(userId, this.getMoney(userId) + amount)
  }
}