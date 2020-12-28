import org.apache.spark.sql.SparkSession
import scala.collection.JavaConverters._
import scala.collection.mutable.Buffer
import scala.collection.mutable.ArrayBuffer
object Day3p2 {
  def main(args: Array[String]): Unit = {
    val routeDatabase: org.apache.spark.sql.Dataset[Array[(String, String)]] =
      getFromFile(fileName = "src/main/resources/input3.txt")
    val routes =
      routeDatabase.collectAsList.asScala.map(_.map(e => (e._1, e._2.toInt)))
    val routeAsInt: collection.mutable.Buffer[Array[(Int, Int)]] =
      routes.map(_.map(signedDirection(_)))
    var allGraphPoints
        : collection.mutable.ListBuffer[Map[Tuple2[Int, Int], Int]] =
      collection.mutable.ListBuffer[Map[Tuple2[Int, Int], Int]]()
    routeAsInt.foreach { e =>
      allGraphPoints += (createGraph(route = e))
    }
    val inter: collection.immutable.Map[Tuple2[Int, Int], Int] =
      allGraphPoints(0).keySet
        .intersect(allGraphPoints(1).keySet)
        .map(k => k -> (allGraphPoints(0)(k) + allGraphPoints(1)(k)))
        .toMap
    val closest: Int = inter.toSeq
      .sortBy(_._2)
      .toVector
      .apply(0)
      ._2
    println(closest)

  }

  def createGraph(
      route: Array[(Int, Int)]
  ): Map[Tuple2[Int, Int], Int] = {
    var graphPoints: Map[Tuple2[Int, Int], Int] = Map()
    var dist: Int = 0
    var dx: Int = 0
    var dy: Int = 0
    route.foreach { s =>
      val xInc: Int = if (s._1 > 0) 1 else -1
      val yInc: Int = if (s._2 > 0) 1 else -1
      for (_ <- 1 to s._1.abs) {
        dx += xInc
        dist += 1
        graphPoints += ((dx, dy) -> (dist))
      }
      for (_ <- 1 to s._2.abs) {
        dy += yInc
        dist += 1
        graphPoints += ((dx, dy) -> (dist))
      }

    }
    return graphPoints
  }

  def getFromFile(
      fileName: String
  ): org.apache.spark.sql.Dataset[Array[(String, String)]] = {
    val sc: org.apache.spark.sql.SparkSession = SparkSession
      .builder()
      .appName("My third day")
      .config("spark.master", "local")
      .getOrCreate();
    import sc.implicits._
    val fileData: org.apache.spark.sql.Dataset[String] =
      sc.read.textFile(fileName)
    val routeDatabase = fileData.map(_.split(',').map(_.splitAt(1)))
    routeDatabase
  }
  def signedDirection(pair: Tuple2[String, Int]): Tuple2[Int, Int] = {
    if (pair._1.equals("L") || pair._1.equals("R")) {
      if (pair._1 == "L") {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = -pair._2, _2 = 0)
        newPair
      } else {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = pair._2, _2 = 0)
        newPair
      }
    } else {
      if (pair._1 == "D") {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 0, _2 = -pair._2)
        newPair
      } else {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 0, _2 = pair._2)
        newPair
      }
    }
  }
}
