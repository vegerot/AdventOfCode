import org.apache.spark.sql.SparkSession
import scala.collection.JavaConverters._
object Day3p1 {
  def main(args: Array[String]): Unit = {
    val routeDatabase: org.apache.spark.sql.Dataset[Array[(String, String)]] =
      getFromFile(fileName = "src/main/resources/input3.txt")
    val routes =
      routeDatabase.collectAsList.asScala.map(_.map(e => (e._1, e._2.toInt)))
    val routeAsInt: collection.mutable.Buffer[Array[(Int, Int)]] =
      routes.map(_.map(signedDirection(_)))
    println(routeAsInt.getClass())
    routeAsInt.foreach { e =>
      e.foreach(println)
      println("NEXT\n")
    }

    println()

  }

  def createGraph(
      route: collection.mutable.Buffer[Array[(Int, Int)]]
  ): Array.ofDim[Int] = {}

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
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 0, _2 = -pair._2)
        newPair
      } else {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 0, _2 = pair._2)
        newPair
      }
    } else {
      if (pair._1 == "D") {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 1, _2 = -pair._2)
        newPair
      } else {
        val newPair: Tuple2[Int, Int] = pair.copy(_1 = 1, _2 = pair._2)
        newPair
      }
    }
  }
}
