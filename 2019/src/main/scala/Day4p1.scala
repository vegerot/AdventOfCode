import scala.collection.mutable
object Day4p1 {
  def main(args: Array[String]): Unit = {
        val list: mutable.ListBuffer[Int] = mutable.ListBuffer.empty[Int]
        for (i <- 256310 to 732736) {
      if (increasing(i) && repeating(i))
      {
        list += i
        println(s"$i ✅")
      }
      //else println(s"$i ❌")
    }
    println(list.length)
/*     (List(111111, 223450, 123789, 112233, 123444, 111122, 688889, 111223))
      .foreach(
        num => {
          if (repeating(num)) {
            println(s"$num ✅")
          } else println(s"$num ❌")
        }
      ) */

  }

  def increasing(num: Int): Boolean = {
    var increase: Boolean = true
    val str: String = num.toString()
    for (i <- 0 to (str.length - 2)) {
      increase = increase && (str(i).toInt <= str(i + 1).toInt)
    }
    return increase
  }

  def repeating(num: Int): Boolean = {
    var repeat: Boolean = false
    val str: String = num.toString()
    var i: Int = 0
    while (i < (str.length - 1)) {
      try {
        var ret: String = ""
        if (str(i) == str(i + 1)) {
          if (str(i + 1) == str(i + 2)) {
            while ((i < str.length - 1) && str(i + 1) == str(i)) {
              i += 1
            }
          } else return true
        }
      } catch {
        case x: Exception => {
          println(s"EXCEPTING ${str(i + 1)}")
          repeat = repeat || str(i) == str(i + 1)
        }
      }

      i += 1
    }
    return repeat
  }
}
