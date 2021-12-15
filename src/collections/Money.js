import mongoose from "mongoose"

const { model } = mongoose

const Money = new model("money", {
  userId: String,
  money: Number,
})

export default Money